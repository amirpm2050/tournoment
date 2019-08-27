/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TournomentTestModule } from '../../../test.module';
import { TeamEntityUpdateComponent } from 'app/entities/team-entity/team-entity-update.component';
import { TeamEntityService } from 'app/entities/team-entity/team-entity.service';
import { TeamEntity } from 'app/shared/model/team-entity.model';

describe('Component Tests', () => {
  describe('TeamEntity Management Update Component', () => {
    let comp: TeamEntityUpdateComponent;
    let fixture: ComponentFixture<TeamEntityUpdateComponent>;
    let service: TeamEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [TeamEntityUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TeamEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TeamEntityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeamEntityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TeamEntity(123);
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
        const entity = new TeamEntity();
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
