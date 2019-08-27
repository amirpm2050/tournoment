package com.amir.tournoment.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TeamEntity.
 */
@Entity
@Table(name = "team_entity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TeamEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "team")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PlayerEntity> members = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("teamEntities")
    private GroupEntity group;

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

    public TeamEntity name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<PlayerEntity> getMembers() {
        return members;
    }

    public TeamEntity members(Set<PlayerEntity> playerEntities) {
        this.members = playerEntities;
        return this;
    }

    public TeamEntity addMember(PlayerEntity playerEntity) {
        this.members.add(playerEntity);
        playerEntity.setTeam(this);
        return this;
    }

    public TeamEntity removeMember(PlayerEntity playerEntity) {
        this.members.remove(playerEntity);
        playerEntity.setTeam(null);
        return this;
    }

    public void setMembers(Set<PlayerEntity> playerEntities) {
        this.members = playerEntities;
    }

    public GroupEntity getGroup() {
        return group;
    }

    public TeamEntity group(GroupEntity groupEntity) {
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
        if (!(o instanceof TeamEntity)) {
            return false;
        }
        return id != null && id.equals(((TeamEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TeamEntity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
