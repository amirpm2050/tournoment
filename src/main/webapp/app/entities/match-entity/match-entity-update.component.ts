import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMatchEntity, MatchEntity } from 'app/shared/model/match-entity.model';
import { MatchEntityService } from './match-entity.service';
import { IGroupEntity } from 'app/shared/model/group-entity.model';
import { GroupEntityService } from 'app/entities/group-entity';

@Component({
  selector: 'jhi-match-entity-update',
  templateUrl: './match-entity-update.component.html'
})
export class MatchEntityUpdateComponent implements OnInit {
  isSaving: boolean;

  groupentities: IGroupEntity[];

  editForm = this.fb.group({
    id: [],
    matchType: [],
    place: [],
    point: [],
    score: [],
    group: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected matchEntityService: MatchEntityService,
    protected groupEntityService: GroupEntityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ matchEntity }) => {
      this.updateForm(matchEntity);
    });
    this.groupEntityService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGroupEntity[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGroupEntity[]>) => response.body)
      )
      .subscribe((res: IGroupEntity[]) => (this.groupentities = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(matchEntity: IMatchEntity) {
    this.editForm.patchValue({
      id: matchEntity.id,
      matchType: matchEntity.matchType,
      place: matchEntity.place,
      point: matchEntity.point,
      score: matchEntity.score,
      group: matchEntity.group
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const matchEntity = this.createFromForm();
    if (matchEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.matchEntityService.update(matchEntity));
    } else {
      this.subscribeToSaveResponse(this.matchEntityService.create(matchEntity));
    }
  }

  private createFromForm(): IMatchEntity {
    return {
      ...new MatchEntity(),
      id: this.editForm.get(['id']).value,
      matchType: this.editForm.get(['matchType']).value,
      place: this.editForm.get(['place']).value,
      point: this.editForm.get(['point']).value,
      score: this.editForm.get(['score']).value,
      group: this.editForm.get(['group']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMatchEntity>>) {
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
