import { IGroupEntity } from 'app/shared/model/group-entity.model';

export const enum MatchType {
  NORMALMATCH = 'NORMALMATCH',
  DOUBLEMATCH = 'DOUBLEMATCH',
  SPEEDGOMMON = 'SPEEDGOMMON'
}

export interface IMatchEntity {
  id?: number;
  matchType?: MatchType;
  place?: string;
  point?: number;
  score?: number;
  group?: IGroupEntity;
}

export class MatchEntity implements IMatchEntity {
  constructor(
    public id?: number,
    public matchType?: MatchType,
    public place?: string,
    public point?: number,
    public score?: number,
    public group?: IGroupEntity
  ) {}
}
