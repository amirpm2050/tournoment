import { IPlayerEntity } from 'app/shared/model/player-entity.model';
import { IGroupEntity } from 'app/shared/model/group-entity.model';

export interface ITeamEntity {
  id?: number;
  name?: string;
  members?: IPlayerEntity[];
  group?: IGroupEntity;
}

export class TeamEntity implements ITeamEntity {
  constructor(public id?: number, public name?: string, public members?: IPlayerEntity[], public group?: IGroupEntity) {}
}
