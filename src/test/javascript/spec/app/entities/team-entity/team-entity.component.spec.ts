/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TournomentTestModule } from '../../../test.module';
import { TeamEntityComponent } from 'app/entities/team-entity/team-entity.component';
import { TeamEntityService } from 'app/entities/team-entity/team-entity.service';
import { TeamEntity } from 'app/shared/model/team-entity.model';

describe('Component Tests', () => {
  describe('TeamEntity Management Component', () => {
    let comp: TeamEntityComponent;
    let fixture: ComponentFixture<TeamEntityComponent>;
    let service: TeamEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [TeamEntityComponent],
        providers: []
      })
        .overrideTemplate(TeamEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TeamEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeamEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TeamEntity(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.teamEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
