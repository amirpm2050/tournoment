import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeamEntity } from 'app/shared/model/team-entity.model';
import { TeamEntityService } from './team-entity.service';

@Component({
  selector: 'jhi-team-entity-delete-dialog',
  templateUrl: './team-entity-delete-dialog.component.html'
})
export class TeamEntityDeleteDialogComponent {
  teamEntity: ITeamEntity;

  constructor(
    protected teamEntityService: TeamEntityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.teamEntityService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'teamEntityListModification',
        content: 'Deleted an teamEntity'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-team-entity-delete-popup',
  template: ''
})
export class TeamEntityDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ teamEntity }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TeamEntityDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.teamEntity = teamEntity;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/team-entity', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/team-entity', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
