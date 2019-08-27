import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlayerEntity } from 'app/shared/model/player-entity.model';
import { PlayerEntityService } from './player-entity.service';

@Component({
  selector: 'jhi-player-entity-delete-dialog',
  templateUrl: './player-entity-delete-dialog.component.html'
})
export class PlayerEntityDeleteDialogComponent {
  playerEntity: IPlayerEntity;

  constructor(
    protected playerEntityService: PlayerEntityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.playerEntityService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'playerEntityListModification',
        content: 'Deleted an playerEntity'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-player-entity-delete-popup',
  template: ''
})
export class PlayerEntityDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ playerEntity }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlayerEntityDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.playerEntity = playerEntity;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/player-entity', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/player-entity', { outlets: { popup: null } }]);
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
