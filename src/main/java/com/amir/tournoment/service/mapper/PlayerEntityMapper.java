package com.amir.tournoment.service.mapper;

import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.service.dto.PlayerEntityDTO;
import org.springframework.stereotype.Service;

@Service
public class PlayerEntityMapper {

    public PlayerEntityDTO playerEntityToPlayerEntityDTO(PlayerEntity playerEntity){
        return new PlayerEntityDTO(playerEntity);
    }

}
