package com.amir.tournoment.service.dto;

import com.amir.tournoment.domain.GroupEntity;
import com.amir.tournoment.domain.MatchEntity;
import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.domain.enumeration.MatchType;

import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

public class MatchEntityDTO {

    private Long  id ;

    private MatchType matchType;

    @Size (min = 3 , max = 20)
    private String place;

    @Size(min = 1 , max = 50)
    private Integer point;

    @Size(min = 1 , max = 120)
    private Integer score;

    private GroupEntity group;

    private Set<PlayerEntity> playerOne ;

    private Set<PlayerEntity> playerTwo ;

    public MatchEntityDTO(){

    }

    public MatchEntityDTO (MatchEntity matchEntity){
        this.id = matchEntity.getId();
        this.matchType = matchEntity.getMatchType();
        this.place = matchEntity.getPlace();
        this.score = matchEntity.getScore();
        this.group = matchEntity.getGroup();
        this.playerOne.addAll( matchEntity.getPlayerOne());
        this.playerTwo.addAll( matchEntity.getPlayerTwo());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MatchType getMatchType() {
        return matchType;
    }

    public void setMatchType(MatchType matchType) {
        this.matchType = matchType;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public GroupEntity getGroup() {
        return group;
    }

    public void setGroup(GroupEntity group) {
        this.group = group;
    }

    public Set<PlayerEntity> getPlayerOne() {
        return playerOne;
    }

    public void setPlayerOne(Set<PlayerEntity> playerOne) {
        this.playerOne = playerOne;
    }

    public Set<PlayerEntity> getPlayerTwo() {
        return playerTwo;
    }

    public void setPlayerTwo(Set<PlayerEntity> playerTwo) {
        this.playerTwo = playerTwo;
    }

    @Override
    public String toString() {
        return "MatchEntityDTO{" +
            "id=" + id +
            ", matchType=" + matchType +
            ", place='" + place + '\'' +
            ", point=" + point +
            ", score=" + score +
            ", group=" + group +
            ", playerOne=" + playerOne +
            ", playerTwo=" + playerTwo +
            '}';
    }
}
