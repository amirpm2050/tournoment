/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TournomentTestModule } from '../../../test.module';
import { PlayerEntityDetailComponent } from 'app/entities/player-entity/player-entity-detail.component';
import { PlayerEntity } from 'app/shared/model/player-entity.model';

describe('Component Tests', () => {
  describe('PlayerEntity Management Detail Component', () => {
    let comp: PlayerEntityDetailComponent;
    let fixture: ComponentFixture<PlayerEntityDetailComponent>;
    const route = ({ data: of({ playerEntity: new PlayerEntity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TournomentTestModule],
        declarations: [PlayerEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlayerEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlayerEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.playerEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
