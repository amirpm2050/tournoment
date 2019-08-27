/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TournomentTestModule } from '../../../test.module';
import { MatchEntityDetailComponent } from 'app/entities/match-entity/match-entity-detail.component';
import { MatchEntity } from 'app/shared/model/match-entity.model';

describe('Component Tests', () => {
  describe('MatchEntity Management Detail Component', () => {
    let comp: MatchEntityDetailComponent;
    let fixture: ComponentFixture<MatchEntityDetailComponent>;
    const route = ({ data: of({ matchEntity: new MatchEntity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [MatchEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MatchEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MatchEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.matchEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
