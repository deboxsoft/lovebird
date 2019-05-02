import nanoId from 'nanoid';
import {
  Entity,
  PrimaryColumn,
  Column,
  RelationId,
  OneToMany,
  Index,
  BeforeInsert
} from '@deboxsoft/typeorm';
import { BaseModel } from '@deboxsoft/typeorm/model/BaseModel';
import { FarmID, FarmAttributes, FarmInput } from './types';
import { Ring } from '../bird/types';
import { Bird } from '../bird/entities';

@Entity()
@Index(['createAt', ''])
export class Farm extends BaseModel {
  @PrimaryColumn()
  id: FarmID;

  @Column()
  name: string;

  @OneToMany(type => Bird, bird => bird.farm)
  birds: Bird[];

  @RelationId((farm: Farm) => farm.birds)
  rings: Ring[];

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  constructor(props?: FarmAttributes) {
    super();
    if (props) {
      this.id = props.id;
      this.fromJson(props);
    }
  }

  fromJson(json: FarmInput) {
    json.name && (this.name = json.name);
  }
}
