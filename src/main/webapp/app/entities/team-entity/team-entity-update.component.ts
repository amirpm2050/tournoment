import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITeamEntity, TeamEntity } from 'app/shared/model/team-entity.model';
import { TeamEntityService } from './team-entity.service';
import { IGroupEntity } from 'app/shared/model/group-entity.model';
import { GroupEntityService } from 'app/entities/group-entity';

@Component({
  selector: 'jhi-team-entity-update',
  templateUrl: './team-entity-update.component.html'
})
export class TeamEntityUpdateComponent implements OnInit {
  isSaving: boolean;

  groupentities: IGroupEntity[];

  editForm = this.fb.group({
    id: [],
    name: [],
    group: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected teamEntityService: TeamEntityService,
    protected groupEntityService: GroupEntityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ teamEntity }) => {
      this.updateForm(teamEntity);
    });
    this.groupEntityService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGroupEntity[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGroupEntity[]>) => response.body)
      )
      .subscribe((res: IGroupEntity[]) => (this.groupentities = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(teamEntity: ITeamEntity) {
    this.editForm.patchValue({
      id: teamEntity.id,
      name: teamEntity.name,
      group: teamEntity.group
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const teamEntity = this.createFromForm();
    if (teamEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.teamEntityService.update(teamEntity));
    } else {
      this.subscribeToSaveResponse(this.teamEntityService.create(teamEntity));
    }
  }

  private createFromForm(): ITeamEntity {
    return {
      ...new TeamEntity(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      group: this.editForm.get(['group']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeamEntity>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackGroupEntityById(index: number, item: IGroupEntity) {
    return item.id;
  }
}
