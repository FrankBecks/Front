package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ParameterOption;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ParameterOption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParameterOptionRepository extends JpaRepository<ParameterOption, Long> {

}
