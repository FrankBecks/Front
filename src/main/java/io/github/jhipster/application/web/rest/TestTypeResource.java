package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.TestType;

import io.github.jhipster.application.repository.TestTypeRepository;
import io.github.jhipster.application.repository.search.TestTypeSearchRepository;
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
 * REST controller for managing TestType.
 */
@RestController
@RequestMapping("/api")
public class TestTypeResource {

    private final Logger log = LoggerFactory.getLogger(TestTypeResource.class);

    private static final String ENTITY_NAME = "testType";

    private final TestTypeRepository testTypeRepository;

    private final TestTypeSearchRepository testTypeSearchRepository;

    public TestTypeResource(TestTypeRepository testTypeRepository, TestTypeSearchRepository testTypeSearchRepository) {
        this.testTypeRepository = testTypeRepository;
        this.testTypeSearchRepository = testTypeSearchRepository;
    }

    /**
     * POST  /test-types : Create a new testType.
     *
     * @param testType the testType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testType, or with status 400 (Bad Request) if the testType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-types")
    @Timed
    public ResponseEntity<TestType> createTestType(@RequestBody TestType testType) throws URISyntaxException {
        log.debug("REST request to save TestType : {}", testType);
        if (testType.getId() != null) {
            throw new BadRequestAlertException("A new testType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestType result = testTypeRepository.save(testType);
        testTypeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/test-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-types : Updates an existing testType.
     *
     * @param testType the testType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testType,
     * or with status 400 (Bad Request) if the testType is not valid,
     * or with status 500 (Internal Server Error) if the testType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-types")
    @Timed
    public ResponseEntity<TestType> updateTestType(@RequestBody TestType testType) throws URISyntaxException {
        log.debug("REST request to update TestType : {}", testType);
        if (testType.getId() == null) {
            return createTestType(testType);
        }
        TestType result = testTypeRepository.save(testType);
        testTypeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-types : get all the testTypes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of testTypes in body
     */
    @GetMapping("/test-types")
    @Timed
    public List<TestType> getAllTestTypes(@RequestParam(required = false) String filter) {
        if ("salesorder-is-null".equals(filter)) {
            log.debug("REST request to get all TestTypes where salesOrder is null");
            return StreamSupport
                .stream(testTypeRepository.findAll().spliterator(), false)
                .filter(testType -> testType.getSalesOrder() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all TestTypes");
        return testTypeRepository.findAll();
        }

    /**
     * GET  /test-types/:id : get the "id" testType.
     *
     * @param id the id of the testType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testType, or with status 404 (Not Found)
     */
    @GetMapping("/test-types/{id}")
    @Timed
    public ResponseEntity<TestType> getTestType(@PathVariable Long id) {
        log.debug("REST request to get TestType : {}", id);
        TestType testType = testTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testType));
    }

    /**
     * DELETE  /test-types/:id : delete the "id" testType.
     *
     * @param id the id of the testType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestType(@PathVariable Long id) {
        log.debug("REST request to delete TestType : {}", id);
        testTypeRepository.delete(id);
        testTypeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/test-types?query=:query : search for the testType corresponding
     * to the query.
     *
     * @param query the query of the testType search
     * @return the result of the search
     */
    @GetMapping("/_search/test-types")
    @Timed
    public List<TestType> searchTestTypes(@RequestParam String query) {
        log.debug("REST request to search TestTypes for query {}", query);
        return StreamSupport
            .stream(testTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
