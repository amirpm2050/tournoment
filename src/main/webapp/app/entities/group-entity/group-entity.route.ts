import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GroupEntity } from 'app/shared/model/group-entity.model';
import { GroupEntityService } from './group-entity.service';
import { GroupEntityComponent } from './group-entity.component';
import { GroupEntityDetailComponent } from './group-entity-detail.component';
import { GroupEntityUpdateComponent } from './group-entity-update.component';
import { GroupEntityDeletePopupComponent } from './group-entity-delete-dialog.component';
import { IGroupEntity } from 'app/shared/model/group-entity.model';

@Injectable({ providedIn: 'root' })
export class GroupEntityResolve implements Resolve<IGroupEntity> {
  constructor(private service: GroupEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroupEntity> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<GroupEntity>) => response.ok),
        map((groupEntity: HttpResponse<GroupEntity>) => groupEntity.body)
      );
    }
    return of(new GroupEntity());
  }
}

export const groupEntityRoute: Routes = [
  {
    path: '',
    component: GroupEntityComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.groupEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GroupEntityDetailComponent,
    resolve: {
      groupEntity: GroupEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.groupEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GroupEntityUpdateComponent,
    resolve: {
      groupEntity: GroupEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.groupEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GroupEntityUpdateComponent,
    resolve: {
      groupEntity: GroupEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.groupEntity.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const groupEntityPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: GroupEntityDeletePopupComponent,
    resolve: {
      groupEntity: GroupEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tournomentApp.groupEntity.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
