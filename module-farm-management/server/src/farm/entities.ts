import nanoId from 'nanoid';
import { Entity, PrimaryColumn, Column, OneToMany, Index, BeforeInsert } from '@deboxsoft/typeorm';
import { BaseModel } from '../BaseModel';
import { FarmID, FarmAttributes, FarmInput } from './types';
import { Bird } from '../bird/entities';

@Entity()
@Index(['createdAt', 'id'])
export class Farm extends BaseModel {
  @PrimaryColumn()
  id: FarmID;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  @Column()
  name: string;

  @OneToMany(type => Bird, bird => bird.farm)
  birds: Bird[];

  constructor(props?: FarmAttributes) {
    super();
    if (props) {
      this.id = props.id;
      this.fromJson(props);
    }
  }

  fromJson(json: Partial<FarmInput>) {
    json.name && (this.name = json.name);
  }
}
