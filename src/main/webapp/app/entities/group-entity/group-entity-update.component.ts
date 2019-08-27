import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IGroupEntity, GroupEntity } from 'app/shared/model/group-entity.model';
import { GroupEntityService } from './group-entity.service';

@Component({
  selector: 'jhi-group-entity-update',
  templateUrl: './group-entity-update.component.html'
})
export class GroupEntityUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected groupEntityService: GroupEntityService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ groupEntity }) => {
      this.updateForm(groupEntity);
    });
  }

  updateForm(groupEntity: IGroupEntity) {
    this.editForm.patchValue({
      id: groupEntity.id,
      name: groupEntity.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const groupEntity = this.createFromForm();
    if (groupEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.groupEntityService.update(groupEntity));
    } else {
      this.subscribeToSaveResponse(this.groupEntityService.create(groupEntity));
    }
  }

  private createFromForm(): IGroupEntity {
    return {
      ...new GroupEntity(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupEntity>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
