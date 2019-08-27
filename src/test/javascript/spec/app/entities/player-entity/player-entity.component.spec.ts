/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TournomentTestModule } from '../../../test.module';
import { PlayerEntityComponent } from 'app/entities/player-entity/player-entity.component';
import { PlayerEntityService } from 'app/entities/player-entity/player-entity.service';
import { PlayerEntity } from 'app/shared/model/player-entity.model';

describe('Component Tests', () => {
  describe('PlayerEntity Management Component', () => {
    let comp: PlayerEntityComponent;
    let fixture: ComponentFixture<PlayerEntityComponent>;
    let service: PlayerEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [PlayerEntityComponent],
        providers: []
      })
        .overrideTemplate(PlayerEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlayerEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayerEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlayerEntity(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.playerEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
