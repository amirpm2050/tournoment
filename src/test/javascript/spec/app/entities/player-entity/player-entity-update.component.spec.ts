/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TournomentTestModule } from '../../../test.module';
import { PlayerEntityUpdateComponent } from 'app/entities/player-entity/player-entity-update.component';
import { PlayerEntityService } from 'app/entities/player-entity/player-entity.service';
import { PlayerEntity } from 'app/shared/model/player-entity.model';

describe('Component Tests', () => {
  describe('PlayerEntity Management Update Component', () => {
    let comp: PlayerEntityUpdateComponent;
    let fixture: ComponentFixture<PlayerEntityUpdateComponent>;
    let service: PlayerEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [PlayerEntityUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlayerEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlayerEntityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayerEntityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlayerEntity(123);
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
        const entity = new PlayerEntity();
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
