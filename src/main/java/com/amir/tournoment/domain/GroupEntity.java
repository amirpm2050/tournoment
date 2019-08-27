package com.amir.tournoment.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A GroupEntity.
 */
@Entity
@Table(name = "group_entity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GroupEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "group")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TeamEntity> teams = new HashSet<>();

    @OneToMany(mappedBy = "group")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MatchEntity> matches = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public GroupEntity name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<TeamEntity> getTeams() {
        return teams;
    }

    public GroupEntity teams(Set<TeamEntity> teamEntities) {
        this.teams = teamEntities;
        return this;
    }

    public GroupEntity addTeam(TeamEntity teamEntity) {
        this.teams.add(teamEntity);
        teamEntity.setGroup(this);
        return this;
    }

    public GroupEntity removeTeam(TeamEntity teamEntity) {
        this.teams.remove(teamEntity);
        teamEntity.setGroup(null);
        return this;
    }

    public void setTeams(Set<TeamEntity> teamEntities) {
        this.teams = teamEntities;
    }

    public Set<MatchEntity> getMatches() {
        return matches;
    }

    public GroupEntity matches(Set<MatchEntity> matchEntities) {
        this.matches = matchEntities;
        return this;
    }

    public GroupEntity addMatch(MatchEntity matchEntity) {
        this.matches.add(matchEntity);
        matchEntity.setGroup(this);
        return this;
    }

    public GroupEntity removeMatch(MatchEntity matchEntity) {
        this.matches.remove(matchEntity);
        matchEntity.setGroup(null);
        return this;
    }

    public void setMatches(Set<MatchEntity> matchEntities) {
        this.matches = matchEntities;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GroupEntity)) {
            return false;
        }
        return id != null && id.equals(((GroupEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "GroupEntity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
