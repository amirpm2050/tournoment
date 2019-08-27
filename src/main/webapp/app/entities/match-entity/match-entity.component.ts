import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMatchEntity } from 'app/shared/model/match-entity.model';
import { AccountService } from 'app/core';
import { MatchEntityService } from './match-entity.service';

@Component({
  selector: 'jhi-match-entity',
  templateUrl: './match-entity.component.html'
})
export class MatchEntityComponent implements OnInit, OnDestroy {
  matchEntities: IMatchEntity[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected matchEntityService: MatchEntityService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.matchEntityService
      .query()
      .pipe(
        filter((res: HttpResponse<IMatchEntity[]>) => res.ok),
        map((res: HttpResponse<IMatchEntity[]>) => res.body)
      )
      .subscribe(
        (res: IMatchEntity[]) => {
          this.matchEntities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMatchEntities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMatchEntity) {
    return item.id;
  }

  registerChangeInMatchEntities() {
    this.eventSubscriber = this.eventManager.subscribe('matchEntityListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
