package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Parameter;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Parameter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long> {
    @Query("select distinct parameter from Parameter parameter left join fetch parameter.parameterOptions")
    List<Parameter> findAllWithEagerRelationships();

    @Query("select parameter from Parameter parameter left join fetch parameter.parameterOptions where parameter.id =:id")
    Parameter findOneWithEagerRelationships(@Param("id") Long id);

}
