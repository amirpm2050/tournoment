import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TournomentSharedModule } from 'app/shared';
import {
  PlayerEntityComponent,
  PlayerEntityDetailComponent,
  PlayerEntityUpdateComponent,
  PlayerEntityDeletePopupComponent,
  PlayerEntityDeleteDialogComponent,
  playerEntityRoute,
  playerEntityPopupRoute
} from './';

const ENTITY_STATES = [...playerEntityRoute, ...playerEntityPopupRoute];

@NgModule({
  imports: [TournomentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlayerEntityComponent,
    PlayerEntityDetailComponent,
    PlayerEntityUpdateComponent,
    PlayerEntityDeleteDialogComponent,
    PlayerEntityDeletePopupComponent
  ],
  entryComponents: [
    PlayerEntityComponent,
    PlayerEntityUpdateComponent,
    PlayerEntityDeleteDialogComponent,
    PlayerEntityDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TournomentPlayerEntityModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
