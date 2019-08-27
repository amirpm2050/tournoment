package com.amir.tournoment.web.rest;

import com.amir.tournoment.domain.GroupEntity;
import com.amir.tournoment.repository.GroupEntityRepository;
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
 * REST controller for managing {@link com.amir.tournoment.domain.GroupEntity}.
 */
@RestController
@RequestMapping("/api")
public class GroupEntityResource {

    private final Logger log = LoggerFactory.getLogger(GroupEntityResource.class);

    private static final String ENTITY_NAME = "groupEntity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GroupEntityRepository groupEntityRepository;

    public GroupEntityResource(GroupEntityRepository groupEntityRepository) {
        this.groupEntityRepository = groupEntityRepository;
    }

    /**
     * {@code POST  /group-entities} : Create a new groupEntity.
     *
     * @param groupEntity the groupEntity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new groupEntity, or with status {@code 400 (Bad Request)} if the groupEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/group-entities")
    public ResponseEntity<GroupEntity> createGroupEntity(@Valid @RequestBody GroupEntity groupEntity) throws URISyntaxException {
        log.debug("REST request to save GroupEntity : {}", groupEntity);
        if (groupEntity.getId() != null) {
            throw new BadRequestAlertException("A new groupEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GroupEntity result = groupEntityRepository.save(groupEntity);
        return ResponseEntity.created(new URI("/api/group-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /group-entities} : Updates an existing groupEntity.
     *
     * @param groupEntity the groupEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated groupEntity,
     * or with status {@code 400 (Bad Request)} if the groupEntity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the groupEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/group-entities")
    public ResponseEntity<GroupEntity> updateGroupEntity(@Valid @RequestBody GroupEntity groupEntity) throws URISyntaxException {
        log.debug("REST request to update GroupEntity : {}", groupEntity);
        if (groupEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GroupEntity result = groupEntityRepository.save(groupEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, groupEntity.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /group-entities} : get all the groupEntities.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of groupEntities in body.
     */
    @GetMapping("/group-entities")
    public List<GroupEntity> getAllGroupEntities() {
        log.debug("REST request to get all GroupEntities");
        return groupEntityRepository.findAll();
    }

    /**
     * {@code GET  /group-entities/:id} : get the "id" groupEntity.
     *
     * @param id the id of the groupEntity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the groupEntity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/group-entities/{id}")
    public ResponseEntity<GroupEntity> getGroupEntity(@PathVariable Long id) {
        log.debug("REST request to get GroupEntity : {}", id);
        Optional<GroupEntity> groupEntity = groupEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(groupEntity);
    }

    /**
     * {@code DELETE  /group-entities/:id} : delete the "id" groupEntity.
     *
     * @param id the id of the groupEntity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/group-entities/{id}")
    public ResponseEntity<Void> deleteGroupEntity(@PathVariable Long id) {
        log.debug("REST request to delete GroupEntity : {}", id);
        groupEntityRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
