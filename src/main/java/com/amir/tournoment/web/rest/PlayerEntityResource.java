package com.amir.tournoment.web.rest;

import com.amir.tournoment.domain.PlayerEntity;
import com.amir.tournoment.repository.PlayerEntityRepository;
import com.amir.tournoment.service.PlayerEntityService;
import com.amir.tournoment.service.dto.PlayerEntityDTO;
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
 * REST controller for managing {@link com.amir.tournoment.domain.PlayerEntity}.
 */
@RestController
@RequestMapping("/api")
public class PlayerEntityResource {

    private final Logger log = LoggerFactory.getLogger(PlayerEntityResource.class);

    private static final String ENTITY_NAME = "playerEntity";

    private final PlayerEntityService playerEntityService ;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlayerEntityRepository playerEntityRepository;

    public PlayerEntityResource(PlayerEntityRepository playerEntityRepository , PlayerEntityService playerEntityService) {
        this.playerEntityRepository = playerEntityRepository;
        this.playerEntityService = playerEntityService;
    }

    /**
     * {@code POST  /player-entities} : Create a new playerEntity.
     *
     * @param playerEntityDTO the playerEntity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new playerEntity, or with status {@code 400 (Bad Request)} if the playerEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/player-entities")
    public ResponseEntity<PlayerEntity> createPlayerEntity(@RequestBody PlayerEntityDTO playerEntityDTO) throws URISyntaxException {
        log.debug("REST request to save PlayerEntity : {}", playerEntityDTO);
        if (playerEntityDTO.getId() != null) {
            throw new BadRequestAlertException("A new playerEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        log.debug("Resource :"+playerEntityDTO.toString());
        PlayerEntity result = playerEntityRepository.save(playerEntityService.createPlayerEntity(playerEntityDTO));
        return ResponseEntity.created(new URI("/api/player-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /player-entities} : Updates an existing playerEntity.
     *
     * @param playerEntity the playerEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated playerEntity,
     * or with status {@code 400 (Bad Request)} if the playerEntity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the playerEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/player-entities")
    public ResponseEntity<PlayerEntity> updatePlayerEntity(@RequestBody PlayerEntity playerEntity) throws URISyntaxException {
        log.debug("REST request to update PlayerEntity : {}", playerEntity);
        if (playerEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlayerEntity result = playerEntityRepository.save(playerEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, playerEntity.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /player-entities} : get all the playerEntities.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of playerEntities in body.
     */
    @GetMapping("/player-entities")
    public List<PlayerEntity> getAllPlayerEntities() {
        log.debug("REST request to get all PlayerEntities");
        return playerEntityRepository.findAll();
    }

    /**
     * {@code GET  /player-entities/:id} : get the "id" playerEntity.
     *
     * @param id the id of the playerEntity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the playerEntity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/player-entities/{id}")
    public ResponseEntity<PlayerEntity> getPlayerEntity(@PathVariable Long id) {
        log.debug("REST request to get PlayerEntity : {}", id);
        Optional<PlayerEntity> playerEntity = playerEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(playerEntity);
    }

    /**
     * {@code DELETE  /player-entities/:id} : delete the "id" playerEntity.
     *
     * @param id the id of the playerEntity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/player-entities/{id}")
    public ResponseEntity<Void> deletePlayerEntity(@PathVariable Long id) {
        log.debug("REST request to delete PlayerEntity : {}", id);
        playerEntityRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
