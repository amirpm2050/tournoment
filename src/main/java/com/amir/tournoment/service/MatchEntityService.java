package com.amir.tournoment.service;

import com.amir.tournoment.domain.MatchEntity;
import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.domain.enumeration.MatchType;
import com.amir.tournoment.repository.MatchEntityRepository;
import com.amir.tournoment.service.dto.MatchEntityDTO;
import com.amir.tournoment.web.rest.errors.MatchHasSinglePlayer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class MatchEntityService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);
    private final MatchEntityRepository matchEntityRepository;

    public MatchEntityService(MatchEntityRepository matchEntityRepository) {
        this.matchEntityRepository = matchEntityRepository;
    }

    public MatchEntity createMachEntity(MatchEntityDTO matchEntityDTO){
        MatchEntity matchEntity = new MatchEntity() ;
        matchEntity.setId( matchEntity.getId());
        matchEntity.setGroup(matchEntityDTO.getGroup());
        matchEntity.setMatchType(matchEntityDTO.getMatchType());
        matchEntity.setPoint(matchEntityDTO.getPoint());
        matchEntity.setScore(matchEntityDTO.getScore());
        if (matchEntity.getMatchType() != MatchType.DOUBLEMATCH &&
        matchEntityDTO.getPlayerOne().size() == 1)
            matchEntity.setPlayerOne(matchEntityDTO.getPlayerOne());
        else
            throw new MatchHasSinglePlayer() ;
        if(matchEntity.getMatchType() != MatchType.DOUBLEMATCH &&
        matchEntityDTO.getPlayerTwo().size()==1)
            matchEntity.setPlayerTwo(matchEntityDTO.getPlayerTwo());
        else
            throw new MatchHasSinglePlayer() ;
        return matchEntity ;

    }
}
