import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGroupEntity } from 'app/shared/model/group-entity.model';
import { AccountService } from 'app/core';
import { GroupEntityService } from './group-entity.service';

@Component({
  selector: 'jhi-group-entity',
  templateUrl: './group-entity.component.html'
})
export class GroupEntityComponent implements OnInit, OnDestroy {
  groupEntities: IGroupEntity[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected groupEntityService: GroupEntityService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.groupEntityService
      .query()
      .pipe(
        filter((res: HttpResponse<IGroupEntity[]>) => res.ok),
        map((res: HttpResponse<IGroupEntity[]>) => res.body)
      )
      .subscribe(
        (res: IGroupEntity[]) => {
          this.groupEntities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInGroupEntities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGroupEntity) {
    return item.id;
  }

  registerChangeInGroupEntities() {
    this.eventSubscriber = this.eventManager.subscribe('groupEntityListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
