/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TournomentTestModule } from '../../../test.module';
import { TeamEntityDetailComponent } from 'app/entities/team-entity/team-entity-detail.component';
import { TeamEntity } from 'app/shared/model/team-entity.model';

describe('Component Tests', () => {
  describe('TeamEntity Management Detail Component', () => {
    let comp: TeamEntityDetailComponent;
    let fixture: ComponentFixture<TeamEntityDetailComponent>;
    const route = ({ data: of({ teamEntity: new TeamEntity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [TeamEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TeamEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TeamEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.teamEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
