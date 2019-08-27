/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TournomentTestModule } from '../../../test.module';
import { GroupEntityUpdateComponent } from 'app/entities/group-entity/group-entity-update.component';
import { GroupEntityService } from 'app/entities/group-entity/group-entity.service';
import { GroupEntity } from 'app/shared/model/group-entity.model';

describe('Component Tests', () => {
  describe('GroupEntity Management Update Component', () => {
    let comp: GroupEntityUpdateComponent;
    let fixture: ComponentFixture<GroupEntityUpdateComponent>;
    let service: GroupEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [GroupEntityUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GroupEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupEntityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupEntityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupEntity(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupEntity();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
