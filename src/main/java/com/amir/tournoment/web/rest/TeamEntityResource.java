package com.amir.tournoment.web.rest;

import com.amir.tournoment.domain.TeamEntity;
import com.amir.tournoment.repository.TeamEntityRepository;
import com.amir.tournoment.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.amir.tournoment.domain.TeamEntity}.
 */
@RestController
@RequestMapping("/api")
public class TeamEntityResource {

    private final Logger log = LoggerFactory.getLogger(TeamEntityResource.class);

    private static final String ENTITY_NAME = "teamEntity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TeamEntityRepository teamEntityRepository;

    public TeamEntityResource(TeamEntityRepository teamEntityRepository) {
        this.teamEntityRepository = teamEntityRepository;
    }

    /**
     * {@code POST  /team-entities} : Create a new teamEntity.
     *
     * @param teamEntity the teamEntity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new teamEntity, or with status {@code 400 (Bad Request)} if the teamEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/team-entities")
    public ResponseEntity<TeamEntity> createTeamEntity(@Valid @RequestBody TeamEntity teamEntity) throws URISyntaxException {
        log.debug("REST request to save TeamEntity : {}", teamEntity);
        if (teamEntity.getId() != null) {
            throw new BadRequestAlertException("A new teamEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeamEntity result = teamEntityRepository.save(teamEntity);
        return ResponseEntity.created(new URI("/api/team-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /team-entities} : Updates an existing teamEntity.
     *
     * @param teamEntity the teamEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated teamEntity,
     * or with status {@code 400 (Bad Request)} if the teamEntity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the teamEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/team-entities")
    public ResponseEntity<TeamEntity> updateTeamEntity(@Valid @RequestBody TeamEntity teamEntity) throws URISyntaxException {
        log.debug("REST request to update TeamEntity : {}", teamEntity);
        if (teamEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TeamEntity result = teamEntityRepository.save(teamEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, teamEntity.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /team-entities} : get all the teamEntities.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of teamEntities in body.
     */
    @GetMapping("/team-entities")
    public List<TeamEntity> getAllTeamEntities() {
        log.debug("REST request to get all TeamEntities");
        return teamEntityRepository.findAll();
    }

    /**
     * {@code GET  /team-entities/:id} : get the "id" teamEntity.
     *
     * @param id the id of the teamEntity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the teamEntity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/team-entities/{id}")
    public ResponseEntity<TeamEntity> getTeamEntity(@PathVariable Long id) {
        log.debug("REST request to get TeamEntity : {}", id);
        Optional<TeamEntity> teamEntity = teamEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(teamEntity);
    }

    /**
     * {@code DELETE  /team-entities/:id} : delete the "id" teamEntity.
     *
     * @param id the id of the teamEntity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/team-entities/{id}")
    public ResponseEntity<Void> deleteTeamEntity(@PathVariable Long id) {
        log.debug("REST request to delete TeamEntity : {}", id);
        teamEntityRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
