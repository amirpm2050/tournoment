package com.amir.tournoment.web.rest;

import com.amir.tournoment.TournomentApp;
import com.amir.tournoment.domain.TeamEntity;
import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.repository.TeamEntityRepository;
import com.amir.tournoment.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.amir.tournoment.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TeamEntityResource} REST controller.
 */
@SpringBootTest(classes = TournomentApp.class)
public class TeamEntityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TeamEntityRepository teamEntityRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTeamEntityMockMvc;

    private TeamEntity teamEntity;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeamEntityResource teamEntityResource = new TeamEntityResource(teamEntityRepository);
        this.restTeamEntityMockMvc = MockMvcBuilders.standaloneSetup(teamEntityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TeamEntity createEntity(EntityManager em) {
        TeamEntity teamEntity = new TeamEntity()
            .name(DEFAULT_NAME);
        // Add required entity
        PlayerEntity playerEntity;
        if (TestUtil.findAll(em, PlayerEntity.class).isEmpty()) {
            playerEntity = PlayerEntityResourceIT.createEntity(em);
            em.persist(playerEntity);
            em.flush();
        } else {
            playerEntity = TestUtil.findAll(em, PlayerEntity.class).get(0);
        }
        teamEntity.getMembers().add(playerEntity);
        return teamEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TeamEntity createUpdatedEntity(EntityManager em) {
        TeamEntity teamEntity = new TeamEntity()
            .name(UPDATED_NAME);
        // Add required entity
        PlayerEntity playerEntity;
        if (TestUtil.findAll(em, PlayerEntity.class).isEmpty()) {
            playerEntity = PlayerEntityResourceIT.createUpdatedEntity(em);
            em.persist(playerEntity);
            em.flush();
        } else {
            playerEntity = TestUtil.findAll(em, PlayerEntity.class).get(0);
        }
        teamEntity.getMembers().add(playerEntity);
        return teamEntity;
    }

    @BeforeEach
    public void initTest() {
        teamEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeamEntity() throws Exception {
        int databaseSizeBeforeCreate = teamEntityRepository.findAll().size();

        // Create the TeamEntity
        restTeamEntityMockMvc.perform(post("/api/team-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teamEntity)))
            .andExpect(status().isCreated());

        // Validate the TeamEntity in the database
        List<TeamEntity> teamEntityList = teamEntityRepository.findAll();
        assertThat(teamEntityList).hasSize(databaseSizeBeforeCreate + 1);
        TeamEntity testTeamEntity = teamEntityList.get(teamEntityList.size() - 1);
        assertThat(testTeamEntity.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTeamEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teamEntityRepository.findAll().size();

        // Create the TeamEntity with an existing ID
        teamEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeamEntityMockMvc.perform(post("/api/team-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teamEntity)))
            .andExpect(status().isBadRequest());

        // Validate the TeamEntity in the database
        List<TeamEntity> teamEntityList = teamEntityRepository.findAll();
        assertThat(teamEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTeamEntities() throws Exception {
        // Initialize the database
        teamEntityRepository.saveAndFlush(teamEntity);

        // Get all the teamEntityList
        restTeamEntityMockMvc.perform(get("/api/team-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teamEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getTeamEntity() throws Exception {
        // Initialize the database
        teamEntityRepository.saveAndFlush(teamEntity);

        // Get the teamEntity
        restTeamEntityMockMvc.perform(get("/api/team-entities/{id}", teamEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teamEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTeamEntity() throws Exception {
        // Get the teamEntity
        restTeamEntityMockMvc.perform(get("/api/team-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeamEntity() throws Exception {
        // Initialize the database
        teamEntityRepository.saveAndFlush(teamEntity);

        int databaseSizeBeforeUpdate = teamEntityRepository.findAll().size();

        // Update the teamEntity
        TeamEntity updatedTeamEntity = teamEntityRepository.findById(teamEntity.getId()).get();
        // Disconnect from session so that the updates on updatedTeamEntity are not directly saved in db
        em.detach(updatedTeamEntity);
        updatedTeamEntity
            .name(UPDATED_NAME);

        restTeamEntityMockMvc.perform(put("/api/team-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeamEntity)))
            .andExpect(status().isOk());

        // Validate the TeamEntity in the database
        List<TeamEntity> teamEntityList = teamEntityRepository.findAll();
        assertThat(teamEntityList).hasSize(databaseSizeBeforeUpdate);
        TeamEntity testTeamEntity = teamEntityList.get(teamEntityList.size() - 1);
        assertThat(testTeamEntity.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTeamEntity() throws Exception {
        int databaseSizeBeforeUpdate = teamEntityRepository.findAll().size();

        // Create the TeamEntity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeamEntityMockMvc.perform(put("/api/team-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teamEntity)))
            .andExpect(status().isBadRequest());

        // Validate the TeamEntity in the database
        List<TeamEntity> teamEntityList = teamEntityRepository.findAll();
        assertThat(teamEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeamEntity() throws Exception {
        // Initialize the database
        teamEntityRepository.saveAndFlush(teamEntity);

        int databaseSizeBeforeDelete = teamEntityRepository.findAll().size();

        // Delete the teamEntity
        restTeamEntityMockMvc.perform(delete("/api/team-entities/{id}", teamEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TeamEntity> teamEntityList = teamEntityRepository.findAll();
        assertThat(teamEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeamEntity.class);
        TeamEntity teamEntity1 = new TeamEntity();
        teamEntity1.setId(1L);
        TeamEntity teamEntity2 = new TeamEntity();
        teamEntity2.setId(teamEntity1.getId());
        assertThat(teamEntity1).isEqualTo(teamEntity2);
        teamEntity2.setId(2L);
        assertThat(teamEntity1).isNotEqualTo(teamEntity2);
        teamEntity1.setId(null);
        assertThat(teamEntity1).isNotEqualTo(teamEntity2);
    }
}
