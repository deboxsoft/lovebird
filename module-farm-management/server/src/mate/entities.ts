import nanoId from 'nanoid';
import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  RelationId,
  Column,
  Index,
  BeforeInsert
} from '@deboxsoft/typeorm';
import { BaseModel } from '../BaseModel';
import { MateID, MateAttributes, MateInput, MateRecordAttributes, MateRecordInput } from './types';
import { FarmID } from '../farm/types';
import { Ring } from '../bird/types';
import { Bird } from '../bird/entities';
import { Farm } from '../farm/entities';

@Entity()
@Index(['farm', 'createdAt'])
export class Mate extends BaseModel {
  @PrimaryColumn()
  id: MateID;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  @ManyToOne(type => Bird, bird => bird.ring)
  male: Bird;

  @RelationId((mate: Mate) => mate.male)
  maleRing: Ring;

  @ManyToOne(type => Bird, bird => bird.ring)
  female: Bird;

  @RelationId((mate: Mate) => mate.female)
  femaleRing: Ring;

  @ManyToOne(type => Farm, farm => farm.id)
  farm: Farm;

  @RelationId((mate: Mate) => mate.farm)
  farmId: FarmID;

  @OneToMany(type => Bird, bird => bird.parent)
  childes: Bird[];

  @OneToMany(type => MateRecord, mateRecord => mateRecord.mate)
  records: MateRecord[];

  constructor(props?: MateAttributes) {
    super();
    if (props) {
      this.id = props.id;
      this.fromJson(props);
    }
  }

  fromJson(json?: Partial<MateInput>) {
    if (json) {
      json.maleRing && (this.maleRing = json.maleRing);
      json.femaleRing && (this.femaleRing = json.femaleRing);
      json.farmId && (this.farmId = json.farmId);
    }
  }
}

@Entity()
export class MateRecord extends BaseModel {
  @PrimaryColumn()
  id: MateID;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  @Column()
  message: string;

  @Column()
  timeRecord: number;

  @ManyToOne(type => Mate)
  mate: Mate;

  @RelationId((mateRecord: MateRecord) => mateRecord.mate)
  mateId: MateID;

  constructor(props: MateRecordAttributes) {
    super();
    if (props) {
      this.id = props.id;
    }
  }

  fromJson(json: Partial<MateRecordInput>) {
    json.message && (this.message = json.message);
    json.mateId && (this.mateId = json.mateId);
  }
}
