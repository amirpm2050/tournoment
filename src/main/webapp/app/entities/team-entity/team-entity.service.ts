import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeamEntity } from 'app/shared/model/team-entity.model';

type EntityResponseType = HttpResponse<ITeamEntity>;
type EntityArrayResponseType = HttpResponse<ITeamEntity[]>;

@Injectable({ providedIn: 'root' })
export class TeamEntityService {
  public resourceUrl = SERVER_API_URL + 'api/team-entities';

  constructor(protected http: HttpClient) {}

  create(teamEntity: ITeamEntity): Observable<EntityResponseType> {
    return this.http.post<ITeamEntity>(this.resourceUrl, teamEntity, { observe: 'response' });
  }

  update(teamEntity: ITeamEntity): Observable<EntityResponseType> {
    return this.http.put<ITeamEntity>(this.resourceUrl, teamEntity, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITeamEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITeamEntity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
