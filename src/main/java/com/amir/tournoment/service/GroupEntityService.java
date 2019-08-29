package com.amir.tournoment.service;

import com.amir.tournoment.domain.GroupEntity;
import com.amir.tournoment.domain.TeamEntity;
import com.amir.tournoment.repository.GroupEntityRepository;
import com.amir.tournoment.repository.TeamEntityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class GroupEntityService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);
    private final GroupEntityRepository groupEntityRepository;
    private final TeamEntityRepository teamEntityRepository ;

    public GroupEntityService(GroupEntityRepository groupEntityRepository, TeamEntityRepository teamEntityRepository) {
        this.groupEntityRepository = groupEntityRepository;
        this.teamEntityRepository = teamEntityRepository;
    }

    public List<TeamEntity> getTeamsOfGroup(GroupEntity groupEntity){
        return teamEntityRepository.findTeamEntitiesByGroup(groupEntity);
    }
}
