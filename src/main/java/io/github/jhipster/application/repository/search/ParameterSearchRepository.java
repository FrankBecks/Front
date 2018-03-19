package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Parameter;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Parameter entity.
 */
public interface ParameterSearchRepository extends ElasticsearchRepository<Parameter, Long> {
}
