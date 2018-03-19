package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.SalesOrderTest;

import io.github.jhipster.application.repository.SalesOrderTestRepository;
import io.github.jhipster.application.repository.search.SalesOrderTestSearchRepository;
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
 * REST controller for managing SalesOrderTest.
 */
@RestController
@RequestMapping("/api")
public class SalesOrderTestResource {

    private final Logger log = LoggerFactory.getLogger(SalesOrderTestResource.class);

    private static final String ENTITY_NAME = "salesOrderTest";

    private final SalesOrderTestRepository salesOrderTestRepository;

    private final SalesOrderTestSearchRepository salesOrderTestSearchRepository;

    public SalesOrderTestResource(SalesOrderTestRepository salesOrderTestRepository, SalesOrderTestSearchRepository salesOrderTestSearchRepository) {
        this.salesOrderTestRepository = salesOrderTestRepository;
        this.salesOrderTestSearchRepository = salesOrderTestSearchRepository;
    }

    /**
     * POST  /sales-order-tests : Create a new salesOrderTest.
     *
     * @param salesOrderTest the salesOrderTest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new salesOrderTest, or with status 400 (Bad Request) if the salesOrderTest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sales-order-tests")
    @Timed
    public ResponseEntity<SalesOrderTest> createSalesOrderTest(@RequestBody SalesOrderTest salesOrderTest) throws URISyntaxException {
        log.debug("REST request to save SalesOrderTest : {}", salesOrderTest);
        if (salesOrderTest.getId() != null) {
            throw new BadRequestAlertException("A new salesOrderTest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SalesOrderTest result = salesOrderTestRepository.save(salesOrderTest);
        salesOrderTestSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sales-order-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sales-order-tests : Updates an existing salesOrderTest.
     *
     * @param salesOrderTest the salesOrderTest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated salesOrderTest,
     * or with status 400 (Bad Request) if the salesOrderTest is not valid,
     * or with status 500 (Internal Server Error) if the salesOrderTest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sales-order-tests")
    @Timed
    public ResponseEntity<SalesOrderTest> updateSalesOrderTest(@RequestBody SalesOrderTest salesOrderTest) throws URISyntaxException {
        log.debug("REST request to update SalesOrderTest : {}", salesOrderTest);
        if (salesOrderTest.getId() == null) {
            return createSalesOrderTest(salesOrderTest);
        }
        SalesOrderTest result = salesOrderTestRepository.save(salesOrderTest);
        salesOrderTestSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, salesOrderTest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sales-order-tests : get all the salesOrderTests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of salesOrderTests in body
     */
    @GetMapping("/sales-order-tests")
    @Timed
    public List<SalesOrderTest> getAllSalesOrderTests() {
        log.debug("REST request to get all SalesOrderTests");
        return salesOrderTestRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /sales-order-tests/:id : get the "id" salesOrderTest.
     *
     * @param id the id of the salesOrderTest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the salesOrderTest, or with status 404 (Not Found)
     */
    @GetMapping("/sales-order-tests/{id}")
    @Timed
    public ResponseEntity<SalesOrderTest> getSalesOrderTest(@PathVariable Long id) {
        log.debug("REST request to get SalesOrderTest : {}", id);
        SalesOrderTest salesOrderTest = salesOrderTestRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(salesOrderTest));
    }

    /**
     * DELETE  /sales-order-tests/:id : delete the "id" salesOrderTest.
     *
     * @param id the id of the salesOrderTest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sales-order-tests/{id}")
    @Timed
    public ResponseEntity<Void> deleteSalesOrderTest(@PathVariable Long id) {
        log.debug("REST request to delete SalesOrderTest : {}", id);
        salesOrderTestRepository.delete(id);
        salesOrderTestSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sales-order-tests?query=:query : search for the salesOrderTest corresponding
     * to the query.
     *
     * @param query the query of the salesOrderTest search
     * @return the result of the search
     */
    @GetMapping("/_search/sales-order-tests")
    @Timed
    public List<SalesOrderTest> searchSalesOrderTests(@RequestParam String query) {
        log.debug("REST request to search SalesOrderTests for query {}", query);
        return StreamSupport
            .stream(salesOrderTestSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
