import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TournomentSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [TournomentSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [TournomentSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TournomentSharedModule {
  static forRoot() {
    return {
      ngModule: TournomentSharedModule
    };
  }
}
