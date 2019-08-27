import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlayerEntity } from 'app/shared/model/player-entity.model';

@Component({
  selector: 'jhi-player-entity-detail',
  templateUrl: './player-entity-detail.component.html'
})
export class PlayerEntityDetailComponent implements OnInit {
  playerEntity: IPlayerEntity;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ playerEntity }) => {
      this.playerEntity = playerEntity;
    });
  }

  previousState() {
    window.history.back();
  }
}
