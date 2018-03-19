package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.ReportType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ReportType entity.
 */
public interface ReportTypeSearchRepository extends ElasticsearchRepository<ReportType, Long> {
}
