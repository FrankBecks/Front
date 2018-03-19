package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.ParameterOption;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ParameterOption entity.
 */
public interface ParameterOptionSearchRepository extends ElasticsearchRepository<ParameterOption, Long> {
}
