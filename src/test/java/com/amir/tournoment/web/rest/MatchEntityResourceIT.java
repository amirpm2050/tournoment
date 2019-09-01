package com.amir.tournoment.web.rest;

import com.amir.tournoment.TournomentApp;
import com.amir.tournoment.domain.MatchEntity;
import com.amir.tournoment.repository.MatchEntityRepository;
import com.amir.tournoment.service.MatchEntityService;
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

import com.amir.tournoment.domain.enumeration.MatchType;
/**
 * Integration tests for the {@link MatchEntityResource} REST controller.
 */
@SpringBootTest(classes = TournomentApp.class)
public class MatchEntityResourceIT {

    private static final MatchType DEFAULT_MATCH_TYPE = MatchType.NORMALMATCH;
    private static final MatchType UPDATED_MATCH_TYPE = MatchType.DOUBLEMATCH;

    private static final String DEFAULT_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_PLACE = "BBBBBBBBBB";

    private static final Integer DEFAULT_POINT = 1;
    private static final Integer UPDATED_POINT = 2;
    private static final Integer SMALLER_POINT = 1 - 1;

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;
    private static final Integer SMALLER_SCORE = 1 - 1;

    @Autowired
    private MatchEntityRepository matchEntityRepository;

    @Autowired
    private MatchEntityService matchEntityService;

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

    private MockMvc restMatchEntityMockMvc;

    private MatchEntity matchEntity;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MatchEntityResource matchEntityResource = new MatchEntityResource(matchEntityRepository , matchEntityService);
        this.restMatchEntityMockMvc = MockMvcBuilders.standaloneSetup(matchEntityResource)
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
    public static MatchEntity createEntity(EntityManager em) {
        MatchEntity matchEntity = new MatchEntity()
            .matchType(DEFAULT_MATCH_TYPE)
            .place(DEFAULT_PLACE)
            .point(DEFAULT_POINT)
            .score(DEFAULT_SCORE);
        return matchEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MatchEntity createUpdatedEntity(EntityManager em) {
        MatchEntity matchEntity = new MatchEntity()
            .matchType(UPDATED_MATCH_TYPE)
            .place(UPDATED_PLACE)
            .point(UPDATED_POINT)
            .score(UPDATED_SCORE);
        return matchEntity;
    }

    @BeforeEach
    public void initTest() {
        matchEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createMatchEntity() throws Exception {
        int databaseSizeBeforeCreate = matchEntityRepository.findAll().size();

        // Create the MatchEntity
        restMatchEntityMockMvc.perform(post("/api/match-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matchEntity)))
            .andExpect(status().isCreated());

        // Validate the MatchEntity in the database
        List<MatchEntity> matchEntityList = matchEntityRepository.findAll();
        assertThat(matchEntityList).hasSize(databaseSizeBeforeCreate + 1);
        MatchEntity testMatchEntity = matchEntityList.get(matchEntityList.size() - 1);
        assertThat(testMatchEntity.getMatchType()).isEqualTo(DEFAULT_MATCH_TYPE);
        assertThat(testMatchEntity.getPlace()).isEqualTo(DEFAULT_PLACE);
        assertThat(testMatchEntity.getPoint()).isEqualTo(DEFAULT_POINT);
        assertThat(testMatchEntity.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void createMatchEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = matchEntityRepository.findAll().size();

        // Create the MatchEntity with an existing ID
        matchEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMatchEntityMockMvc.perform(post("/api/match-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matchEntity)))
            .andExpect(status().isBadRequest());

        // Validate the MatchEntity in the database
        List<MatchEntity> matchEntityList = matchEntityRepository.findAll();
        assertThat(matchEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMatchEntities() throws Exception {
        // Initialize the database
        matchEntityRepository.saveAndFlush(matchEntity);

        // Get all the matchEntityList
        restMatchEntityMockMvc.perform(get("/api/match-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(matchEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].matchType").value(hasItem(DEFAULT_MATCH_TYPE.toString())))
            .andExpect(jsonPath("$.[*].place").value(hasItem(DEFAULT_PLACE.toString())))
            .andExpect(jsonPath("$.[*].point").value(hasItem(DEFAULT_POINT)))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));
    }
    
    @Test
    @Transactional
    public void getMatchEntity() throws Exception {
        // Initialize the database
        matchEntityRepository.saveAndFlush(matchEntity);

        // Get the matchEntity
        restMatchEntityMockMvc.perform(get("/api/match-entities/{id}", matchEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(matchEntity.getId().intValue()))
            .andExpect(jsonPath("$.matchType").value(DEFAULT_MATCH_TYPE.toString()))
            .andExpect(jsonPath("$.place").value(DEFAULT_PLACE.toString()))
            .andExpect(jsonPath("$.point").value(DEFAULT_POINT))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingMatchEntity() throws Exception {
        // Get the matchEntity
        restMatchEntityMockMvc.perform(get("/api/match-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMatchEntity() throws Exception {
        // Initialize the database
        matchEntityRepository.saveAndFlush(matchEntity);

        int databaseSizeBeforeUpdate = matchEntityRepository.findAll().size();

        // Update the matchEntity
        MatchEntity updatedMatchEntity = matchEntityRepository.findById(matchEntity.getId()).get();
        // Disconnect from session so that the updates on updatedMatchEntity are not directly saved in db
        em.detach(updatedMatchEntity);
        updatedMatchEntity
            .matchType(UPDATED_MATCH_TYPE)
            .place(UPDATED_PLACE)
            .point(UPDATED_POINT)
            .score(UPDATED_SCORE);

        restMatchEntityMockMvc.perform(put("/api/match-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMatchEntity)))
            .andExpect(status().isOk());

        // Validate the MatchEntity in the database
        List<MatchEntity> matchEntityList = matchEntityRepository.findAll();
        assertThat(matchEntityList).hasSize(databaseSizeBeforeUpdate);
        MatchEntity testMatchEntity = matchEntityList.get(matchEntityList.size() - 1);
        assertThat(testMatchEntity.getMatchType()).isEqualTo(UPDATED_MATCH_TYPE);
        assertThat(testMatchEntity.getPlace()).isEqualTo(UPDATED_PLACE);
        assertThat(testMatchEntity.getPoint()).isEqualTo(UPDATED_POINT);
        assertThat(testMatchEntity.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void updateNonExistingMatchEntity() throws Exception {
        int databaseSizeBeforeUpdate = matchEntityRepository.findAll().size();

        // Create the MatchEntity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMatchEntityMockMvc.perform(put("/api/match-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matchEntity)))
            .andExpect(status().isBadRequest());

        // Validate the MatchEntity in the database
        List<MatchEntity> matchEntityList = matchEntityRepository.findAll();
        assertThat(matchEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMatchEntity() throws Exception {
        // Initialize the database
        matchEntityRepository.saveAndFlush(matchEntity);

        int databaseSizeBeforeDelete = matchEntityRepository.findAll().size();

        // Delete the matchEntity
        restMatchEntityMockMvc.perform(delete("/api/match-entities/{id}", matchEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MatchEntity> matchEntityList = matchEntityRepository.findAll();
        assertThat(matchEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MatchEntity.class);
        MatchEntity matchEntity1 = new MatchEntity();
        matchEntity1.setId(1L);
        MatchEntity matchEntity2 = new MatchEntity();
        matchEntity2.setId(matchEntity1.getId());
        assertThat(matchEntity1).isEqualTo(matchEntity2);
        matchEntity2.setId(2L);
        assertThat(matchEntity1).isNotEqualTo(matchEntity2);
        matchEntity1.setId(null);
        assertThat(matchEntity1).isNotEqualTo(matchEntity2);
    }
}
