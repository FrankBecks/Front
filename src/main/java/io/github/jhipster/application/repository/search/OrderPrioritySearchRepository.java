package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.OrderPriority;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrderPriority entity.
 */
public interface OrderPrioritySearchRepository extends ElasticsearchRepository<OrderPriority, Long> {
}
