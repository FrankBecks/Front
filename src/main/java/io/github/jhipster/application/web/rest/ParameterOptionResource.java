package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.ParameterOption;

import io.github.jhipster.application.repository.ParameterOptionRepository;
import io.github.jhipster.application.repository.search.ParameterOptionSearchRepository;
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
 * REST controller for managing ParameterOption.
 */
@RestController
@RequestMapping("/api")
public class ParameterOptionResource {

    private final Logger log = LoggerFactory.getLogger(ParameterOptionResource.class);

    private static final String ENTITY_NAME = "parameterOption";

    private final ParameterOptionRepository parameterOptionRepository;

    private final ParameterOptionSearchRepository parameterOptionSearchRepository;

    public ParameterOptionResource(ParameterOptionRepository parameterOptionRepository, ParameterOptionSearchRepository parameterOptionSearchRepository) {
        this.parameterOptionRepository = parameterOptionRepository;
        this.parameterOptionSearchRepository = parameterOptionSearchRepository;
    }

    /**
     * POST  /parameter-options : Create a new parameterOption.
     *
     * @param parameterOption the parameterOption to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parameterOption, or with status 400 (Bad Request) if the parameterOption has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parameter-options")
    @Timed
    public ResponseEntity<ParameterOption> createParameterOption(@RequestBody ParameterOption parameterOption) throws URISyntaxException {
        log.debug("REST request to save ParameterOption : {}", parameterOption);
        if (parameterOption.getId() != null) {
            throw new BadRequestAlertException("A new parameterOption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParameterOption result = parameterOptionRepository.save(parameterOption);
        parameterOptionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/parameter-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parameter-options : Updates an existing parameterOption.
     *
     * @param parameterOption the parameterOption to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parameterOption,
     * or with status 400 (Bad Request) if the parameterOption is not valid,
     * or with status 500 (Internal Server Error) if the parameterOption couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parameter-options")
    @Timed
    public ResponseEntity<ParameterOption> updateParameterOption(@RequestBody ParameterOption parameterOption) throws URISyntaxException {
        log.debug("REST request to update ParameterOption : {}", parameterOption);
        if (parameterOption.getId() == null) {
            return createParameterOption(parameterOption);
        }
        ParameterOption result = parameterOptionRepository.save(parameterOption);
        parameterOptionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parameterOption.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parameter-options : get all the parameterOptions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parameterOptions in body
     */
    @GetMapping("/parameter-options")
    @Timed
    public List<ParameterOption> getAllParameterOptions() {
        log.debug("REST request to get all ParameterOptions");
        return parameterOptionRepository.findAll();
        }

    /**
     * GET  /parameter-options/:id : get the "id" parameterOption.
     *
     * @param id the id of the parameterOption to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parameterOption, or with status 404 (Not Found)
     */
    @GetMapping("/parameter-options/{id}")
    @Timed
    public ResponseEntity<ParameterOption> getParameterOption(@PathVariable Long id) {
        log.debug("REST request to get ParameterOption : {}", id);
        ParameterOption parameterOption = parameterOptionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(parameterOption));
    }

    /**
     * DELETE  /parameter-options/:id : delete the "id" parameterOption.
     *
     * @param id the id of the parameterOption to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parameter-options/{id}")
    @Timed
    public ResponseEntity<Void> deleteParameterOption(@PathVariable Long id) {
        log.debug("REST request to delete ParameterOption : {}", id);
        parameterOptionRepository.delete(id);
        parameterOptionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/parameter-options?query=:query : search for the parameterOption corresponding
     * to the query.
     *
     * @param query the query of the parameterOption search
     * @return the result of the search
     */
    @GetMapping("/_search/parameter-options")
    @Timed
    public List<ParameterOption> searchParameterOptions(@RequestParam String query) {
        log.debug("REST request to search ParameterOptions for query {}", query);
        return StreamSupport
            .stream(parameterOptionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
