import nanoId from 'nanoid';
import { Entity, PrimaryColumn, Column, OneToMany, Index, BeforeInsert } from '@deboxsoft/typeorm';
import { FarmID, FarmAttributes, FarmInput } from '@deboxsoft/lb-module-farm-management-types';
import { BaseModel } from '../BaseModel';
import { Bird } from '../bird';

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

  constructor(props?: FarmAttributes) {
    super();
    if (props) {
      this.id = props.id;
      this.fromJson(props);
    }
  }

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
