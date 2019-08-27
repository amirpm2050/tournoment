package com.amir.tournoment.repository;

import com.amir.tournoment.domain.MatchEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MatchEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatchEntityRepository extends JpaRepository<MatchEntity, Long> {

}
