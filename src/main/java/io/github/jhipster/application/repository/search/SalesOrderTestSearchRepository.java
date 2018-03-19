package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.SalesOrderTest;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SalesOrderTest entity.
 */
public interface SalesOrderTestSearchRepository extends ElasticsearchRepository<SalesOrderTest, Long> {
}
