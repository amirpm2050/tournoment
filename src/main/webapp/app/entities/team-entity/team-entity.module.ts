import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TournomentSharedModule } from 'app/shared';
import {
  TeamEntityComponent,
  TeamEntityDetailComponent,
  TeamEntityUpdateComponent,
  TeamEntityDeletePopupComponent,
  TeamEntityDeleteDialogComponent,
  teamEntityRoute,
  teamEntityPopupRoute
} from './';

const ENTITY_STATES = [...teamEntityRoute, ...teamEntityPopupRoute];

@NgModule({
  imports: [TournomentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TeamEntityComponent,
    TeamEntityDetailComponent,
    TeamEntityUpdateComponent,
    TeamEntityDeleteDialogComponent,
    TeamEntityDeletePopupComponent
  ],
  entryComponents: [TeamEntityComponent, TeamEntityUpdateComponent, TeamEntityDeleteDialogComponent, TeamEntityDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TournomentTeamEntityModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
