package com.amir.tournoment.service.dto;

import com.amir.tournoment.domain.PlayerEntity;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Size;

public class GroupEntityDTO {
    private Long id ;

    @Size(min = 3  , max =  50)
    private String name ;

    public GroupEntityDTO() {
    }

    public GroupEntityDTO(PlayerEntity playerEntity) {
        this.id = playerEntity.getId();
        this.name = playerEntity.getName();
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

    @Override
    public String toString() {
        return "GroupEntityDTO{" +
            "id=" + id +
            ", name='" + name + '\'' +
            '}';
    }
}
