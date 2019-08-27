package com.amir.tournoment.repository;

import com.amir.tournoment.domain.TeamEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TeamEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeamEntityRepository extends JpaRepository<TeamEntity, Long> {

}

