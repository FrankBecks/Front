package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.PaymentMethod;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PaymentMethod entity.
 */
public interface PaymentMethodSearchRepository extends ElasticsearchRepository<PaymentMethod, Long> {
}
