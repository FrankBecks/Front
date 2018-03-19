package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.FrontApp;

import io.github.jhipster.application.domain.SalesOrderTest;
import io.github.jhipster.application.repository.SalesOrderTestRepository;
import io.github.jhipster.application.repository.search.SalesOrderTestSearchRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SalesOrderTestResource REST controller.
 *
 * @see SalesOrderTestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FrontApp.class)
public class SalesOrderTestResourceIntTest {

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_INFO = "AAAAAAAAAA";
    private static final String UPDATED_INFO = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SalesOrderTestRepository salesOrderTestRepository;

    @Autowired
    private SalesOrderTestSearchRepository salesOrderTestSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSalesOrderTestMockMvc;

    private SalesOrderTest salesOrderTest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SalesOrderTestResource salesOrderTestResource = new SalesOrderTestResource(salesOrderTestRepository, salesOrderTestSearchRepository);
        this.restSalesOrderTestMockMvc = MockMvcBuilders.standaloneSetup(salesOrderTestResource)
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
    public static SalesOrderTest createEntity(EntityManager em) {
        SalesOrderTest salesOrderTest = new SalesOrderTest()
            .active(DEFAULT_ACTIVE)
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE)
            .info(DEFAULT_INFO)
            .dateModified(DEFAULT_DATE_MODIFIED);
        return salesOrderTest;
    }

    @Before
    public void initTest() {
        salesOrderTestSearchRepository.deleteAll();
        salesOrderTest = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalesOrderTest() throws Exception {
        int databaseSizeBeforeCreate = salesOrderTestRepository.findAll().size();

        // Create the SalesOrderTest
        restSalesOrderTestMockMvc.perform(post("/api/sales-order-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderTest)))
            .andExpect(status().isCreated());

        // Validate the SalesOrderTest in the database
        List<SalesOrderTest> salesOrderTestList = salesOrderTestRepository.findAll();
        assertThat(salesOrderTestList).hasSize(databaseSizeBeforeCreate + 1);
        SalesOrderTest testSalesOrderTest = salesOrderTestList.get(salesOrderTestList.size() - 1);
        assertThat(testSalesOrderTest.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testSalesOrderTest.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSalesOrderTest.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testSalesOrderTest.getInfo()).isEqualTo(DEFAULT_INFO);
        assertThat(testSalesOrderTest.getDateModified()).isEqualTo(DEFAULT_DATE_MODIFIED);

        // Validate the SalesOrderTest in Elasticsearch
        SalesOrderTest salesOrderTestEs = salesOrderTestSearchRepository.findOne(testSalesOrderTest.getId());
        assertThat(salesOrderTestEs).isEqualToIgnoringGivenFields(testSalesOrderTest);
    }

    @Test
    @Transactional
    public void createSalesOrderTestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salesOrderTestRepository.findAll().size();

        // Create the SalesOrderTest with an existing ID
        salesOrderTest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalesOrderTestMockMvc.perform(post("/api/sales-order-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderTest)))
            .andExpect(status().isBadRequest());

        // Validate the SalesOrderTest in the database
        List<SalesOrderTest> salesOrderTestList = salesOrderTestRepository.findAll();
        assertThat(salesOrderTestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSalesOrderTests() throws Exception {
        // Initialize the database
        salesOrderTestRepository.saveAndFlush(salesOrderTest);

        // Get all the salesOrderTestList
        restSalesOrderTestMockMvc.perform(get("/api/sales-order-tests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salesOrderTest.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO.toString())))
            .andExpect(jsonPath("$.[*].dateModified").value(hasItem(DEFAULT_DATE_MODIFIED.toString())));
    }

    @Test
    @Transactional
    public void getSalesOrderTest() throws Exception {
        // Initialize the database
        salesOrderTestRepository.saveAndFlush(salesOrderTest);

        // Get the salesOrderTest
        restSalesOrderTestMockMvc.perform(get("/api/sales-order-tests/{id}", salesOrderTest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(salesOrderTest.getId().intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.info").value(DEFAULT_INFO.toString()))
            .andExpect(jsonPath("$.dateModified").value(DEFAULT_DATE_MODIFIED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSalesOrderTest() throws Exception {
        // Get the salesOrderTest
        restSalesOrderTestMockMvc.perform(get("/api/sales-order-tests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalesOrderTest() throws Exception {
        // Initialize the database
        salesOrderTestRepository.saveAndFlush(salesOrderTest);
        salesOrderTestSearchRepository.save(salesOrderTest);
        int databaseSizeBeforeUpdate = salesOrderTestRepository.findAll().size();

        // Update the salesOrderTest
        SalesOrderTest updatedSalesOrderTest = salesOrderTestRepository.findOne(salesOrderTest.getId());
        // Disconnect from session so that the updates on updatedSalesOrderTest are not directly saved in db
        em.detach(updatedSalesOrderTest);
        updatedSalesOrderTest
            .active(UPDATED_ACTIVE)
            .name(UPDATED_NAME)
            .code(UPDATED_CODE)
            .info(UPDATED_INFO)
            .dateModified(UPDATED_DATE_MODIFIED);

        restSalesOrderTestMockMvc.perform(put("/api/sales-order-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSalesOrderTest)))
            .andExpect(status().isOk());

        // Validate the SalesOrderTest in the database
        List<SalesOrderTest> salesOrderTestList = salesOrderTestRepository.findAll();
        assertThat(salesOrderTestList).hasSize(databaseSizeBeforeUpdate);
        SalesOrderTest testSalesOrderTest = salesOrderTestList.get(salesOrderTestList.size() - 1);
        assertThat(testSalesOrderTest.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testSalesOrderTest.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSalesOrderTest.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testSalesOrderTest.getInfo()).isEqualTo(UPDATED_INFO);
        assertThat(testSalesOrderTest.getDateModified()).isEqualTo(UPDATED_DATE_MODIFIED);

        // Validate the SalesOrderTest in Elasticsearch
        SalesOrderTest salesOrderTestEs = salesOrderTestSearchRepository.findOne(testSalesOrderTest.getId());
        assertThat(salesOrderTestEs).isEqualToIgnoringGivenFields(testSalesOrderTest);
    }

    @Test
    @Transactional
    public void updateNonExistingSalesOrderTest() throws Exception {
        int databaseSizeBeforeUpdate = salesOrderTestRepository.findAll().size();

        // Create the SalesOrderTest

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSalesOrderTestMockMvc.perform(put("/api/sales-order-tests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderTest)))
            .andExpect(status().isCreated());

        // Validate the SalesOrderTest in the database
        List<SalesOrderTest> salesOrderTestList = salesOrderTestRepository.findAll();
        assertThat(salesOrderTestList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSalesOrderTest() throws Exception {
        // Initialize the database
        salesOrderTestRepository.saveAndFlush(salesOrderTest);
        salesOrderTestSearchRepository.save(salesOrderTest);
        int databaseSizeBeforeDelete = salesOrderTestRepository.findAll().size();

        // Get the salesOrderTest
        restSalesOrderTestMockMvc.perform(delete("/api/sales-order-tests/{id}", salesOrderTest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean salesOrderTestExistsInEs = salesOrderTestSearchRepository.exists(salesOrderTest.getId());
        assertThat(salesOrderTestExistsInEs).isFalse();

        // Validate the database is empty
        List<SalesOrderTest> salesOrderTestList = salesOrderTestRepository.findAll();
        assertThat(salesOrderTestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSalesOrderTest() throws Exception {
        // Initialize the database
        salesOrderTestRepository.saveAndFlush(salesOrderTest);
        salesOrderTestSearchRepository.save(salesOrderTest);

        // Search the salesOrderTest
        restSalesOrderTestMockMvc.perform(get("/api/_search/sales-order-tests?query=id:" + salesOrderTest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salesOrderTest.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO.toString())))
            .andExpect(jsonPath("$.[*].dateModified").value(hasItem(DEFAULT_DATE_MODIFIED.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalesOrderTest.class);
        SalesOrderTest salesOrderTest1 = new SalesOrderTest();
        salesOrderTest1.setId(1L);
        SalesOrderTest salesOrderTest2 = new SalesOrderTest();
        salesOrderTest2.setId(salesOrderTest1.getId());
        assertThat(salesOrderTest1).isEqualTo(salesOrderTest2);
        salesOrderTest2.setId(2L);
        assertThat(salesOrderTest1).isNotEqualTo(salesOrderTest2);
        salesOrderTest1.setId(null);
        assertThat(salesOrderTest1).isNotEqualTo(salesOrderTest2);
    }
}
