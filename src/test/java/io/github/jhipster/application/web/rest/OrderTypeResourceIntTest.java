package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.FrontApp;

import io.github.jhipster.application.domain.OrderType;
import io.github.jhipster.application.repository.OrderTypeRepository;
import io.github.jhipster.application.repository.search.OrderTypeSearchRepository;
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
 * Test class for the OrderTypeResource REST controller.
 *
 * @see OrderTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FrontApp.class)
public class OrderTypeResourceIntTest {

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private OrderTypeRepository orderTypeRepository;

    @Autowired
    private OrderTypeSearchRepository orderTypeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderTypeMockMvc;

    private OrderType orderType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderTypeResource orderTypeResource = new OrderTypeResource(orderTypeRepository, orderTypeSearchRepository);
        this.restOrderTypeMockMvc = MockMvcBuilders.standaloneSetup(orderTypeResource)
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
    public static OrderType createEntity(EntityManager em) {
        OrderType orderType = new OrderType()
            .active(DEFAULT_ACTIVE)
            .name(DEFAULT_NAME);
        return orderType;
    }

    @Before
    public void initTest() {
        orderTypeSearchRepository.deleteAll();
        orderType = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderType() throws Exception {
        int databaseSizeBeforeCreate = orderTypeRepository.findAll().size();

        // Create the OrderType
        restOrderTypeMockMvc.perform(post("/api/order-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderType)))
            .andExpect(status().isCreated());

        // Validate the OrderType in the database
        List<OrderType> orderTypeList = orderTypeRepository.findAll();
        assertThat(orderTypeList).hasSize(databaseSizeBeforeCreate + 1);
        OrderType testOrderType = orderTypeList.get(orderTypeList.size() - 1);
        assertThat(testOrderType.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testOrderType.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the OrderType in Elasticsearch
        OrderType orderTypeEs = orderTypeSearchRepository.findOne(testOrderType.getId());
        assertThat(orderTypeEs).isEqualToIgnoringGivenFields(testOrderType);
    }

    @Test
    @Transactional
    public void createOrderTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderTypeRepository.findAll().size();

        // Create the OrderType with an existing ID
        orderType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderTypeMockMvc.perform(post("/api/order-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderType)))
            .andExpect(status().isBadRequest());

        // Validate the OrderType in the database
        List<OrderType> orderTypeList = orderTypeRepository.findAll();
        assertThat(orderTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrderTypes() throws Exception {
        // Initialize the database
        orderTypeRepository.saveAndFlush(orderType);

        // Get all the orderTypeList
        restOrderTypeMockMvc.perform(get("/api/order-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderType.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getOrderType() throws Exception {
        // Initialize the database
        orderTypeRepository.saveAndFlush(orderType);

        // Get the orderType
        restOrderTypeMockMvc.perform(get("/api/order-types/{id}", orderType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderType.getId().intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderType() throws Exception {
        // Get the orderType
        restOrderTypeMockMvc.perform(get("/api/order-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderType() throws Exception {
        // Initialize the database
        orderTypeRepository.saveAndFlush(orderType);
        orderTypeSearchRepository.save(orderType);
        int databaseSizeBeforeUpdate = orderTypeRepository.findAll().size();

        // Update the orderType
        OrderType updatedOrderType = orderTypeRepository.findOne(orderType.getId());
        // Disconnect from session so that the updates on updatedOrderType are not directly saved in db
        em.detach(updatedOrderType);
        updatedOrderType
            .active(UPDATED_ACTIVE)
            .name(UPDATED_NAME);

        restOrderTypeMockMvc.perform(put("/api/order-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderType)))
            .andExpect(status().isOk());

        // Validate the OrderType in the database
        List<OrderType> orderTypeList = orderTypeRepository.findAll();
        assertThat(orderTypeList).hasSize(databaseSizeBeforeUpdate);
        OrderType testOrderType = orderTypeList.get(orderTypeList.size() - 1);
        assertThat(testOrderType.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testOrderType.getName()).isEqualTo(UPDATED_NAME);

        // Validate the OrderType in Elasticsearch
        OrderType orderTypeEs = orderTypeSearchRepository.findOne(testOrderType.getId());
        assertThat(orderTypeEs).isEqualToIgnoringGivenFields(testOrderType);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderType() throws Exception {
        int databaseSizeBeforeUpdate = orderTypeRepository.findAll().size();

        // Create the OrderType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderTypeMockMvc.perform(put("/api/order-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderType)))
            .andExpect(status().isCreated());

        // Validate the OrderType in the database
        List<OrderType> orderTypeList = orderTypeRepository.findAll();
        assertThat(orderTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrderType() throws Exception {
        // Initialize the database
        orderTypeRepository.saveAndFlush(orderType);
        orderTypeSearchRepository.save(orderType);
        int databaseSizeBeforeDelete = orderTypeRepository.findAll().size();

        // Get the orderType
        restOrderTypeMockMvc.perform(delete("/api/order-types/{id}", orderType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean orderTypeExistsInEs = orderTypeSearchRepository.exists(orderType.getId());
        assertThat(orderTypeExistsInEs).isFalse();

        // Validate the database is empty
        List<OrderType> orderTypeList = orderTypeRepository.findAll();
        assertThat(orderTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchOrderType() throws Exception {
        // Initialize the database
        orderTypeRepository.saveAndFlush(orderType);
        orderTypeSearchRepository.save(orderType);

        // Search the orderType
        restOrderTypeMockMvc.perform(get("/api/_search/order-types?query=id:" + orderType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderType.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderType.class);
        OrderType orderType1 = new OrderType();
        orderType1.setId(1L);
        OrderType orderType2 = new OrderType();
        orderType2.setId(orderType1.getId());
        assertThat(orderType1).isEqualTo(orderType2);
        orderType2.setId(2L);
        assertThat(orderType1).isNotEqualTo(orderType2);
        orderType1.setId(null);
        assertThat(orderType1).isNotEqualTo(orderType2);
    }
}
