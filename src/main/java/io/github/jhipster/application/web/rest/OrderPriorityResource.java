package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.OrderPriority;

import io.github.jhipster.application.repository.OrderPriorityRepository;
import io.github.jhipster.application.repository.search.OrderPrioritySearchRepository;
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
 * REST controller for managing OrderPriority.
 */
@RestController
@RequestMapping("/api")
public class OrderPriorityResource {

    private final Logger log = LoggerFactory.getLogger(OrderPriorityResource.class);

    private static final String ENTITY_NAME = "orderPriority";

    private final OrderPriorityRepository orderPriorityRepository;

    private final OrderPrioritySearchRepository orderPrioritySearchRepository;

    public OrderPriorityResource(OrderPriorityRepository orderPriorityRepository, OrderPrioritySearchRepository orderPrioritySearchRepository) {
        this.orderPriorityRepository = orderPriorityRepository;
        this.orderPrioritySearchRepository = orderPrioritySearchRepository;
    }

    /**
     * POST  /order-priorities : Create a new orderPriority.
     *
     * @param orderPriority the orderPriority to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderPriority, or with status 400 (Bad Request) if the orderPriority has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-priorities")
    @Timed
    public ResponseEntity<OrderPriority> createOrderPriority(@RequestBody OrderPriority orderPriority) throws URISyntaxException {
        log.debug("REST request to save OrderPriority : {}", orderPriority);
        if (orderPriority.getId() != null) {
            throw new BadRequestAlertException("A new orderPriority cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderPriority result = orderPriorityRepository.save(orderPriority);
        orderPrioritySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/order-priorities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-priorities : Updates an existing orderPriority.
     *
     * @param orderPriority the orderPriority to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderPriority,
     * or with status 400 (Bad Request) if the orderPriority is not valid,
     * or with status 500 (Internal Server Error) if the orderPriority couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-priorities")
    @Timed
    public ResponseEntity<OrderPriority> updateOrderPriority(@RequestBody OrderPriority orderPriority) throws URISyntaxException {
        log.debug("REST request to update OrderPriority : {}", orderPriority);
        if (orderPriority.getId() == null) {
            return createOrderPriority(orderPriority);
        }
        OrderPriority result = orderPriorityRepository.save(orderPriority);
        orderPrioritySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderPriority.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-priorities : get all the orderPriorities.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of orderPriorities in body
     */
    @GetMapping("/order-priorities")
    @Timed
    public List<OrderPriority> getAllOrderPriorities(@RequestParam(required = false) String filter) {
        if ("salesorder-is-null".equals(filter)) {
            log.debug("REST request to get all OrderPrioritys where salesOrder is null");
            return StreamSupport
                .stream(orderPriorityRepository.findAll().spliterator(), false)
                .filter(orderPriority -> orderPriority.getSalesOrder() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all OrderPriorities");
        return orderPriorityRepository.findAll();
        }

    /**
     * GET  /order-priorities/:id : get the "id" orderPriority.
     *
     * @param id the id of the orderPriority to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderPriority, or with status 404 (Not Found)
     */
    @GetMapping("/order-priorities/{id}")
    @Timed
    public ResponseEntity<OrderPriority> getOrderPriority(@PathVariable Long id) {
        log.debug("REST request to get OrderPriority : {}", id);
        OrderPriority orderPriority = orderPriorityRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(orderPriority));
    }

    /**
     * DELETE  /order-priorities/:id : delete the "id" orderPriority.
     *
     * @param id the id of the orderPriority to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-priorities/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderPriority(@PathVariable Long id) {
        log.debug("REST request to delete OrderPriority : {}", id);
        orderPriorityRepository.delete(id);
        orderPrioritySearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/order-priorities?query=:query : search for the orderPriority corresponding
     * to the query.
     *
     * @param query the query of the orderPriority search
     * @return the result of the search
     */
    @GetMapping("/_search/order-priorities")
    @Timed
    public List<OrderPriority> searchOrderPriorities(@RequestParam String query) {
        log.debug("REST request to search OrderPriorities for query {}", query);
        return StreamSupport
            .stream(orderPrioritySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
