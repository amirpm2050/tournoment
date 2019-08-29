package com.amir.tournoment.service;

import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.repository.PlayerEntityRepository;
import com.amir.tournoment.service.dto.PlayerEntityDTO;
import com.amir.tournoment.web.rest.errors.TeamEntityIsFullException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PlayerEntityService {
    private final Logger log = LoggerFactory.getLogger(UserService.class);
    private final PlayerEntityRepository playerEntityRepository  ;

    public PlayerEntityService(PlayerEntityRepository playerEntityRepository) {
        this.playerEntityRepository = playerEntityRepository;
    }

    public PlayerEntity createPlayerEntity (PlayerEntityDTO playerEntityDTO){
        PlayerEntity playerEntity = new PlayerEntity() ;
        playerEntity.setName(playerEntityDTO.getName());
        playerEntity.setMobile(playerEntityDTO.getMobileNumber());
        List<PlayerEntity> playerEntityList = playerEntityRepository.findAll() ;
        int playersOfTeam = 0  ;
        log.debug("Opps");
        for(PlayerEntity player : playerEntityList ){
            if (player.getTeam() != null) {
                log.debug("amirLogDto "+playerEntityDTO.getTeamEntity().toString() );
                if (player.getTeam().getId() == playerEntityDTO.getTeamEntity().getId())
                    playersOfTeam += 1;
            }
        }
        if (playersOfTeam <= 2 )
            playerEntity.setTeam(playerEntityDTO.getTeamEntity());
        else
            throw new TeamEntityIsFullException() ;

        playerEntityRepository.save(playerEntity);
        return playerEntity ;
    }

}
