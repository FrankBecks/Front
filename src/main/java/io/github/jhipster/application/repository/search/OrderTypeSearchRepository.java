package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.OrderType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrderType entity.
 */
public interface OrderTypeSearchRepository extends ElasticsearchRepository<OrderType, Long> {
}
