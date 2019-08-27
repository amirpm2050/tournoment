import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroupEntity } from 'app/shared/model/group-entity.model';
import { GroupEntityService } from './group-entity.service';

@Component({
  selector: 'jhi-group-entity-delete-dialog',
  templateUrl: './group-entity-delete-dialog.component.html'
})
export class GroupEntityDeleteDialogComponent {
  groupEntity: IGroupEntity;

  constructor(
    protected groupEntityService: GroupEntityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.groupEntityService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'groupEntityListModification',
        content: 'Deleted an groupEntity'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-group-entity-delete-popup',
  template: ''
})
export class GroupEntityDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ groupEntity }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(GroupEntityDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.groupEntity = groupEntity;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/group-entity', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/group-entity', { outlets: { popup: null } }]);
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
