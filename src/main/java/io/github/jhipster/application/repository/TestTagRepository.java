package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TestTag;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TestTag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestTagRepository extends JpaRepository<TestTag, Long> {

}
