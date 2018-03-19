package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.ParameterType;

import io.github.jhipster.application.repository.ParameterTypeRepository;
import io.github.jhipster.application.repository.search.ParameterTypeSearchRepository;
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
 * REST controller for managing ParameterType.
 */
@RestController
@RequestMapping("/api")
public class ParameterTypeResource {

    private final Logger log = LoggerFactory.getLogger(ParameterTypeResource.class);

    private static final String ENTITY_NAME = "parameterType";

    private final ParameterTypeRepository parameterTypeRepository;

    private final ParameterTypeSearchRepository parameterTypeSearchRepository;

    public ParameterTypeResource(ParameterTypeRepository parameterTypeRepository, ParameterTypeSearchRepository parameterTypeSearchRepository) {
        this.parameterTypeRepository = parameterTypeRepository;
        this.parameterTypeSearchRepository = parameterTypeSearchRepository;
    }

    /**
     * POST  /parameter-types : Create a new parameterType.
     *
     * @param parameterType the parameterType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parameterType, or with status 400 (Bad Request) if the parameterType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parameter-types")
    @Timed
    public ResponseEntity<ParameterType> createParameterType(@RequestBody ParameterType parameterType) throws URISyntaxException {
        log.debug("REST request to save ParameterType : {}", parameterType);
        if (parameterType.getId() != null) {
            throw new BadRequestAlertException("A new parameterType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParameterType result = parameterTypeRepository.save(parameterType);
        parameterTypeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/parameter-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parameter-types : Updates an existing parameterType.
     *
     * @param parameterType the parameterType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parameterType,
     * or with status 400 (Bad Request) if the parameterType is not valid,
     * or with status 500 (Internal Server Error) if the parameterType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parameter-types")
    @Timed
    public ResponseEntity<ParameterType> updateParameterType(@RequestBody ParameterType parameterType) throws URISyntaxException {
        log.debug("REST request to update ParameterType : {}", parameterType);
        if (parameterType.getId() == null) {
            return createParameterType(parameterType);
        }
        ParameterType result = parameterTypeRepository.save(parameterType);
        parameterTypeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parameterType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parameter-types : get all the parameterTypes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of parameterTypes in body
     */
    @GetMapping("/parameter-types")
    @Timed
    public List<ParameterType> getAllParameterTypes(@RequestParam(required = false) String filter) {
        if ("parameter-is-null".equals(filter)) {
            log.debug("REST request to get all ParameterTypes where parameter is null");
            return StreamSupport
                .stream(parameterTypeRepository.findAll().spliterator(), false)
                .filter(parameterType -> parameterType.getParameter() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ParameterTypes");
        return parameterTypeRepository.findAll();
        }

    /**
     * GET  /parameter-types/:id : get the "id" parameterType.
     *
     * @param id the id of the parameterType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parameterType, or with status 404 (Not Found)
     */
    @GetMapping("/parameter-types/{id}")
    @Timed
    public ResponseEntity<ParameterType> getParameterType(@PathVariable Long id) {
        log.debug("REST request to get ParameterType : {}", id);
        ParameterType parameterType = parameterTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(parameterType));
    }

    /**
     * DELETE  /parameter-types/:id : delete the "id" parameterType.
     *
     * @param id the id of the parameterType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parameter-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteParameterType(@PathVariable Long id) {
        log.debug("REST request to delete ParameterType : {}", id);
        parameterTypeRepository.delete(id);
        parameterTypeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/parameter-types?query=:query : search for the parameterType corresponding
     * to the query.
     *
     * @param query the query of the parameterType search
     * @return the result of the search
     */
    @GetMapping("/_search/parameter-types")
    @Timed
    public List<ParameterType> searchParameterTypes(@RequestParam String query) {
        log.debug("REST request to search ParameterTypes for query {}", query);
        return StreamSupport
            .stream(parameterTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
