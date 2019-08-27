/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TournomentTestModule } from '../../../test.module';
import { GroupEntityComponent } from 'app/entities/group-entity/group-entity.component';
import { GroupEntityService } from 'app/entities/group-entity/group-entity.service';
import { GroupEntity } from 'app/shared/model/group-entity.model';

describe('Component Tests', () => {
  describe('GroupEntity Management Component', () => {
    let comp: GroupEntityComponent;
    let fixture: ComponentFixture<GroupEntityComponent>;
    let service: GroupEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [GroupEntityComponent],
        providers: []
      })
        .overrideTemplate(GroupEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GroupEntity(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.groupEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
