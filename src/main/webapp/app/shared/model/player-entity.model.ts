import { ITeamEntity } from 'app/shared/model/team-entity.model';

export interface IPlayerEntity {
  id?: number;
  name?: string;
  mobile?: string;
  team?: ITeamEntity;
}

export class PlayerEntity implements IPlayerEntity {
  constructor(public id?: number, public name?: string, public mobile?: string, public team?: ITeamEntity) {}
}
