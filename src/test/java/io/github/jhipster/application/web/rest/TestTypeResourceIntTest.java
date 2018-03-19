package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.FrontApp;

import io.github.jhipster.application.domain.TestType;
import io.github.jhipster.application.repository.TestTypeRepository;
import io.github.jhipster.application.repository.search.TestTypeSearchRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TestTypeResource REST controller.
 *
 * @see TestTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FrontApp.class)
public class TestTypeResourceIntTest {

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TestTypeRepository testTypeRepository;

    @Autowired
    private TestTypeSearchRepository testTypeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestTypeMockMvc;

    private TestType testType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestTypeResource testTypeResource = new TestTypeResource(testTypeRepository, testTypeSearchRepository);
        this.restTestTypeMockMvc = MockMvcBuilders.standaloneSetup(testTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TestType createEntity(EntityManager em) {
        TestType testType = new TestType()
            .active(DEFAULT_ACTIVE)
            .name(DEFAULT_NAME);
        return testType;
    }

    @Before
    public void initTest() {
        testTypeSearchRepository.deleteAll();
        testType = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestType() throws Exception {
        int databaseSizeBeforeCreate = testTypeRepository.findAll().size();

        // Create the TestType
        restTestTypeMockMvc.perform(post("/api/test-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testType)))
            .andExpect(status().isCreated());

        // Validate the TestType in the database
        List<TestType> testTypeList = testTypeRepository.findAll();
        assertThat(testTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TestType testTestType = testTypeList.get(testTypeList.size() - 1);
        assertThat(testTestType.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testTestType.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the TestType in Elasticsearch
        TestType testTypeEs = testTypeSearchRepository.findOne(testTestType.getId());
        assertThat(testTypeEs).isEqualToIgnoringGivenFields(testTestType);
    }

    @Test
    @Transactional
    public void createTestTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testTypeRepository.findAll().size();

        // Create the TestType with an existing ID
        testType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestTypeMockMvc.perform(post("/api/test-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testType)))
            .andExpect(status().isBadRequest());

        // Validate the TestType in the database
        List<TestType> testTypeList = testTypeRepository.findAll();
        assertThat(testTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestTypes() throws Exception {
        // Initialize the database
        testTypeRepository.saveAndFlush(testType);

        // Get all the testTypeList
        restTestTypeMockMvc.perform(get("/api/test-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testType.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getTestType() throws Exception {
        // Initialize the database
        testTypeRepository.saveAndFlush(testType);

        // Get the testType
        restTestTypeMockMvc.perform(get("/api/test-types/{id}", testType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testType.getId().intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestType() throws Exception {
        // Get the testType
        restTestTypeMockMvc.perform(get("/api/test-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestType() throws Exception {
        // Initialize the database
        testTypeRepository.saveAndFlush(testType);
        testTypeSearchRepository.save(testType);
        int databaseSizeBeforeUpdate = testTypeRepository.findAll().size();

        // Update the testType
        TestType updatedTestType = testTypeRepository.findOne(testType.getId());
        // Disconnect from session so that the updates on updatedTestType are not directly saved in db
        em.detach(updatedTestType);
        updatedTestType
            .active(UPDATED_ACTIVE)
            .name(UPDATED_NAME);

        restTestTypeMockMvc.perform(put("/api/test-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestType)))
            .andExpect(status().isOk());

        // Validate the TestType in the database
        List<TestType> testTypeList = testTypeRepository.findAll();
        assertThat(testTypeList).hasSize(databaseSizeBeforeUpdate);
        TestType testTestType = testTypeList.get(testTypeList.size() - 1);
        assertThat(testTestType.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testTestType.getName()).isEqualTo(UPDATED_NAME);

        // Validate the TestType in Elasticsearch
        TestType testTypeEs = testTypeSearchRepository.findOne(testTestType.getId());
        assertThat(testTypeEs).isEqualToIgnoringGivenFields(testTestType);
    }

    @Test
    @Transactional
    public void updateNonExistingTestType() throws Exception {
        int databaseSizeBeforeUpdate = testTypeRepository.findAll().size();

        // Create the TestType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestTypeMockMvc.perform(put("/api/test-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testType)))
            .andExpect(status().isCreated());

        // Validate the TestType in the database
        List<TestType> testTypeList = testTypeRepository.findAll();
        assertThat(testTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestType() throws Exception {
        // Initialize the database
        testTypeRepository.saveAndFlush(testType);
        testTypeSearchRepository.save(testType);
        int databaseSizeBeforeDelete = testTypeRepository.findAll().size();

        // Get the testType
        restTestTypeMockMvc.perform(delete("/api/test-types/{id}", testType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean testTypeExistsInEs = testTypeSearchRepository.exists(testType.getId());
        assertThat(testTypeExistsInEs).isFalse();

        // Validate the database is empty
        List<TestType> testTypeList = testTypeRepository.findAll();
        assertThat(testTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTestType() throws Exception {
        // Initialize the database
        testTypeRepository.saveAndFlush(testType);
        testTypeSearchRepository.save(testType);

        // Search the testType
        restTestTypeMockMvc.perform(get("/api/_search/test-types?query=id:" + testType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testType.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestType.class);
        TestType testType1 = new TestType();
        testType1.setId(1L);
        TestType testType2 = new TestType();
        testType2.setId(testType1.getId());
        assertThat(testType1).isEqualTo(testType2);
        testType2.setId(2L);
        assertThat(testType1).isNotEqualTo(testType2);
        testType1.setId(null);
        assertThat(testType1).isNotEqualTo(testType2);
    }
}
