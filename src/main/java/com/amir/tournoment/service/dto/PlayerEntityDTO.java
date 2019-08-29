package com.amir.tournoment.service.dto;

import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.domain.TeamEntity;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Size;

public class PlayerEntityDTO {

    private Long id ;

    @Size(min = 3  , max =  50)
    @JsonProperty
    private String name ;

    @Size(min = 11 , max = 11)
    @JsonProperty
    private String mobile ;

    @JsonProperty
    private TeamEntity team ;

    public PlayerEntityDTO() {
    }

    public PlayerEntityDTO(PlayerEntity playerEntity ) {
        this.id = playerEntity.getId();
        this.name = playerEntity.getName();
        this.mobile = playerEntity.getMobile();
        this.team = playerEntity.getTeam();
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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public TeamEntity getTeam() {
        return team;
    }

    public void setTeamEntity(TeamEntity team) {
        this.team = team;
    }

    @Override
    public String toString() {
        return "PlayerEntityDTO{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", mobileNumber='" + mobile + '\'' +
            ", teamEntity=" + team +
            '}';
    }

}
