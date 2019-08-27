import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeamEntity } from 'app/shared/model/team-entity.model';

@Component({
  selector: 'jhi-team-entity-detail',
  templateUrl: './team-entity-detail.component.html'
})
export class TeamEntityDetailComponent implements OnInit {
  teamEntity: ITeamEntity;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ teamEntity }) => {
      this.teamEntity = teamEntity;
    });
  }

  previousState() {
    window.history.back();
  }
}
