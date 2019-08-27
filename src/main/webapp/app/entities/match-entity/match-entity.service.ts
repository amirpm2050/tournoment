import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMatchEntity } from 'app/shared/model/match-entity.model';

type EntityResponseType = HttpResponse<IMatchEntity>;
type EntityArrayResponseType = HttpResponse<IMatchEntity[]>;

@Injectable({ providedIn: 'root' })
export class MatchEntityService {
  public resourceUrl = SERVER_API_URL + 'api/match-entities';

  constructor(protected http: HttpClient) {}

  create(matchEntity: IMatchEntity): Observable<EntityResponseType> {
    return this.http.post<IMatchEntity>(this.resourceUrl, matchEntity, { observe: 'response' });
  }

  update(matchEntity: IMatchEntity): Observable<EntityResponseType> {
    return this.http.put<IMatchEntity>(this.resourceUrl, matchEntity, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMatchEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMatchEntity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
