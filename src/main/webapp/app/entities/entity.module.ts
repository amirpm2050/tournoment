import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'team-entity',
        loadChildren: () => import('./team-entity/team-entity.module').then(m => m.TournomentTeamEntityModule)
      },
      {
        path: 'player-entity',
        loadChildren: () => import('./player-entity/player-entity.module').then(m => m.TournomentPlayerEntityModule)
      },
      {
        path: 'group-entity',
        loadChildren: () => import('./group-entity/group-entity.module').then(m => m.TournomentGroupEntityModule)
      },
      {
        path: 'match-entity',
        loadChildren: () => import('./match-entity/match-entity.module').then(m => m.TournomentMatchEntityModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TournomentEntityModule {}
