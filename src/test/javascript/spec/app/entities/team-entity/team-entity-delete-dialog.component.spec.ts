/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TournomentTestModule } from '../../../test.module';
import { TeamEntityDeleteDialogComponent } from 'app/entities/team-entity/team-entity-delete-dialog.component';
import { TeamEntityService } from 'app/entities/team-entity/team-entity.service';

describe('Component Tests', () => {
  describe('TeamEntity Management Delete Component', () => {
    let comp: TeamEntityDeleteDialogComponent;
    let fixture: ComponentFixture<TeamEntityDeleteDialogComponent>;
    let service: TeamEntityService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [TeamEntityDeleteDialogComponent]
      })
        .overrideTemplate(TeamEntityDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TeamEntityDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeamEntityService);
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
