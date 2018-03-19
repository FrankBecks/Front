package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.FrontApp;

import io.github.jhipster.application.domain.ParameterOption;
import io.github.jhipster.application.repository.ParameterOptionRepository;
import io.github.jhipster.application.repository.search.ParameterOptionSearchRepository;
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
 * Test class for the ParameterOptionResource REST controller.
 *
 * @see ParameterOptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FrontApp.class)
public class ParameterOptionResourceIntTest {

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_INFO = "AAAAAAAAAA";
    private static final String UPDATED_INFO = "BBBBBBBBBB";

    @Autowired
    private ParameterOptionRepository parameterOptionRepository;

    @Autowired
    private ParameterOptionSearchRepository parameterOptionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParameterOptionMockMvc;

    private ParameterOption parameterOption;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParameterOptionResource parameterOptionResource = new ParameterOptionResource(parameterOptionRepository, parameterOptionSearchRepository);
        this.restParameterOptionMockMvc = MockMvcBuilders.standaloneSetup(parameterOptionResource)
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
    public static ParameterOption createEntity(EntityManager em) {
        ParameterOption parameterOption = new ParameterOption()
            .active(DEFAULT_ACTIVE)
            .name(DEFAULT_NAME)
            .info(DEFAULT_INFO);
        return parameterOption;
    }

    @Before
    public void initTest() {
        parameterOptionSearchRepository.deleteAll();
        parameterOption = createEntity(em);
    }

    @Test
    @Transactional
    public void createParameterOption() throws Exception {
        int databaseSizeBeforeCreate = parameterOptionRepository.findAll().size();

        // Create the ParameterOption
        restParameterOptionMockMvc.perform(post("/api/parameter-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parameterOption)))
            .andExpect(status().isCreated());

        // Validate the ParameterOption in the database
        List<ParameterOption> parameterOptionList = parameterOptionRepository.findAll();
        assertThat(parameterOptionList).hasSize(databaseSizeBeforeCreate + 1);
        ParameterOption testParameterOption = parameterOptionList.get(parameterOptionList.size() - 1);
        assertThat(testParameterOption.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testParameterOption.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testParameterOption.getInfo()).isEqualTo(DEFAULT_INFO);

        // Validate the ParameterOption in Elasticsearch
        ParameterOption parameterOptionEs = parameterOptionSearchRepository.findOne(testParameterOption.getId());
        assertThat(parameterOptionEs).isEqualToIgnoringGivenFields(testParameterOption);
    }

    @Test
    @Transactional
    public void createParameterOptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parameterOptionRepository.findAll().size();

        // Create the ParameterOption with an existing ID
        parameterOption.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParameterOptionMockMvc.perform(post("/api/parameter-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parameterOption)))
            .andExpect(status().isBadRequest());

        // Validate the ParameterOption in the database
        List<ParameterOption> parameterOptionList = parameterOptionRepository.findAll();
        assertThat(parameterOptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParameterOptions() throws Exception {
        // Initialize the database
        parameterOptionRepository.saveAndFlush(parameterOption);

        // Get all the parameterOptionList
        restParameterOptionMockMvc.perform(get("/api/parameter-options?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parameterOption.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO.toString())));
    }

    @Test
    @Transactional
    public void getParameterOption() throws Exception {
        // Initialize the database
        parameterOptionRepository.saveAndFlush(parameterOption);

        // Get the parameterOption
        restParameterOptionMockMvc.perform(get("/api/parameter-options/{id}", parameterOption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parameterOption.getId().intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.info").value(DEFAULT_INFO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParameterOption() throws Exception {
        // Get the parameterOption
        restParameterOptionMockMvc.perform(get("/api/parameter-options/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParameterOption() throws Exception {
        // Initialize the database
        parameterOptionRepository.saveAndFlush(parameterOption);
        parameterOptionSearchRepository.save(parameterOption);
        int databaseSizeBeforeUpdate = parameterOptionRepository.findAll().size();

        // Update the parameterOption
        ParameterOption updatedParameterOption = parameterOptionRepository.findOne(parameterOption.getId());
        // Disconnect from session so that the updates on updatedParameterOption are not directly saved in db
        em.detach(updatedParameterOption);
        updatedParameterOption
            .active(UPDATED_ACTIVE)
            .name(UPDATED_NAME)
            .info(UPDATED_INFO);

        restParameterOptionMockMvc.perform(put("/api/parameter-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParameterOption)))
            .andExpect(status().isOk());

        // Validate the ParameterOption in the database
        List<ParameterOption> parameterOptionList = parameterOptionRepository.findAll();
        assertThat(parameterOptionList).hasSize(databaseSizeBeforeUpdate);
        ParameterOption testParameterOption = parameterOptionList.get(parameterOptionList.size() - 1);
        assertThat(testParameterOption.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testParameterOption.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testParameterOption.getInfo()).isEqualTo(UPDATED_INFO);

        // Validate the ParameterOption in Elasticsearch
        ParameterOption parameterOptionEs = parameterOptionSearchRepository.findOne(testParameterOption.getId());
        assertThat(parameterOptionEs).isEqualToIgnoringGivenFields(testParameterOption);
    }

    @Test
    @Transactional
    public void updateNonExistingParameterOption() throws Exception {
        int databaseSizeBeforeUpdate = parameterOptionRepository.findAll().size();

        // Create the ParameterOption

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restParameterOptionMockMvc.perform(put("/api/parameter-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parameterOption)))
            .andExpect(status().isCreated());

        // Validate the ParameterOption in the database
        List<ParameterOption> parameterOptionList = parameterOptionRepository.findAll();
        assertThat(parameterOptionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteParameterOption() throws Exception {
        // Initialize the database
        parameterOptionRepository.saveAndFlush(parameterOption);
        parameterOptionSearchRepository.save(parameterOption);
        int databaseSizeBeforeDelete = parameterOptionRepository.findAll().size();

        // Get the parameterOption
        restParameterOptionMockMvc.perform(delete("/api/parameter-options/{id}", parameterOption.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean parameterOptionExistsInEs = parameterOptionSearchRepository.exists(parameterOption.getId());
        assertThat(parameterOptionExistsInEs).isFalse();

        // Validate the database is empty
        List<ParameterOption> parameterOptionList = parameterOptionRepository.findAll();
        assertThat(parameterOptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchParameterOption() throws Exception {
        // Initialize the database
        parameterOptionRepository.saveAndFlush(parameterOption);
        parameterOptionSearchRepository.save(parameterOption);

        // Search the parameterOption
        restParameterOptionMockMvc.perform(get("/api/_search/parameter-options?query=id:" + parameterOption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parameterOption.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParameterOption.class);
        ParameterOption parameterOption1 = new ParameterOption();
        parameterOption1.setId(1L);
        ParameterOption parameterOption2 = new ParameterOption();
        parameterOption2.setId(parameterOption1.getId());
        assertThat(parameterOption1).isEqualTo(parameterOption2);
        parameterOption2.setId(2L);
        assertThat(parameterOption1).isNotEqualTo(parameterOption2);
        parameterOption1.setId(null);
        assertThat(parameterOption1).isNotEqualTo(parameterOption2);
    }
}
