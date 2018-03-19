package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Parameter;

import io.github.jhipster.application.repository.ParameterRepository;
import io.github.jhipster.application.repository.search.ParameterSearchRepository;
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
 * REST controller for managing Parameter.
 */
@RestController
@RequestMapping("/api")
public class ParameterResource {

    private final Logger log = LoggerFactory.getLogger(ParameterResource.class);

    private static final String ENTITY_NAME = "parameter";

    private final ParameterRepository parameterRepository;

    private final ParameterSearchRepository parameterSearchRepository;

    public ParameterResource(ParameterRepository parameterRepository, ParameterSearchRepository parameterSearchRepository) {
        this.parameterRepository = parameterRepository;
        this.parameterSearchRepository = parameterSearchRepository;
    }

    /**
     * POST  /parameters : Create a new parameter.
     *
     * @param parameter the parameter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parameter, or with status 400 (Bad Request) if the parameter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parameters")
    @Timed
    public ResponseEntity<Parameter> createParameter(@RequestBody Parameter parameter) throws URISyntaxException {
        log.debug("REST request to save Parameter : {}", parameter);
        if (parameter.getId() != null) {
            throw new BadRequestAlertException("A new parameter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parameter result = parameterRepository.save(parameter);
        parameterSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parameters : Updates an existing parameter.
     *
     * @param parameter the parameter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parameter,
     * or with status 400 (Bad Request) if the parameter is not valid,
     * or with status 500 (Internal Server Error) if the parameter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parameters")
    @Timed
    public ResponseEntity<Parameter> updateParameter(@RequestBody Parameter parameter) throws URISyntaxException {
        log.debug("REST request to update Parameter : {}", parameter);
        if (parameter.getId() == null) {
            return createParameter(parameter);
        }
        Parameter result = parameterRepository.save(parameter);
        parameterSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parameter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parameters : get all the parameters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parameters in body
     */
    @GetMapping("/parameters")
    @Timed
    public List<Parameter> getAllParameters() {
        log.debug("REST request to get all Parameters");
        return parameterRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /parameters/:id : get the "id" parameter.
     *
     * @param id the id of the parameter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parameter, or with status 404 (Not Found)
     */
    @GetMapping("/parameters/{id}")
    @Timed
    public ResponseEntity<Parameter> getParameter(@PathVariable Long id) {
        log.debug("REST request to get Parameter : {}", id);
        Parameter parameter = parameterRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(parameter));
    }

    /**
     * DELETE  /parameters/:id : delete the "id" parameter.
     *
     * @param id the id of the parameter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parameters/{id}")
    @Timed
    public ResponseEntity<Void> deleteParameter(@PathVariable Long id) {
        log.debug("REST request to delete Parameter : {}", id);
        parameterRepository.delete(id);
        parameterSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/parameters?query=:query : search for the parameter corresponding
     * to the query.
     *
     * @param query the query of the parameter search
     * @return the result of the search
     */
    @GetMapping("/_search/parameters")
    @Timed
    public List<Parameter> searchParameters(@RequestParam String query) {
        log.debug("REST request to search Parameters for query {}", query);
        return StreamSupport
            .stream(parameterSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
