package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.ReportType;

import io.github.jhipster.application.repository.ReportTypeRepository;
import io.github.jhipster.application.repository.search.ReportTypeSearchRepository;
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
 * REST controller for managing ReportType.
 */
@RestController
@RequestMapping("/api")
public class ReportTypeResource {

    private final Logger log = LoggerFactory.getLogger(ReportTypeResource.class);

    private static final String ENTITY_NAME = "reportType";

    private final ReportTypeRepository reportTypeRepository;

    private final ReportTypeSearchRepository reportTypeSearchRepository;

    public ReportTypeResource(ReportTypeRepository reportTypeRepository, ReportTypeSearchRepository reportTypeSearchRepository) {
        this.reportTypeRepository = reportTypeRepository;
        this.reportTypeSearchRepository = reportTypeSearchRepository;
    }

    /**
     * POST  /report-types : Create a new reportType.
     *
     * @param reportType the reportType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reportType, or with status 400 (Bad Request) if the reportType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/report-types")
    @Timed
    public ResponseEntity<ReportType> createReportType(@RequestBody ReportType reportType) throws URISyntaxException {
        log.debug("REST request to save ReportType : {}", reportType);
        if (reportType.getId() != null) {
            throw new BadRequestAlertException("A new reportType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReportType result = reportTypeRepository.save(reportType);
        reportTypeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/report-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /report-types : Updates an existing reportType.
     *
     * @param reportType the reportType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reportType,
     * or with status 400 (Bad Request) if the reportType is not valid,
     * or with status 500 (Internal Server Error) if the reportType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/report-types")
    @Timed
    public ResponseEntity<ReportType> updateReportType(@RequestBody ReportType reportType) throws URISyntaxException {
        log.debug("REST request to update ReportType : {}", reportType);
        if (reportType.getId() == null) {
            return createReportType(reportType);
        }
        ReportType result = reportTypeRepository.save(reportType);
        reportTypeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reportType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /report-types : get all the reportTypes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of reportTypes in body
     */
    @GetMapping("/report-types")
    @Timed
    public List<ReportType> getAllReportTypes(@RequestParam(required = false) String filter) {
        if ("salesorder-is-null".equals(filter)) {
            log.debug("REST request to get all ReportTypes where salesOrder is null");
            return StreamSupport
                .stream(reportTypeRepository.findAll().spliterator(), false)
                .filter(reportType -> reportType.getSalesOrder() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ReportTypes");
        return reportTypeRepository.findAll();
        }

    /**
     * GET  /report-types/:id : get the "id" reportType.
     *
     * @param id the id of the reportType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reportType, or with status 404 (Not Found)
     */
    @GetMapping("/report-types/{id}")
    @Timed
    public ResponseEntity<ReportType> getReportType(@PathVariable Long id) {
        log.debug("REST request to get ReportType : {}", id);
        ReportType reportType = reportTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(reportType));
    }

    /**
     * DELETE  /report-types/:id : delete the "id" reportType.
     *
     * @param id the id of the reportType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/report-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteReportType(@PathVariable Long id) {
        log.debug("REST request to delete ReportType : {}", id);
        reportTypeRepository.delete(id);
        reportTypeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/report-types?query=:query : search for the reportType corresponding
     * to the query.
     *
     * @param query the query of the reportType search
     * @return the result of the search
     */
    @GetMapping("/_search/report-types")
    @Timed
    public List<ReportType> searchReportTypes(@RequestParam String query) {
        log.debug("REST request to search ReportTypes for query {}", query);
        return StreamSupport
            .stream(reportTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
