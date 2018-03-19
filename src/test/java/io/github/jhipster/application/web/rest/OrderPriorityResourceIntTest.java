package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.FrontApp;

import io.github.jhipster.application.domain.OrderPriority;
import io.github.jhipster.application.repository.OrderPriorityRepository;
import io.github.jhipster.application.repository.search.OrderPrioritySearchRepository;
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
 * Test class for the OrderPriorityResource REST controller.
 *
 * @see OrderPriorityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FrontApp.class)
public class OrderPriorityResourceIntTest {

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private OrderPriorityRepository orderPriorityRepository;

    @Autowired
    private OrderPrioritySearchRepository orderPrioritySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderPriorityMockMvc;

    private OrderPriority orderPriority;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderPriorityResource orderPriorityResource = new OrderPriorityResource(orderPriorityRepository, orderPrioritySearchRepository);
        this.restOrderPriorityMockMvc = MockMvcBuilders.standaloneSetup(orderPriorityResource)
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
    public static OrderPriority createEntity(EntityManager em) {
        OrderPriority orderPriority = new OrderPriority()
            .active(DEFAULT_ACTIVE)
            .name(DEFAULT_NAME);
        return orderPriority;
    }

    @Before
    public void initTest() {
        orderPrioritySearchRepository.deleteAll();
        orderPriority = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderPriority() throws Exception {
        int databaseSizeBeforeCreate = orderPriorityRepository.findAll().size();

        // Create the OrderPriority
        restOrderPriorityMockMvc.perform(post("/api/order-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderPriority)))
            .andExpect(status().isCreated());

        // Validate the OrderPriority in the database
        List<OrderPriority> orderPriorityList = orderPriorityRepository.findAll();
        assertThat(orderPriorityList).hasSize(databaseSizeBeforeCreate + 1);
        OrderPriority testOrderPriority = orderPriorityList.get(orderPriorityList.size() - 1);
        assertThat(testOrderPriority.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testOrderPriority.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the OrderPriority in Elasticsearch
        OrderPriority orderPriorityEs = orderPrioritySearchRepository.findOne(testOrderPriority.getId());
        assertThat(orderPriorityEs).isEqualToIgnoringGivenFields(testOrderPriority);
    }

    @Test
    @Transactional
    public void createOrderPriorityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderPriorityRepository.findAll().size();

        // Create the OrderPriority with an existing ID
        orderPriority.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderPriorityMockMvc.perform(post("/api/order-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderPriority)))
            .andExpect(status().isBadRequest());

        // Validate the OrderPriority in the database
        List<OrderPriority> orderPriorityList = orderPriorityRepository.findAll();
        assertThat(orderPriorityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrderPriorities() throws Exception {
        // Initialize the database
        orderPriorityRepository.saveAndFlush(orderPriority);

        // Get all the orderPriorityList
        restOrderPriorityMockMvc.perform(get("/api/order-priorities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderPriority.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getOrderPriority() throws Exception {
        // Initialize the database
        orderPriorityRepository.saveAndFlush(orderPriority);

        // Get the orderPriority
        restOrderPriorityMockMvc.perform(get("/api/order-priorities/{id}", orderPriority.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderPriority.getId().intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderPriority() throws Exception {
        // Get the orderPriority
        restOrderPriorityMockMvc.perform(get("/api/order-priorities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderPriority() throws Exception {
        // Initialize the database
        orderPriorityRepository.saveAndFlush(orderPriority);
        orderPrioritySearchRepository.save(orderPriority);
        int databaseSizeBeforeUpdate = orderPriorityRepository.findAll().size();

        // Update the orderPriority
        OrderPriority updatedOrderPriority = orderPriorityRepository.findOne(orderPriority.getId());
        // Disconnect from session so that the updates on updatedOrderPriority are not directly saved in db
        em.detach(updatedOrderPriority);
        updatedOrderPriority
            .active(UPDATED_ACTIVE)
            .name(UPDATED_NAME);

        restOrderPriorityMockMvc.perform(put("/api/order-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderPriority)))
            .andExpect(status().isOk());

        // Validate the OrderPriority in the database
        List<OrderPriority> orderPriorityList = orderPriorityRepository.findAll();
        assertThat(orderPriorityList).hasSize(databaseSizeBeforeUpdate);
        OrderPriority testOrderPriority = orderPriorityList.get(orderPriorityList.size() - 1);
        assertThat(testOrderPriority.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testOrderPriority.getName()).isEqualTo(UPDATED_NAME);

        // Validate the OrderPriority in Elasticsearch
        OrderPriority orderPriorityEs = orderPrioritySearchRepository.findOne(testOrderPriority.getId());
        assertThat(orderPriorityEs).isEqualToIgnoringGivenFields(testOrderPriority);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderPriority() throws Exception {
        int databaseSizeBeforeUpdate = orderPriorityRepository.findAll().size();

        // Create the OrderPriority

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderPriorityMockMvc.perform(put("/api/order-priorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderPriority)))
            .andExpect(status().isCreated());

        // Validate the OrderPriority in the database
        List<OrderPriority> orderPriorityList = orderPriorityRepository.findAll();
        assertThat(orderPriorityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrderPriority() throws Exception {
        // Initialize the database
        orderPriorityRepository.saveAndFlush(orderPriority);
        orderPrioritySearchRepository.save(orderPriority);
        int databaseSizeBeforeDelete = orderPriorityRepository.findAll().size();

        // Get the orderPriority
        restOrderPriorityMockMvc.perform(delete("/api/order-priorities/{id}", orderPriority.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean orderPriorityExistsInEs = orderPrioritySearchRepository.exists(orderPriority.getId());
        assertThat(orderPriorityExistsInEs).isFalse();

        // Validate the database is empty
        List<OrderPriority> orderPriorityList = orderPriorityRepository.findAll();
        assertThat(orderPriorityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchOrderPriority() throws Exception {
        // Initialize the database
        orderPriorityRepository.saveAndFlush(orderPriority);
        orderPrioritySearchRepository.save(orderPriority);

        // Search the orderPriority
        restOrderPriorityMockMvc.perform(get("/api/_search/order-priorities?query=id:" + orderPriority.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderPriority.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderPriority.class);
        OrderPriority orderPriority1 = new OrderPriority();
        orderPriority1.setId(1L);
        OrderPriority orderPriority2 = new OrderPriority();
        orderPriority2.setId(orderPriority1.getId());
        assertThat(orderPriority1).isEqualTo(orderPriority2);
        orderPriority2.setId(2L);
        assertThat(orderPriority1).isNotEqualTo(orderPriority2);
        orderPriority1.setId(null);
        assertThat(orderPriority1).isNotEqualTo(orderPriority2);
    }
}
