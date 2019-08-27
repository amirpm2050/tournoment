package com.amir.tournoment.repository;

import com.amir.tournoment.domain.PlayerEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlayerEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayerEntityRepository extends JpaRepository<PlayerEntity, Long> {

}
