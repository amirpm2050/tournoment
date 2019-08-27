package com.amir.tournoment.repository;

import com.amir.tournoment.domain.GroupEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GroupEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupEntityRepository extends JpaRepository<GroupEntity, Long> {

}
