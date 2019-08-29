package com.amir.tournoment.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.amir.tournoment.domain.enumeration.MatchType;

/**
 * A MatchEntity.
 */
@Entity
@Table(name = "match_entity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MatchEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "match_type")
    private MatchType matchType;

    @Column(name = "place")
    private String place;

    @Column(name = "point")
    private Integer point;

    @Column(name = "score")
    private Integer score;

    @ManyToOne
    @JsonIgnoreProperties("matchEntities")
    private GroupEntity group;

    
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MatchType getMatchType() {
        return matchType;
    }

    public MatchEntity matchType(MatchType matchType) {
        this.matchType = matchType;
        return this;
    }

    public void setMatchType(MatchType matchType) {
        this.matchType = matchType;
    }

    public String getPlace() {
        return place;
    }

    public MatchEntity place(String place) {
        this.place = place;
        return this;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Integer getPoint() {
        return point;
    }

    public MatchEntity point(Integer point) {
        this.point = point;
        return this;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Integer getScore() {
        return score;
    }

    public MatchEntity score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public GroupEntity getGroup() {
        return group;
    }

    public MatchEntity group(GroupEntity groupEntity) {
        this.group = groupEntity;
        return this;
    }

    public void setGroup(GroupEntity groupEntity) {
        this.group = groupEntity;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MatchEntity)) {
            return false;
        }
        return id != null && id.equals(((MatchEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MatchEntity{" +
            "id=" + getId() +
            ", matchType='" + getMatchType() + "'" +
            ", place='" + getPlace() + "'" +
            ", point=" + getPoint() +
            ", score=" + getScore() +
            "}";
    }
}
