import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlayerEntity, PlayerEntity } from 'app/shared/model/player-entity.model';
import { PlayerEntityService } from './player-entity.service';
import { ITeamEntity } from 'app/shared/model/team-entity.model';
import { TeamEntityService } from 'app/entities/team-entity';

@Component({
  selector: 'jhi-player-entity-update',
  templateUrl: './player-entity-update.component.html'
})
export class PlayerEntityUpdateComponent implements OnInit {
  isSaving: boolean;

  teamentities: ITeamEntity[];

  editForm = this.fb.group({
    id: [],
    name: [],
    mobile: [],
    team: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected playerEntityService: PlayerEntityService,
    protected teamEntityService: TeamEntityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ playerEntity }) => {
      this.updateForm(playerEntity);
    });
    this.teamEntityService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITeamEntity[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITeamEntity[]>) => response.body)
      )
      .subscribe((res: ITeamEntity[]) => (this.teamentities = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(playerEntity: IPlayerEntity) {
    this.editForm.patchValue({
      id: playerEntity.id,
      name: playerEntity.name,
      mobile: playerEntity.mobile,
      team: playerEntity.team
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const playerEntity = this.createFromForm();
    if (playerEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.playerEntityService.update(playerEntity));
    } else {
      this.subscribeToSaveResponse(this.playerEntityService.create(playerEntity));
    }
  }

  private createFromForm(): IPlayerEntity {
    return {
      ...new PlayerEntity(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      mobile: this.editForm.get(['mobile']).value,
      team: this.editForm.get(['team']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayerEntity>>) {
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

  trackTeamEntityById(index: number, item: ITeamEntity) {
    return item.id;
  }
}
