import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroupEntity } from 'app/shared/model/group-entity.model';

@Component({
  selector: 'jhi-group-entity-detail',
  templateUrl: './group-entity-detail.component.html'
})
export class GroupEntityDetailComponent implements OnInit {
  groupEntity: IGroupEntity;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ groupEntity }) => {
      this.groupEntity = groupEntity;
    });
  }

  previousState() {
    window.history.back();
  }
}
