/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TournomentTestModule } from '../../../test.module';
import { MatchEntityComponent } from 'app/entities/match-entity/match-entity.component';
import { MatchEntityService } from 'app/entities/match-entity/match-entity.service';
import { MatchEntity } from 'app/shared/model/match-entity.model';

describe('Component Tests', () => {
  describe('MatchEntity Management Component', () => {
    let comp: MatchEntityComponent;
    let fixture: ComponentFixture<MatchEntityComponent>;
    let service: MatchEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [MatchEntityComponent],
        providers: []
      })
        .overrideTemplate(MatchEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MatchEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MatchEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MatchEntity(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.matchEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
