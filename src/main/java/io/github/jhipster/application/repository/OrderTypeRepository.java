package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.OrderType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrderType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderTypeRepository extends JpaRepository<OrderType, Long> {

}
