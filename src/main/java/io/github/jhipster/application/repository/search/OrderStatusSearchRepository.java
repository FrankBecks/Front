package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.OrderStatus;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrderStatus entity.
 */
public interface OrderStatusSearchRepository extends ElasticsearchRepository<OrderStatus, Long> {
}
