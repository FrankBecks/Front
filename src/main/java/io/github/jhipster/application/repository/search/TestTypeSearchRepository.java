package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.TestType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestType entity.
 */
public interface TestTypeSearchRepository extends ElasticsearchRepository<TestType, Long> {
}
