package com.amir.tournoment.service;

import com.amir.tournoment.domain.MatchEntity;
import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.domain.enumeration.MatchType;
import com.amir.tournoment.repository.MatchEntityRepository;
import com.amir.tournoment.repository.PlayerEntityRepository;
import com.amir.tournoment.service.dto.MatchEntityDTO;
import com.amir.tournoment.web.rest.errors.MatchHasSinglePlayer;
import com.amir.tournoment.web.rest.errors.PlayersAreNotInSameGrope;
import net.bytebuddy.agent.builder.AgentBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class MatchEntityService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final MatchEntityRepository matchEntityRepository;

    private final PlayerEntityRepository playerEntityRepository;

    public MatchEntityService(MatchEntityRepository matchEntityRepository , PlayerEntityRepository playerEntityRepository ) {
        this.matchEntityRepository = matchEntityRepository;
        this.playerEntityRepository = playerEntityRepository;
    }

    public MatchEntity createMachEntity(MatchEntityDTO matchEntityDTO){
        MatchEntity matchEntity = new MatchEntity() ;
        matchEntity.setId( matchEntity.getId());
        matchEntity.setGroup(matchEntityDTO.getGroup());
        matchEntity.setMatchType(matchEntityDTO.getMatchType());
        matchEntity.setPoint(matchEntityDTO.getPoint());
        matchEntity.setPlace(matchEntityDTO.getPlace());
        matchEntity.setScore(matchEntityDTO.getScore());
        if (matchEntity.getMatchType() != MatchType.DOUBLEMATCH )
            if (matchEntityDTO.getPlayerOne().size() == 1) {
                matchEntity.setPlayerOne(toSet(matchEntityDTO.getPlayerOne()));
            }
            else
                throw new MatchHasSinglePlayer() ;
        else {
            matchEntity.setPlayerOne(toSet(matchEntityDTO.getPlayerOne()));
        }
        if(matchEntity.getMatchType() != MatchType.DOUBLEMATCH )
            if(matchEntityDTO.getPlayerTwo().size()==1)
                matchEntity.setPlayerTwo(toSet(matchEntityDTO.getPlayerTwo()));
            else
                throw new MatchHasSinglePlayer() ;
        matchEntity.setPlayerTwo(toSet(matchEntityDTO.getPlayerTwo()));
        matchEntityRepository.save(matchEntity);
        return matchEntity ;

    }
    private Set<PlayerEntity> toSet(Set<PlayerEntity> playerSet) {
        Set<PlayerEntity> playerEntitySet = new HashSet<>();
        Long teamId = Long.valueOf(0);
        for (PlayerEntity player:playerSet) {
            if (player.getId() != null ){
                if (playerSet.size()>0) {
                    if (teamId != 0 && player.getTeam().getId() == teamId)
                        playerEntitySet.add(playerEntityRepository.findById(player.getId()).get());
                    else if (teamId == 0 )
                        teamId = player.getTeam().getId();
                    else
                        throw new PlayersAreNotInSameGrope();
                }
                else
                    playerEntitySet.add(playerEntityRepository.findById(player.getId()).get());

            }
        }
        return  playerEntitySet ;
    }

    public List<PlayerEntity> findPlayerEntitiesOfGroup(Long groupId){
        return playerEntityRepository.findAllByTeam_Group_Id(groupId);
    }
}
