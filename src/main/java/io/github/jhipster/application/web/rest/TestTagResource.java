package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.TestTag;

import io.github.jhipster.application.repository.TestTagRepository;
import io.github.jhipster.application.repository.search.TestTagSearchRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TestTag.
 */
@RestController
@RequestMapping("/api")
public class TestTagResource {

    private final Logger log = LoggerFactory.getLogger(TestTagResource.class);

    private static final String ENTITY_NAME = "testTag";

    private final TestTagRepository testTagRepository;

    private final TestTagSearchRepository testTagSearchRepository;

    public TestTagResource(TestTagRepository testTagRepository, TestTagSearchRepository testTagSearchRepository) {
        this.testTagRepository = testTagRepository;
        this.testTagSearchRepository = testTagSearchRepository;
    }

    /**
     * POST  /test-tags : Create a new testTag.
     *
     * @param testTag the testTag to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testTag, or with status 400 (Bad Request) if the testTag has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-tags")
    @Timed
    public ResponseEntity<TestTag> createTestTag(@RequestBody TestTag testTag) throws URISyntaxException {
        log.debug("REST request to save TestTag : {}", testTag);
        if (testTag.getId() != null) {
            throw new BadRequestAlertException("A new testTag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestTag result = testTagRepository.save(testTag);
        testTagSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/test-tags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-tags : Updates an existing testTag.
     *
     * @param testTag the testTag to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testTag,
     * or with status 400 (Bad Request) if the testTag is not valid,
     * or with status 500 (Internal Server Error) if the testTag couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-tags")
    @Timed
    public ResponseEntity<TestTag> updateTestTag(@RequestBody TestTag testTag) throws URISyntaxException {
        log.debug("REST request to update TestTag : {}", testTag);
        if (testTag.getId() == null) {
            return createTestTag(testTag);
        }
        TestTag result = testTagRepository.save(testTag);
        testTagSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testTag.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-tags : get all the testTags.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testTags in body
     */
    @GetMapping("/test-tags")
    @Timed
    public List<TestTag> getAllTestTags() {
        log.debug("REST request to get all TestTags");
        return testTagRepository.findAll();
        }

    /**
     * GET  /test-tags/:id : get the "id" testTag.
     *
     * @param id the id of the testTag to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testTag, or with status 404 (Not Found)
     */
    @GetMapping("/test-tags/{id}")
    @Timed
    public ResponseEntity<TestTag> getTestTag(@PathVariable Long id) {
        log.debug("REST request to get TestTag : {}", id);
        TestTag testTag = testTagRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testTag));
    }

    /**
     * DELETE  /test-tags/:id : delete the "id" testTag.
     *
     * @param id the id of the testTag to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-tags/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestTag(@PathVariable Long id) {
        log.debug("REST request to delete TestTag : {}", id);
        testTagRepository.delete(id);
        testTagSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-tags?query=:query : search for the testTag corresponding
     * to the query.
     *
     * @param query the query of the testTag search
     * @return the result of the search
     */
    @GetMapping("/_search/test-tags")
    @Timed
    public List<TestTag> searchTestTags(@RequestParam String query) {
        log.debug("REST request to search TestTags for query {}", query);
        return StreamSupport
            .stream(testTagSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
