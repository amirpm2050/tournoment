import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlayerEntity } from 'app/shared/model/player-entity.model';
import { AccountService } from 'app/core';
import { PlayerEntityService } from './player-entity.service';

@Component({
  selector: 'jhi-player-entity',
  templateUrl: './player-entity.component.html'
})
export class PlayerEntityComponent implements OnInit, OnDestroy {
  playerEntities: IPlayerEntity[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected playerEntityService: PlayerEntityService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.playerEntityService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlayerEntity[]>) => res.ok),
        map((res: HttpResponse<IPlayerEntity[]>) => res.body)
      )
      .subscribe(
        (res: IPlayerEntity[]) => {
          this.playerEntities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlayerEntities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlayerEntity) {
    return item.id;
  }

  registerChangeInPlayerEntities() {
    this.eventSubscriber = this.eventManager.subscribe('playerEntityListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
