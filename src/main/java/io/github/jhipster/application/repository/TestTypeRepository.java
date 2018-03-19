package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TestType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestTypeRepository extends JpaRepository<TestType, Long> {

}
