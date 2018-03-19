package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.OrderPriority;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrderPriority entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderPriorityRepository extends JpaRepository<OrderPriority, Long> {

}
