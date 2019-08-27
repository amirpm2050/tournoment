import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TournomentSharedModule } from 'app/shared';
import {
  MatchEntityComponent,
  MatchEntityDetailComponent,
  MatchEntityUpdateComponent,
  MatchEntityDeletePopupComponent,
  MatchEntityDeleteDialogComponent,
  matchEntityRoute,
  matchEntityPopupRoute
} from './';

const ENTITY_STATES = [...matchEntityRoute, ...matchEntityPopupRoute];

@NgModule({
  imports: [TournomentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MatchEntityComponent,
    MatchEntityDetailComponent,
    MatchEntityUpdateComponent,
    MatchEntityDeleteDialogComponent,
    MatchEntityDeletePopupComponent
  ],
  entryComponents: [MatchEntityComponent, MatchEntityUpdateComponent, MatchEntityDeleteDialogComponent, MatchEntityDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TournomentMatchEntityModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
