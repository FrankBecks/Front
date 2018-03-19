package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.MessageType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MessageType entity.
 */
public interface MessageTypeSearchRepository extends ElasticsearchRepository<MessageType, Long> {
}
