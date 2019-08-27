import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITeamEntity } from 'app/shared/model/team-entity.model';
import { AccountService } from 'app/core';
import { TeamEntityService } from './team-entity.service';

@Component({
  selector: 'jhi-team-entity',
  templateUrl: './team-entity.component.html'
})
export class TeamEntityComponent implements OnInit, OnDestroy {
  teamEntities: ITeamEntity[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected teamEntityService: TeamEntityService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.teamEntityService
      .query()
      .pipe(
        filter((res: HttpResponse<ITeamEntity[]>) => res.ok),
        map((res: HttpResponse<ITeamEntity[]>) => res.body)
      )
      .subscribe(
        (res: ITeamEntity[]) => {
          this.teamEntities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTeamEntities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITeamEntity) {
    return item.id;
  }

  registerChangeInTeamEntities() {
    this.eventSubscriber = this.eventManager.subscribe('teamEntityListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
