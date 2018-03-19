package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.FrontApp;

import io.github.jhipster.application.domain.TestTag;
import io.github.jhipster.application.repository.TestTagRepository;
import io.github.jhipster.application.repository.search.TestTagSearchRepository;
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
 * Test class for the TestTagResource REST controller.
 *
 * @see TestTagResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FrontApp.class)
public class TestTagResourceIntTest {

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TestTagRepository testTagRepository;

    @Autowired
    private TestTagSearchRepository testTagSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestTagMockMvc;

    private TestTag testTag;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestTagResource testTagResource = new TestTagResource(testTagRepository, testTagSearchRepository);
        this.restTestTagMockMvc = MockMvcBuilders.standaloneSetup(testTagResource)
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
    public static TestTag createEntity(EntityManager em) {
        TestTag testTag = new TestTag()
            .active(DEFAULT_ACTIVE)
            .name(DEFAULT_NAME);
        return testTag;
    }

    @Before
    public void initTest() {
        testTagSearchRepository.deleteAll();
        testTag = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestTag() throws Exception {
        int databaseSizeBeforeCreate = testTagRepository.findAll().size();

        // Create the TestTag
        restTestTagMockMvc.perform(post("/api/test-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testTag)))
            .andExpect(status().isCreated());

        // Validate the TestTag in the database
        List<TestTag> testTagList = testTagRepository.findAll();
        assertThat(testTagList).hasSize(databaseSizeBeforeCreate + 1);
        TestTag testTestTag = testTagList.get(testTagList.size() - 1);
        assertThat(testTestTag.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testTestTag.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the TestTag in Elasticsearch
        TestTag testTagEs = testTagSearchRepository.findOne(testTestTag.getId());
        assertThat(testTagEs).isEqualToIgnoringGivenFields(testTestTag);
    }

    @Test
    @Transactional
    public void createTestTagWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testTagRepository.findAll().size();

        // Create the TestTag with an existing ID
        testTag.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestTagMockMvc.perform(post("/api/test-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testTag)))
            .andExpect(status().isBadRequest());

        // Validate the TestTag in the database
        List<TestTag> testTagList = testTagRepository.findAll();
        assertThat(testTagList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestTags() throws Exception {
        // Initialize the database
        testTagRepository.saveAndFlush(testTag);

        // Get all the testTagList
        restTestTagMockMvc.perform(get("/api/test-tags?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testTag.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getTestTag() throws Exception {
        // Initialize the database
        testTagRepository.saveAndFlush(testTag);

        // Get the testTag
        restTestTagMockMvc.perform(get("/api/test-tags/{id}", testTag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testTag.getId().intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestTag() throws Exception {
        // Get the testTag
        restTestTagMockMvc.perform(get("/api/test-tags/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestTag() throws Exception {
        // Initialize the database
        testTagRepository.saveAndFlush(testTag);
        testTagSearchRepository.save(testTag);
        int databaseSizeBeforeUpdate = testTagRepository.findAll().size();

        // Update the testTag
        TestTag updatedTestTag = testTagRepository.findOne(testTag.getId());
        // Disconnect from session so that the updates on updatedTestTag are not directly saved in db
        em.detach(updatedTestTag);
        updatedTestTag
            .active(UPDATED_ACTIVE)
            .name(UPDATED_NAME);

        restTestTagMockMvc.perform(put("/api/test-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestTag)))
            .andExpect(status().isOk());

        // Validate the TestTag in the database
        List<TestTag> testTagList = testTagRepository.findAll();
        assertThat(testTagList).hasSize(databaseSizeBeforeUpdate);
        TestTag testTestTag = testTagList.get(testTagList.size() - 1);
        assertThat(testTestTag.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testTestTag.getName()).isEqualTo(UPDATED_NAME);

        // Validate the TestTag in Elasticsearch
        TestTag testTagEs = testTagSearchRepository.findOne(testTestTag.getId());
        assertThat(testTagEs).isEqualToIgnoringGivenFields(testTestTag);
    }

    @Test
    @Transactional
    public void updateNonExistingTestTag() throws Exception {
        int databaseSizeBeforeUpdate = testTagRepository.findAll().size();

        // Create the TestTag

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestTagMockMvc.perform(put("/api/test-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testTag)))
            .andExpect(status().isCreated());

        // Validate the TestTag in the database
        List<TestTag> testTagList = testTagRepository.findAll();
        assertThat(testTagList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestTag() throws Exception {
        // Initialize the database
        testTagRepository.saveAndFlush(testTag);
        testTagSearchRepository.save(testTag);
        int databaseSizeBeforeDelete = testTagRepository.findAll().size();

        // Get the testTag
        restTestTagMockMvc.perform(delete("/api/test-tags/{id}", testTag.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean testTagExistsInEs = testTagSearchRepository.exists(testTag.getId());
        assertThat(testTagExistsInEs).isFalse();

        // Validate the database is empty
        List<TestTag> testTagList = testTagRepository.findAll();
        assertThat(testTagList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTestTag() throws Exception {
        // Initialize the database
        testTagRepository.saveAndFlush(testTag);
        testTagSearchRepository.save(testTag);

        // Search the testTag
        restTestTagMockMvc.perform(get("/api/_search/test-tags?query=id:" + testTag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testTag.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestTag.class);
        TestTag testTag1 = new TestTag();
        testTag1.setId(1L);
        TestTag testTag2 = new TestTag();
        testTag2.setId(testTag1.getId());
        assertThat(testTag1).isEqualTo(testTag2);
        testTag2.setId(2L);
        assertThat(testTag1).isNotEqualTo(testTag2);
        testTag1.setId(null);
        assertThat(testTag1).isNotEqualTo(testTag2);
    }
}
