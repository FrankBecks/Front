package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ParameterType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ParameterType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParameterTypeRepository extends JpaRepository<ParameterType, Long> {

}
