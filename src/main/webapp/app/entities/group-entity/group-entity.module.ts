import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TournomentSharedModule } from 'app/shared';
import {
  GroupEntityComponent,
  GroupEntityDetailComponent,
  GroupEntityUpdateComponent,
  GroupEntityDeletePopupComponent,
  GroupEntityDeleteDialogComponent,
  groupEntityRoute,
  groupEntityPopupRoute
} from './';

const ENTITY_STATES = [...groupEntityRoute, ...groupEntityPopupRoute];

@NgModule({
  imports: [TournomentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    GroupEntityComponent,
    GroupEntityDetailComponent,
    GroupEntityUpdateComponent,
    GroupEntityDeleteDialogComponent,
    GroupEntityDeletePopupComponent
  ],
  entryComponents: [GroupEntityComponent, GroupEntityUpdateComponent, GroupEntityDeleteDialogComponent, GroupEntityDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TournomentGroupEntityModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
