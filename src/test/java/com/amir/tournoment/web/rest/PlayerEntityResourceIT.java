package com.amir.tournoment.web.rest;

import com.amir.tournoment.TournomentApp;
import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.repository.PlayerEntityRepository;
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
 * Integration tests for the {@link PlayerEntityResource} REST controller.
 */
@SpringBootTest(classes = TournomentApp.class)
public class PlayerEntityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    @Autowired
    private PlayerEntityRepository playerEntityRepository;

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

    private MockMvc restPlayerEntityMockMvc;

    private PlayerEntity playerEntity;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlayerEntityResource playerEntityResource = new PlayerEntityResource(playerEntityRepository);
        this.restPlayerEntityMockMvc = MockMvcBuilders.standaloneSetup(playerEntityResource)
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
    public static PlayerEntity createEntity(EntityManager em) {
        PlayerEntity playerEntity = new PlayerEntity()
            .name(DEFAULT_NAME)
            .mobile(DEFAULT_MOBILE);
        return playerEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlayerEntity createUpdatedEntity(EntityManager em) {
        PlayerEntity playerEntity = new PlayerEntity()
            .name(UPDATED_NAME)
            .mobile(UPDATED_MOBILE);
        return playerEntity;
    }

    @BeforeEach
    public void initTest() {
        playerEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlayerEntity() throws Exception {
        int databaseSizeBeforeCreate = playerEntityRepository.findAll().size();

        // Create the PlayerEntity
        restPlayerEntityMockMvc.perform(post("/api/player-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playerEntity)))
            .andExpect(status().isCreated());

        // Validate the PlayerEntity in the database
        List<PlayerEntity> playerEntityList = playerEntityRepository.findAll();
        assertThat(playerEntityList).hasSize(databaseSizeBeforeCreate + 1);
        PlayerEntity testPlayerEntity = playerEntityList.get(playerEntityList.size() - 1);
        assertThat(testPlayerEntity.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlayerEntity.getMobile()).isEqualTo(DEFAULT_MOBILE);
    }

    @Test
    @Transactional
    public void createPlayerEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = playerEntityRepository.findAll().size();

        // Create the PlayerEntity with an existing ID
        playerEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlayerEntityMockMvc.perform(post("/api/player-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playerEntity)))
            .andExpect(status().isBadRequest());

        // Validate the PlayerEntity in the database
        List<PlayerEntity> playerEntityList = playerEntityRepository.findAll();
        assertThat(playerEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlayerEntities() throws Exception {
        // Initialize the database
        playerEntityRepository.saveAndFlush(playerEntity);

        // Get all the playerEntityList
        restPlayerEntityMockMvc.perform(get("/api/player-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(playerEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE.toString())));
    }
    
    @Test
    @Transactional
    public void getPlayerEntity() throws Exception {
        // Initialize the database
        playerEntityRepository.saveAndFlush(playerEntity);

        // Get the playerEntity
        restPlayerEntityMockMvc.perform(get("/api/player-entities/{id}", playerEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(playerEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlayerEntity() throws Exception {
        // Get the playerEntity
        restPlayerEntityMockMvc.perform(get("/api/player-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlayerEntity() throws Exception {
        // Initialize the database
        playerEntityRepository.saveAndFlush(playerEntity);

        int databaseSizeBeforeUpdate = playerEntityRepository.findAll().size();

        // Update the playerEntity
        PlayerEntity updatedPlayerEntity = playerEntityRepository.findById(playerEntity.getId()).get();
        // Disconnect from session so that the updates on updatedPlayerEntity are not directly saved in db
        em.detach(updatedPlayerEntity);
        updatedPlayerEntity
            .name(UPDATED_NAME)
            .mobile(UPDATED_MOBILE);

        restPlayerEntityMockMvc.perform(put("/api/player-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlayerEntity)))
            .andExpect(status().isOk());

        // Validate the PlayerEntity in the database
        List<PlayerEntity> playerEntityList = playerEntityRepository.findAll();
        assertThat(playerEntityList).hasSize(databaseSizeBeforeUpdate);
        PlayerEntity testPlayerEntity = playerEntityList.get(playerEntityList.size() - 1);
        assertThat(testPlayerEntity.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlayerEntity.getMobile()).isEqualTo(UPDATED_MOBILE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlayerEntity() throws Exception {
        int databaseSizeBeforeUpdate = playerEntityRepository.findAll().size();

        // Create the PlayerEntity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlayerEntityMockMvc.perform(put("/api/player-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playerEntity)))
            .andExpect(status().isBadRequest());

        // Validate the PlayerEntity in the database
        List<PlayerEntity> playerEntityList = playerEntityRepository.findAll();
        assertThat(playerEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlayerEntity() throws Exception {
        // Initialize the database
        playerEntityRepository.saveAndFlush(playerEntity);

        int databaseSizeBeforeDelete = playerEntityRepository.findAll().size();

        // Delete the playerEntity
        restPlayerEntityMockMvc.perform(delete("/api/player-entities/{id}", playerEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlayerEntity> playerEntityList = playerEntityRepository.findAll();
        assertThat(playerEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlayerEntity.class);
        PlayerEntity playerEntity1 = new PlayerEntity();
        playerEntity1.setId(1L);
        PlayerEntity playerEntity2 = new PlayerEntity();
        playerEntity2.setId(playerEntity1.getId());
        assertThat(playerEntity1).isEqualTo(playerEntity2);
        playerEntity2.setId(2L);
        assertThat(playerEntity1).isNotEqualTo(playerEntity2);
        playerEntity1.setId(null);
        assertThat(playerEntity1).isNotEqualTo(playerEntity2);
    }
}
