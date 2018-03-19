package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.ParameterType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ParameterType entity.
 */
public interface ParameterTypeSearchRepository extends ElasticsearchRepository<ParameterType, Long> {
}
