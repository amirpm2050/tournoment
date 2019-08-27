/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TournomentTestModule } from '../../../test.module';
import { MatchEntityUpdateComponent } from 'app/entities/match-entity/match-entity-update.component';
import { MatchEntityService } from 'app/entities/match-entity/match-entity.service';
import { MatchEntity } from 'app/shared/model/match-entity.model';

describe('Component Tests', () => {
  describe('MatchEntity Management Update Component', () => {
    let comp: MatchEntityUpdateComponent;
    let fixture: ComponentFixture<MatchEntityUpdateComponent>;
    let service: MatchEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [MatchEntityUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MatchEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MatchEntityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MatchEntityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MatchEntity(123);
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
        const entity = new MatchEntity();
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
