package com.amir.tournoment.web.rest;

import com.amir.tournoment.TournomentApp;
import com.amir.tournoment.domain.GroupEntity;
import com.amir.tournoment.domain.TeamEntity;
import com.amir.tournoment.domain.MatchEntity;
import com.amir.tournoment.repository.GroupEntityRepository;
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
 * Integration tests for the {@link GroupEntityResource} REST controller.
 */
@SpringBootTest(classes = TournomentApp.class)
public class GroupEntityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GroupEntityRepository groupEntityRepository;

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

    private MockMvc restGroupEntityMockMvc;

    private GroupEntity groupEntity;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GroupEntityResource groupEntityResource = new GroupEntityResource(groupEntityRepository);
        this.restGroupEntityMockMvc = MockMvcBuilders.standaloneSetup(groupEntityResource)
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
    public static GroupEntity createEntity(EntityManager em) {
        GroupEntity groupEntity = new GroupEntity()
            .name(DEFAULT_NAME);
        // Add required entity
        TeamEntity teamEntity;
        if (TestUtil.findAll(em, TeamEntity.class).isEmpty()) {
            teamEntity = TeamEntityResourceIT.createEntity(em);
            em.persist(teamEntity);
            em.flush();
        } else {
            teamEntity = TestUtil.findAll(em, TeamEntity.class).get(0);
        }
        groupEntity.getTeams().add(teamEntity);
        // Add required entity
        MatchEntity matchEntity;
        if (TestUtil.findAll(em, MatchEntity.class).isEmpty()) {
            matchEntity = MatchEntityResourceIT.createEntity(em);
            em.persist(matchEntity);
            em.flush();
        } else {
            matchEntity = TestUtil.findAll(em, MatchEntity.class).get(0);
        }
        groupEntity.getMatches().add(matchEntity);
        return groupEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GroupEntity createUpdatedEntity(EntityManager em) {
        GroupEntity groupEntity = new GroupEntity()
            .name(UPDATED_NAME);
        // Add required entity
        TeamEntity teamEntity;
        if (TestUtil.findAll(em, TeamEntity.class).isEmpty()) {
            teamEntity = TeamEntityResourceIT.createUpdatedEntity(em);
            em.persist(teamEntity);
            em.flush();
        } else {
            teamEntity = TestUtil.findAll(em, TeamEntity.class).get(0);
        }
        groupEntity.getTeams().add(teamEntity);
        // Add required entity
        MatchEntity matchEntity;
        if (TestUtil.findAll(em, MatchEntity.class).isEmpty()) {
            matchEntity = MatchEntityResourceIT.createUpdatedEntity(em);
            em.persist(matchEntity);
            em.flush();
        } else {
            matchEntity = TestUtil.findAll(em, MatchEntity.class).get(0);
        }
        groupEntity.getMatches().add(matchEntity);
        return groupEntity;
    }

    @BeforeEach
    public void initTest() {
        groupEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createGroupEntity() throws Exception {
        int databaseSizeBeforeCreate = groupEntityRepository.findAll().size();

        // Create the GroupEntity
        restGroupEntityMockMvc.perform(post("/api/group-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupEntity)))
            .andExpect(status().isCreated());

        // Validate the GroupEntity in the database
        List<GroupEntity> groupEntityList = groupEntityRepository.findAll();
        assertThat(groupEntityList).hasSize(databaseSizeBeforeCreate + 1);
        GroupEntity testGroupEntity = groupEntityList.get(groupEntityList.size() - 1);
        assertThat(testGroupEntity.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGroupEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = groupEntityRepository.findAll().size();

        // Create the GroupEntity with an existing ID
        groupEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroupEntityMockMvc.perform(post("/api/group-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupEntity)))
            .andExpect(status().isBadRequest());

        // Validate the GroupEntity in the database
        List<GroupEntity> groupEntityList = groupEntityRepository.findAll();
        assertThat(groupEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGroupEntities() throws Exception {
        // Initialize the database
        groupEntityRepository.saveAndFlush(groupEntity);

        // Get all the groupEntityList
        restGroupEntityMockMvc.perform(get("/api/group-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getGroupEntity() throws Exception {
        // Initialize the database
        groupEntityRepository.saveAndFlush(groupEntity);

        // Get the groupEntity
        restGroupEntityMockMvc.perform(get("/api/group-entities/{id}", groupEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(groupEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGroupEntity() throws Exception {
        // Get the groupEntity
        restGroupEntityMockMvc.perform(get("/api/group-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGroupEntity() throws Exception {
        // Initialize the database
        groupEntityRepository.saveAndFlush(groupEntity);

        int databaseSizeBeforeUpdate = groupEntityRepository.findAll().size();

        // Update the groupEntity
        GroupEntity updatedGroupEntity = groupEntityRepository.findById(groupEntity.getId()).get();
        // Disconnect from session so that the updates on updatedGroupEntity are not directly saved in db
        em.detach(updatedGroupEntity);
        updatedGroupEntity
            .name(UPDATED_NAME);

        restGroupEntityMockMvc.perform(put("/api/group-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGroupEntity)))
            .andExpect(status().isOk());

        // Validate the GroupEntity in the database
        List<GroupEntity> groupEntityList = groupEntityRepository.findAll();
        assertThat(groupEntityList).hasSize(databaseSizeBeforeUpdate);
        GroupEntity testGroupEntity = groupEntityList.get(groupEntityList.size() - 1);
        assertThat(testGroupEntity.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGroupEntity() throws Exception {
        int databaseSizeBeforeUpdate = groupEntityRepository.findAll().size();

        // Create the GroupEntity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGroupEntityMockMvc.perform(put("/api/group-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupEntity)))
            .andExpect(status().isBadRequest());

        // Validate the GroupEntity in the database
        List<GroupEntity> groupEntityList = groupEntityRepository.findAll();
        assertThat(groupEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGroupEntity() throws Exception {
        // Initialize the database
        groupEntityRepository.saveAndFlush(groupEntity);

        int databaseSizeBeforeDelete = groupEntityRepository.findAll().size();

        // Delete the groupEntity
        restGroupEntityMockMvc.perform(delete("/api/group-entities/{id}", groupEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GroupEntity> groupEntityList = groupEntityRepository.findAll();
        assertThat(groupEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GroupEntity.class);
        GroupEntity groupEntity1 = new GroupEntity();
        groupEntity1.setId(1L);
        GroupEntity groupEntity2 = new GroupEntity();
        groupEntity2.setId(groupEntity1.getId());
        assertThat(groupEntity1).isEqualTo(groupEntity2);
        groupEntity2.setId(2L);
        assertThat(groupEntity1).isNotEqualTo(groupEntity2);
        groupEntity1.setId(null);
        assertThat(groupEntity1).isNotEqualTo(groupEntity2);
    }
}
