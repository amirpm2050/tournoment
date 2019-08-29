package com.amir.tournoment.repository;

import com.amir.tournoment.domain.GroupEntity;
import com.amir.tournoment.domain.TeamEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the TeamEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeamEntityRepository extends JpaRepository<TeamEntity, Long> {
    List<TeamEntity> findTeamEntitiesByGroup(GroupEntity groupEntity);
}

