import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlayerEntity } from 'app/shared/model/player-entity.model';
import { PlayerEntityService } from './player-entity.service';
import { PlayerEntityComponent } from './player-entity.component';
import { PlayerEntityDetailComponent } from './player-entity-detail.component';
import { PlayerEntityUpdateComponent } from './player-entity-update.component';
import { PlayerEntityDeletePopupComponent } from './player-entity-delete-dialog.component';
import { IPlayerEntity } from 'app/shared/model/player-entity.model';

@Injectable({ providedIn: 'root' })
export class PlayerEntityResolve implements Resolve<IPlayerEntity> {
  constructor(private service: PlayerEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlayerEntity> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlayerEntity>) => response.ok),
        map((playerEntity: HttpResponse<PlayerEntity>) => playerEntity.body)
      );
    }
    return of(new PlayerEntity());
  }
}

export const playerEntityRoute: Routes = [
  {
    path: '',
    component: PlayerEntityComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.playerEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlayerEntityDetailComponent,
    resolve: {
      playerEntity: PlayerEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.playerEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlayerEntityUpdateComponent,
    resolve: {
      playerEntity: PlayerEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.playerEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlayerEntityUpdateComponent,
    resolve: {
      playerEntity: PlayerEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.playerEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const playerEntityPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlayerEntityDeletePopupComponent,
    resolve: {
      playerEntity: PlayerEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.playerEntity.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
