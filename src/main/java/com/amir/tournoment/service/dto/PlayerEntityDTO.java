package com.amir.tournoment.service.dto;

import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.domain.TeamEntity;

import javax.validation.constraints.Size;

public class PlayerEntityDTO {

    private Long id ;

    @Size(min = 3  , max =  50)
    private String name ;

    @Size(min = 11 , max = 11)
    private String mobileNumber ;

    private TeamEntity teamEntity ;

    public PlayerEntityDTO() {
    }

    public PlayerEntityDTO(PlayerEntity playerEntity ) {
        this.id = playerEntity.getId();
        this.name = playerEntity.getName();
        this.mobileNumber = playerEntity.getMobile();
        this.teamEntity = playerEntity.getTeam();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public TeamEntity getTeamEntity() {
        return teamEntity;
    }

    public void setTeamEntity(TeamEntity teamEntity) {
        this.teamEntity = teamEntity;
    }

    @Override
    public String toString() {
        return "PlayerEntityDTO{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", mobileNumber='" + mobileNumber + '\'' +
            ", teamEntity=" + teamEntity +
            '}';
    }

}
