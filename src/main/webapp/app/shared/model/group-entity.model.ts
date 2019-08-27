import { ITeamEntity } from 'app/shared/model/team-entity.model';
import { IMatchEntity } from 'app/shared/model/match-entity.model';

export interface IGroupEntity {
  id?: number;
  name?: string;
  teams?: ITeamEntity[];
  matches?: IMatchEntity[];
}

export class GroupEntity implements IGroupEntity {
  constructor(public id?: number, public name?: string, public teams?: ITeamEntity[], public matches?: IMatchEntity[]) {}
}
