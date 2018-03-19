package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.MessageType;

import io.github.jhipster.application.repository.MessageTypeRepository;
import io.github.jhipster.application.repository.search.MessageTypeSearchRepository;
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
 * REST controller for managing MessageType.
 */
@RestController
@RequestMapping("/api")
public class MessageTypeResource {

    private final Logger log = LoggerFactory.getLogger(MessageTypeResource.class);

    private static final String ENTITY_NAME = "messageType";

    private final MessageTypeRepository messageTypeRepository;

    private final MessageTypeSearchRepository messageTypeSearchRepository;

    public MessageTypeResource(MessageTypeRepository messageTypeRepository, MessageTypeSearchRepository messageTypeSearchRepository) {
        this.messageTypeRepository = messageTypeRepository;
        this.messageTypeSearchRepository = messageTypeSearchRepository;
    }

    /**
     * POST  /message-types : Create a new messageType.
     *
     * @param messageType the messageType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new messageType, or with status 400 (Bad Request) if the messageType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/message-types")
    @Timed
    public ResponseEntity<MessageType> createMessageType(@RequestBody MessageType messageType) throws URISyntaxException {
        log.debug("REST request to save MessageType : {}", messageType);
        if (messageType.getId() != null) {
            throw new BadRequestAlertException("A new messageType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MessageType result = messageTypeRepository.save(messageType);
        messageTypeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/message-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /message-types : Updates an existing messageType.
     *
     * @param messageType the messageType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated messageType,
     * or with status 400 (Bad Request) if the messageType is not valid,
     * or with status 500 (Internal Server Error) if the messageType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/message-types")
    @Timed
    public ResponseEntity<MessageType> updateMessageType(@RequestBody MessageType messageType) throws URISyntaxException {
        log.debug("REST request to update MessageType : {}", messageType);
        if (messageType.getId() == null) {
            return createMessageType(messageType);
        }
        MessageType result = messageTypeRepository.save(messageType);
        messageTypeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, messageType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /message-types : get all the messageTypes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of messageTypes in body
     */
    @GetMapping("/message-types")
    @Timed
    public List<MessageType> getAllMessageTypes(@RequestParam(required = false) String filter) {
        if ("message-is-null".equals(filter)) {
            log.debug("REST request to get all MessageTypes where message is null");
            return StreamSupport
                .stream(messageTypeRepository.findAll().spliterator(), false)
                .filter(messageType -> messageType.getMessage() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all MessageTypes");
        return messageTypeRepository.findAll();
        }

    /**
     * GET  /message-types/:id : get the "id" messageType.
     *
     * @param id the id of the messageType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the messageType, or with status 404 (Not Found)
     */
    @GetMapping("/message-types/{id}")
    @Timed
    public ResponseEntity<MessageType> getMessageType(@PathVariable Long id) {
        log.debug("REST request to get MessageType : {}", id);
        MessageType messageType = messageTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(messageType));
    }

    /**
     * DELETE  /message-types/:id : delete the "id" messageType.
     *
     * @param id the id of the messageType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/message-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteMessageType(@PathVariable Long id) {
        log.debug("REST request to delete MessageType : {}", id);
        messageTypeRepository.delete(id);
        messageTypeSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/message-types?query=:query : search for the messageType corresponding
     * to the query.
     *
     * @param query the query of the messageType search
     * @return the result of the search
     */
    @GetMapping("/_search/message-types")
    @Timed
    public List<MessageType> searchMessageTypes(@RequestParam String query) {
        log.debug("REST request to search MessageTypes for query {}", query);
        return StreamSupport
            .stream(messageTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
