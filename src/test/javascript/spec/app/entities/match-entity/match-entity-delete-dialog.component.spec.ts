/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TournomentTestModule } from '../../../test.module';
import { MatchEntityDeleteDialogComponent } from 'app/entities/match-entity/match-entity-delete-dialog.component';
import { MatchEntityService } from 'app/entities/match-entity/match-entity.service';

describe('Component Tests', () => {
  describe('MatchEntity Management Delete Component', () => {
    let comp: MatchEntityDeleteDialogComponent;
    let fixture: ComponentFixture<MatchEntityDeleteDialogComponent>;
    let service: MatchEntityService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [MatchEntityDeleteDialogComponent]
      })
        .overrideTemplate(MatchEntityDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MatchEntityDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MatchEntityService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
