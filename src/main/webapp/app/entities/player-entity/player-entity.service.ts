import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlayerEntity } from 'app/shared/model/player-entity.model';

type EntityResponseType = HttpResponse<IPlayerEntity>;
type EntityArrayResponseType = HttpResponse<IPlayerEntity[]>;

@Injectable({ providedIn: 'root' })
export class PlayerEntityService {
  public resourceUrl = SERVER_API_URL + 'api/player-entities';

  constructor(protected http: HttpClient) {}

  create(playerEntity: IPlayerEntity): Observable<EntityResponseType> {
    return this.http.post<IPlayerEntity>(this.resourceUrl, playerEntity, { observe: 'response' });
  }

  update(playerEntity: IPlayerEntity): Observable<EntityResponseType> {
    return this.http.put<IPlayerEntity>(this.resourceUrl, playerEntity, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlayerEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlayerEntity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
