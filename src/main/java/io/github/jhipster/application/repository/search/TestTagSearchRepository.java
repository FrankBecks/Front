package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.TestTag;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TestTag entity.
 */
public interface TestTagSearchRepository extends ElasticsearchRepository<TestTag, Long> {
}
