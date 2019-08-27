/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TournomentTestModule } from '../../../test.module';
import { GroupEntityDetailComponent } from 'app/entities/group-entity/group-entity-detail.component';
import { GroupEntity } from 'app/shared/model/group-entity.model';

describe('Component Tests', () => {
  describe('GroupEntity Management Detail Component', () => {
    let comp: GroupEntityDetailComponent;
    let fixture: ComponentFixture<GroupEntityDetailComponent>;
    const route = ({ data: of({ groupEntity: new GroupEntity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [GroupEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GroupEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GroupEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.groupEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
