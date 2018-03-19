package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.SalesOrderTest;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the SalesOrderTest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalesOrderTestRepository extends JpaRepository<SalesOrderTest, Long> {
    @Query("select distinct sales_order_test from SalesOrderTest sales_order_test left join fetch sales_order_test.testTags left join fetch sales_order_test.parameters")
    List<SalesOrderTest> findAllWithEagerRelationships();

    @Query("select sales_order_test from SalesOrderTest sales_order_test left join fetch sales_order_test.testTags left join fetch sales_order_test.parameters where sales_order_test.id =:id")
    SalesOrderTest findOneWithEagerRelationships(@Param("id") Long id);

}
