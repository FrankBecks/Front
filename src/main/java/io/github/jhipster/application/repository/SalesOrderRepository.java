package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.SalesOrder;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the SalesOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalesOrderRepository extends JpaRepository<SalesOrder, Long> {
    @Query("select distinct sales_order from SalesOrder sales_order left join fetch sales_order.salesOrderTests left join fetch sales_order.samples")
    List<SalesOrder> findAllWithEagerRelationships();

    @Query("select sales_order from SalesOrder sales_order left join fetch sales_order.salesOrderTests left join fetch sales_order.samples where sales_order.id =:id")
    SalesOrder findOneWithEagerRelationships(@Param("id") Long id);

}
