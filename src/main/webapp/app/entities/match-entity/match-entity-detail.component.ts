import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMatchEntity } from 'app/shared/model/match-entity.model';

@Component({
  selector: 'jhi-match-entity-detail',
  templateUrl: './match-entity-detail.component.html'
})
export class MatchEntityDetailComponent implements OnInit {
  matchEntity: IMatchEntity;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ matchEntity }) => {
      this.matchEntity = matchEntity;
    });
  }

  previousState() {
    window.history.back();
  }
}
