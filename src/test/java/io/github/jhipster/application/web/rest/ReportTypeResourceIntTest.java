package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.FrontApp;

import io.github.jhipster.application.domain.ReportType;
import io.github.jhipster.application.repository.ReportTypeRepository;
import io.github.jhipster.application.repository.search.ReportTypeSearchRepository;
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
 * Test class for the ReportTypeResource REST controller.
 *
 * @see ReportTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FrontApp.class)
public class ReportTypeResourceIntTest {

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ReportTypeRepository reportTypeRepository;

    @Autowired
    private ReportTypeSearchRepository reportTypeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReportTypeMockMvc;

    private ReportType reportType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReportTypeResource reportTypeResource = new ReportTypeResource(reportTypeRepository, reportTypeSearchRepository);
        this.restReportTypeMockMvc = MockMvcBuilders.standaloneSetup(reportTypeResource)
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
    public static ReportType createEntity(EntityManager em) {
        ReportType reportType = new ReportType()
            .active(DEFAULT_ACTIVE)
            .name(DEFAULT_NAME);
        return reportType;
    }

    @Before
    public void initTest() {
        reportTypeSearchRepository.deleteAll();
        reportType = createEntity(em);
    }

    @Test
    @Transactional
    public void createReportType() throws Exception {
        int databaseSizeBeforeCreate = reportTypeRepository.findAll().size();

        // Create the ReportType
        restReportTypeMockMvc.perform(post("/api/report-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportType)))
            .andExpect(status().isCreated());

        // Validate the ReportType in the database
        List<ReportType> reportTypeList = reportTypeRepository.findAll();
        assertThat(reportTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ReportType testReportType = reportTypeList.get(reportTypeList.size() - 1);
        assertThat(testReportType.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testReportType.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the ReportType in Elasticsearch
        ReportType reportTypeEs = reportTypeSearchRepository.findOne(testReportType.getId());
        assertThat(reportTypeEs).isEqualToIgnoringGivenFields(testReportType);
    }

    @Test
    @Transactional
    public void createReportTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reportTypeRepository.findAll().size();

        // Create the ReportType with an existing ID
        reportType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReportTypeMockMvc.perform(post("/api/report-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportType)))
            .andExpect(status().isBadRequest());

        // Validate the ReportType in the database
        List<ReportType> reportTypeList = reportTypeRepository.findAll();
        assertThat(reportTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReportTypes() throws Exception {
        // Initialize the database
        reportTypeRepository.saveAndFlush(reportType);

        // Get all the reportTypeList
        restReportTypeMockMvc.perform(get("/api/report-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reportType.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getReportType() throws Exception {
        // Initialize the database
        reportTypeRepository.saveAndFlush(reportType);

        // Get the reportType
        restReportTypeMockMvc.perform(get("/api/report-types/{id}", reportType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reportType.getId().intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReportType() throws Exception {
        // Get the reportType
        restReportTypeMockMvc.perform(get("/api/report-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReportType() throws Exception {
        // Initialize the database
        reportTypeRepository.saveAndFlush(reportType);
        reportTypeSearchRepository.save(reportType);
        int databaseSizeBeforeUpdate = reportTypeRepository.findAll().size();

        // Update the reportType
        ReportType updatedReportType = reportTypeRepository.findOne(reportType.getId());
        // Disconnect from session so that the updates on updatedReportType are not directly saved in db
        em.detach(updatedReportType);
        updatedReportType
            .active(UPDATED_ACTIVE)
            .name(UPDATED_NAME);

        restReportTypeMockMvc.perform(put("/api/report-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReportType)))
            .andExpect(status().isOk());

        // Validate the ReportType in the database
        List<ReportType> reportTypeList = reportTypeRepository.findAll();
        assertThat(reportTypeList).hasSize(databaseSizeBeforeUpdate);
        ReportType testReportType = reportTypeList.get(reportTypeList.size() - 1);
        assertThat(testReportType.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testReportType.getName()).isEqualTo(UPDATED_NAME);

        // Validate the ReportType in Elasticsearch
        ReportType reportTypeEs = reportTypeSearchRepository.findOne(testReportType.getId());
        assertThat(reportTypeEs).isEqualToIgnoringGivenFields(testReportType);
    }

    @Test
    @Transactional
    public void updateNonExistingReportType() throws Exception {
        int databaseSizeBeforeUpdate = reportTypeRepository.findAll().size();

        // Create the ReportType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restReportTypeMockMvc.perform(put("/api/report-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reportType)))
            .andExpect(status().isCreated());

        // Validate the ReportType in the database
        List<ReportType> reportTypeList = reportTypeRepository.findAll();
        assertThat(reportTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteReportType() throws Exception {
        // Initialize the database
        reportTypeRepository.saveAndFlush(reportType);
        reportTypeSearchRepository.save(reportType);
        int databaseSizeBeforeDelete = reportTypeRepository.findAll().size();

        // Get the reportType
        restReportTypeMockMvc.perform(delete("/api/report-types/{id}", reportType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean reportTypeExistsInEs = reportTypeSearchRepository.exists(reportType.getId());
        assertThat(reportTypeExistsInEs).isFalse();

        // Validate the database is empty
        List<ReportType> reportTypeList = reportTypeRepository.findAll();
        assertThat(reportTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchReportType() throws Exception {
        // Initialize the database
        reportTypeRepository.saveAndFlush(reportType);
        reportTypeSearchRepository.save(reportType);

        // Search the reportType
        restReportTypeMockMvc.perform(get("/api/_search/report-types?query=id:" + reportType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reportType.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReportType.class);
        ReportType reportType1 = new ReportType();
        reportType1.setId(1L);
        ReportType reportType2 = new ReportType();
        reportType2.setId(reportType1.getId());
        assertThat(reportType1).isEqualTo(reportType2);
        reportType2.setId(2L);
        assertThat(reportType1).isNotEqualTo(reportType2);
        reportType1.setId(null);
        assertThat(reportType1).isNotEqualTo(reportType2);
    }
}
