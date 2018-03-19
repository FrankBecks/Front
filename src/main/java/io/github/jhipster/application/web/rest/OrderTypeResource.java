package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.OrderType;

import io.github.jhipster.application.repository.OrderTypeRepository;
import io.github.jhipster.application.repository.search.OrderTypeSearchRepository;
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
 * REST controller for managing OrderType.
 */
@RestController
@RequestMapping("/api")
public class OrderTypeResource {

    private final Logger log = LoggerFactory.getLogger(OrderTypeResource.class);

    private static final String ENTITY_NAME = "orderType";

    private final OrderTypeRepository orderTypeRepository;

    private final OrderTypeSearchRepository orderTypeSearchRepository;

    public OrderTypeResource(OrderTypeRepository orderTypeRepository, OrderTypeSearchRepository orderTypeSearchRepository) {
        this.orderTypeRepository = orderTypeRepository;
        this.orderTypeSearchRepository = orderTypeSearchRepository;
    }

    /**
     * POST  /order-types : Create a new orderType.
     *
     * @param orderType the orderType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderType, or with status 400 (Bad Request) if the orderType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-types")
    @Timed
    public ResponseEntity<OrderType> createOrderType(@RequestBody OrderType orderType) throws URISyntaxException {
        log.debug("REST request to save OrderType : {}", orderType);
        if (orderType.getId() != null) {
            throw new BadRequestAlertException("A new orderType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderType result = orderTypeRepository.save(orderType);
        orderTypeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/order-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-types : Updates an existing orderType.
     *
     * @param orderType the orderType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderType,
     * or with status 400 (Bad Request) if the orderType is not valid,
     * or with status 500 (Internal Server Error) if the orderType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-types")
    @Timed
    public ResponseEntity<OrderType> updateOrderType(@RequestBody OrderType orderType) throws URISyntaxException {
        log.debug("REST request to update OrderType : {}", orderType);
        if (orderType.getId() == null) {
            return createOrderType(orderType);
        }
        OrderType result = orderTypeRepository.save(orderType);
        orderTypeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-types : get all the orderTypes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of orderTypes in body
     */
    @GetMapping("/order-types")
    @Timed
    public List<OrderType> getAllOrderTypes(@RequestParam(required = false) String filter) {
        if ("salesorder-is-null".equals(filter)) {
            log.debug("REST request to get all OrderTypes where salesOrder is null");
            return StreamSupport
                .stream(orderTypeRepository.findAll().spliterator(), false)
                .filter(orderType -> orderType.getSalesOrder() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all OrderTypes");
        return orderTypeRepository.findAll();
        }

    /**
     * GET  /order-types/:id : get the "id" orderType.
     *
     * @param id the id of the orderType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderType, or with status 404 (Not Found)
     */
    @GetMapping("/order-types/{id}")
    @Timed
    public ResponseEntity<OrderType> getOrderType(@PathVariable Long id) {
        log.debug("REST request to get OrderType : {}", id);
        OrderType orderType = orderTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(orderType));
    }

    /**
     * DELETE  /order-types/:id : delete the "id" orderType.
     *
     * @param id the id of the orderType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderType(@PathVariable Long id) {
        log.debug("REST request to delete OrderType : {}", id);
        orderTypeRepository.delete(id);
        orderTypeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/order-types?query=:query : search for the orderType corresponding
     * to the query.
     *
     * @param query the query of the orderType search
     * @return the result of the search
     */
    @GetMapping("/_search/order-types")
    @Timed
    public List<OrderType> searchOrderTypes(@RequestParam String query) {
        log.debug("REST request to search OrderTypes for query {}", query);
        return StreamSupport
            .stream(orderTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
