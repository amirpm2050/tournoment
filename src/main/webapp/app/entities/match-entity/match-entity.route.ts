import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MatchEntity } from 'app/shared/model/match-entity.model';
import { MatchEntityService } from './match-entity.service';
import { MatchEntityComponent } from './match-entity.component';
import { MatchEntityDetailComponent } from './match-entity-detail.component';
import { MatchEntityUpdateComponent } from './match-entity-update.component';
import { MatchEntityDeletePopupComponent } from './match-entity-delete-dialog.component';
import { IMatchEntity } from 'app/shared/model/match-entity.model';

@Injectable({ providedIn: 'root' })
export class MatchEntityResolve implements Resolve<IMatchEntity> {
  constructor(private service: MatchEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMatchEntity> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MatchEntity>) => response.ok),
        map((matchEntity: HttpResponse<MatchEntity>) => matchEntity.body)
      );
    }
    return of(new MatchEntity());
  }
}

export const matchEntityRoute: Routes = [
  {
    path: '',
    component: MatchEntityComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.matchEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MatchEntityDetailComponent,
    resolve: {
      matchEntity: MatchEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.matchEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MatchEntityUpdateComponent,
    resolve: {
      matchEntity: MatchEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.matchEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MatchEntityUpdateComponent,
    resolve: {
      matchEntity: MatchEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.matchEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const matchEntityPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MatchEntityDeletePopupComponent,
    resolve: {
      matchEntity: MatchEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.matchEntity.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
