import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TeamEntity } from 'app/shared/model/team-entity.model';
import { TeamEntityService } from './team-entity.service';
import { TeamEntityComponent } from './team-entity.component';
import { TeamEntityDetailComponent } from './team-entity-detail.component';
import { TeamEntityUpdateComponent } from './team-entity-update.component';
import { TeamEntityDeletePopupComponent } from './team-entity-delete-dialog.component';
import { ITeamEntity } from 'app/shared/model/team-entity.model';

@Injectable({ providedIn: 'root' })
export class TeamEntityResolve implements Resolve<ITeamEntity> {
  constructor(private service: TeamEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITeamEntity> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TeamEntity>) => response.ok),
        map((teamEntity: HttpResponse<TeamEntity>) => teamEntity.body)
      );
    }
    return of(new TeamEntity());
  }
}

export const teamEntityRoute: Routes = [
  {
    path: '',
    component: TeamEntityComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.teamEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TeamEntityDetailComponent,
    resolve: {
      teamEntity: TeamEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.teamEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TeamEntityUpdateComponent,
    resolve: {
      teamEntity: TeamEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.teamEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TeamEntityUpdateComponent,
    resolve: {
      teamEntity: TeamEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.teamEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const teamEntityPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TeamEntityDeletePopupComponent,
    resolve: {
      teamEntity: TeamEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.teamEntity.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
