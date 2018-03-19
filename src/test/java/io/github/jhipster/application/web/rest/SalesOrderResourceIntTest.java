package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.FrontApp;

import io.github.jhipster.application.domain.SalesOrder;
import io.github.jhipster.application.repository.SalesOrderRepository;
import io.github.jhipster.application.repository.search.SalesOrderSearchRepository;
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
 * Test class for the SalesOrderResource REST controller.
 *
 * @see SalesOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FrontApp.class)
public class SalesOrderResourceIntTest {

    private static final Instant DEFAULT_DATE_EXPECTED_DELIVERY = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_EXPECTED_DELIVERY = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_CONFIRMED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CONFIRMED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_SAMPLES_EXPECTED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_SAMPLES_EXPECTED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_XML_EXPORTED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_XML_EXPORTED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_REF = "AAAAAAAAAA";
    private static final String UPDATED_REF = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final String DEFAULT_REPORT_FILE = "AAAAAAAAAA";
    private static final String UPDATED_REPORT_FILE = "BBBBBBBBBB";

    @Autowired
    private SalesOrderRepository salesOrderRepository;

    @Autowired
    private SalesOrderSearchRepository salesOrderSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSalesOrderMockMvc;

    private SalesOrder salesOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SalesOrderResource salesOrderResource = new SalesOrderResource(salesOrderRepository, salesOrderSearchRepository);
        this.restSalesOrderMockMvc = MockMvcBuilders.standaloneSetup(salesOrderResource)
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
    public static SalesOrder createEntity(EntityManager em) {
        SalesOrder salesOrder = new SalesOrder()
            .dateExpectedDelivery(DEFAULT_DATE_EXPECTED_DELIVERY)
            .dateConfirmed(DEFAULT_DATE_CONFIRMED)
            .dateSamplesExpected(DEFAULT_DATE_SAMPLES_EXPECTED)
            .dateXmlExported(DEFAULT_DATE_XML_EXPORTED)
            .dateModified(DEFAULT_DATE_MODIFIED)
            .ref(DEFAULT_REF)
            .comment(DEFAULT_COMMENT)
            .reportFile(DEFAULT_REPORT_FILE);
        return salesOrder;
    }

    @Before
    public void initTest() {
        salesOrderSearchRepository.deleteAll();
        salesOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalesOrder() throws Exception {
        int databaseSizeBeforeCreate = salesOrderRepository.findAll().size();

        // Create the SalesOrder
        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrder)))
            .andExpect(status().isCreated());

        // Validate the SalesOrder in the database
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeCreate + 1);
        SalesOrder testSalesOrder = salesOrderList.get(salesOrderList.size() - 1);
        assertThat(testSalesOrder.getDateExpectedDelivery()).isEqualTo(DEFAULT_DATE_EXPECTED_DELIVERY);
        assertThat(testSalesOrder.getDateConfirmed()).isEqualTo(DEFAULT_DATE_CONFIRMED);
        assertThat(testSalesOrder.getDateSamplesExpected()).isEqualTo(DEFAULT_DATE_SAMPLES_EXPECTED);
        assertThat(testSalesOrder.getDateXmlExported()).isEqualTo(DEFAULT_DATE_XML_EXPORTED);
        assertThat(testSalesOrder.getDateModified()).isEqualTo(DEFAULT_DATE_MODIFIED);
        assertThat(testSalesOrder.getRef()).isEqualTo(DEFAULT_REF);
        assertThat(testSalesOrder.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testSalesOrder.getReportFile()).isEqualTo(DEFAULT_REPORT_FILE);

        // Validate the SalesOrder in Elasticsearch
        SalesOrder salesOrderEs = salesOrderSearchRepository.findOne(testSalesOrder.getId());
        assertThat(salesOrderEs).isEqualToIgnoringGivenFields(testSalesOrder);
    }

    @Test
    @Transactional
    public void createSalesOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salesOrderRepository.findAll().size();

        // Create the SalesOrder with an existing ID
        salesOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrder)))
            .andExpect(status().isBadRequest());

        // Validate the SalesOrder in the database
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSalesOrders() throws Exception {
        // Initialize the database
        salesOrderRepository.saveAndFlush(salesOrder);

        // Get all the salesOrderList
        restSalesOrderMockMvc.perform(get("/api/sales-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salesOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateExpectedDelivery").value(hasItem(DEFAULT_DATE_EXPECTED_DELIVERY.toString())))
            .andExpect(jsonPath("$.[*].dateConfirmed").value(hasItem(DEFAULT_DATE_CONFIRMED.toString())))
            .andExpect(jsonPath("$.[*].dateSamplesExpected").value(hasItem(DEFAULT_DATE_SAMPLES_EXPECTED.toString())))
            .andExpect(jsonPath("$.[*].dateXmlExported").value(hasItem(DEFAULT_DATE_XML_EXPORTED.toString())))
            .andExpect(jsonPath("$.[*].dateModified").value(hasItem(DEFAULT_DATE_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].ref").value(hasItem(DEFAULT_REF.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].reportFile").value(hasItem(DEFAULT_REPORT_FILE.toString())));
    }

    @Test
    @Transactional
    public void getSalesOrder() throws Exception {
        // Initialize the database
        salesOrderRepository.saveAndFlush(salesOrder);

        // Get the salesOrder
        restSalesOrderMockMvc.perform(get("/api/sales-orders/{id}", salesOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(salesOrder.getId().intValue()))
            .andExpect(jsonPath("$.dateExpectedDelivery").value(DEFAULT_DATE_EXPECTED_DELIVERY.toString()))
            .andExpect(jsonPath("$.dateConfirmed").value(DEFAULT_DATE_CONFIRMED.toString()))
            .andExpect(jsonPath("$.dateSamplesExpected").value(DEFAULT_DATE_SAMPLES_EXPECTED.toString()))
            .andExpect(jsonPath("$.dateXmlExported").value(DEFAULT_DATE_XML_EXPORTED.toString()))
            .andExpect(jsonPath("$.dateModified").value(DEFAULT_DATE_MODIFIED.toString()))
            .andExpect(jsonPath("$.ref").value(DEFAULT_REF.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.reportFile").value(DEFAULT_REPORT_FILE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSalesOrder() throws Exception {
        // Get the salesOrder
        restSalesOrderMockMvc.perform(get("/api/sales-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalesOrder() throws Exception {
        // Initialize the database
        salesOrderRepository.saveAndFlush(salesOrder);
        salesOrderSearchRepository.save(salesOrder);
        int databaseSizeBeforeUpdate = salesOrderRepository.findAll().size();

        // Update the salesOrder
        SalesOrder updatedSalesOrder = salesOrderRepository.findOne(salesOrder.getId());
        // Disconnect from session so that the updates on updatedSalesOrder are not directly saved in db
        em.detach(updatedSalesOrder);
        updatedSalesOrder
            .dateExpectedDelivery(UPDATED_DATE_EXPECTED_DELIVERY)
            .dateConfirmed(UPDATED_DATE_CONFIRMED)
            .dateSamplesExpected(UPDATED_DATE_SAMPLES_EXPECTED)
            .dateXmlExported(UPDATED_DATE_XML_EXPORTED)
            .dateModified(UPDATED_DATE_MODIFIED)
            .ref(UPDATED_REF)
            .comment(UPDATED_COMMENT)
            .reportFile(UPDATED_REPORT_FILE);

        restSalesOrderMockMvc.perform(put("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSalesOrder)))
            .andExpect(status().isOk());

        // Validate the SalesOrder in the database
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeUpdate);
        SalesOrder testSalesOrder = salesOrderList.get(salesOrderList.size() - 1);
        assertThat(testSalesOrder.getDateExpectedDelivery()).isEqualTo(UPDATED_DATE_EXPECTED_DELIVERY);
        assertThat(testSalesOrder.getDateConfirmed()).isEqualTo(UPDATED_DATE_CONFIRMED);
        assertThat(testSalesOrder.getDateSamplesExpected()).isEqualTo(UPDATED_DATE_SAMPLES_EXPECTED);
        assertThat(testSalesOrder.getDateXmlExported()).isEqualTo(UPDATED_DATE_XML_EXPORTED);
        assertThat(testSalesOrder.getDateModified()).isEqualTo(UPDATED_DATE_MODIFIED);
        assertThat(testSalesOrder.getRef()).isEqualTo(UPDATED_REF);
        assertThat(testSalesOrder.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testSalesOrder.getReportFile()).isEqualTo(UPDATED_REPORT_FILE);

        // Validate the SalesOrder in Elasticsearch
        SalesOrder salesOrderEs = salesOrderSearchRepository.findOne(testSalesOrder.getId());
        assertThat(salesOrderEs).isEqualToIgnoringGivenFields(testSalesOrder);
    }

    @Test
    @Transactional
    public void updateNonExistingSalesOrder() throws Exception {
        int databaseSizeBeforeUpdate = salesOrderRepository.findAll().size();

        // Create the SalesOrder

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSalesOrderMockMvc.perform(put("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrder)))
            .andExpect(status().isCreated());

        // Validate the SalesOrder in the database
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSalesOrder() throws Exception {
        // Initialize the database
        salesOrderRepository.saveAndFlush(salesOrder);
        salesOrderSearchRepository.save(salesOrder);
        int databaseSizeBeforeDelete = salesOrderRepository.findAll().size();

        // Get the salesOrder
        restSalesOrderMockMvc.perform(delete("/api/sales-orders/{id}", salesOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean salesOrderExistsInEs = salesOrderSearchRepository.exists(salesOrder.getId());
        assertThat(salesOrderExistsInEs).isFalse();

        // Validate the database is empty
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSalesOrder() throws Exception {
        // Initialize the database
        salesOrderRepository.saveAndFlush(salesOrder);
        salesOrderSearchRepository.save(salesOrder);

        // Search the salesOrder
        restSalesOrderMockMvc.perform(get("/api/_search/sales-orders?query=id:" + salesOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salesOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateExpectedDelivery").value(hasItem(DEFAULT_DATE_EXPECTED_DELIVERY.toString())))
            .andExpect(jsonPath("$.[*].dateConfirmed").value(hasItem(DEFAULT_DATE_CONFIRMED.toString())))
            .andExpect(jsonPath("$.[*].dateSamplesExpected").value(hasItem(DEFAULT_DATE_SAMPLES_EXPECTED.toString())))
            .andExpect(jsonPath("$.[*].dateXmlExported").value(hasItem(DEFAULT_DATE_XML_EXPORTED.toString())))
            .andExpect(jsonPath("$.[*].dateModified").value(hasItem(DEFAULT_DATE_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].ref").value(hasItem(DEFAULT_REF.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].reportFile").value(hasItem(DEFAULT_REPORT_FILE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalesOrder.class);
        SalesOrder salesOrder1 = new SalesOrder();
        salesOrder1.setId(1L);
        SalesOrder salesOrder2 = new SalesOrder();
        salesOrder2.setId(salesOrder1.getId());
        assertThat(salesOrder1).isEqualTo(salesOrder2);
        salesOrder2.setId(2L);
        assertThat(salesOrder1).isNotEqualTo(salesOrder2);
        salesOrder1.setId(null);
        assertThat(salesOrder1).isNotEqualTo(salesOrder2);
    }
}
