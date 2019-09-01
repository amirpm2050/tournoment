package com.amir.tournoment.web.rest;

import com.amir.tournoment.domain.MatchEntity;
import com.amir.tournoment.repository.MatchEntityRepository;
import com.amir.tournoment.service.MatchEntityService;
import com.amir.tournoment.service.dto.MatchEntityDTO;
import com.amir.tournoment.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.amir.tournoment.domain.MatchEntity}.
 */
@RestController
@RequestMapping("/api")
public class MatchEntityResource {

    private final Logger log = LoggerFactory.getLogger(MatchEntityResource.class);

    private static final String ENTITY_NAME = "matchEntity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MatchEntityRepository matchEntityRepository;
    private final MatchEntityService matchEntityService;

    public MatchEntityResource(MatchEntityRepository matchEntityRepository , MatchEntityService matchEntityService) {
        this.matchEntityRepository = matchEntityRepository;
        this.matchEntityService = matchEntityService;
    }

    /**
     * {@code POST  /match-entities} : Create a new matchEntity.
     *
     * @param matchEntityDTO the matchEntity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new matchEntity, or with status {@code 400 (Bad Request)} if the matchEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/match-entities")
    public ResponseEntity<MatchEntity> createMatchEntity(@RequestBody MatchEntityDTO matchEntityDTO) throws URISyntaxException {
        log.debug("REST request to save MatchEntity : {}", matchEntityDTO);
        if (matchEntityDTO.getId() != null) {
            throw new BadRequestAlertException("A new matchEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MatchEntity result = matchEntityRepository.save( matchEntityService.createMachEntity(matchEntityDTO));
        return ResponseEntity.created(new URI("/api/match-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /match-entities} : Updates an existing matchEntity.
     *
     * @param matchEntity the matchEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated matchEntity,
     * or with status {@code 400 (Bad Request)} if the matchEntity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the matchEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/match-entities")
    public ResponseEntity<MatchEntity> updateMatchEntity(@RequestBody MatchEntity matchEntity) throws URISyntaxException {
        log.debug("REST request to update MatchEntity : {}", matchEntity);
        if (matchEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MatchEntity result = matchEntityRepository.save(matchEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, matchEntity.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /match-entities} : get all the matchEntities.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of matchEntities in body.
     */
    @GetMapping("/match-entities")
    public List<MatchEntity> getAllMatchEntities() {
        log.debug("REST request to get all MatchEntities");
        return matchEntityRepository.findAll();
    }

    /**
     * {@code GET  /match-entities/:id} : get the "id" matchEntity.
     *
     * @param id the id of the matchEntity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the matchEntity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/match-entities/{id}")
    public ResponseEntity<MatchEntity> getMatchEntity(@PathVariable Long id) {
        log.debug("REST request to get MatchEntity : {}", id);
        Optional<MatchEntity> matchEntity = matchEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(matchEntity);
    }

    /**
     * {@code DELETE  /match-entities/:id} : delete the "id" matchEntity.
     *
     * @param id the id of the matchEntity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/match-entities/{id}")
    public ResponseEntity<Void> deleteMatchEntity(@PathVariable Long id) {
        log.debug("REST request to delete MatchEntity : {}", id);
        matchEntityRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
