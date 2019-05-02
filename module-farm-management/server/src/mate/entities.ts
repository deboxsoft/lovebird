import nanoId from 'nanoid';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  RelationId,
  Column,
  Index,
  BeforeInsert
} from '@deboxsoft/typeorm';
import { BaseModel } from '@deboxsoft/typeorm/model/BaseModel';
import { MateID, MateAttributes, MateInput, MateRecordAttributes, MateRecordInput } from './types';
import { FarmID } from '../farm/types';
import { Ring } from '../bird/types';
import { Bird } from '../bird/entities';
import { Farm } from '../farm/entities';

@Entity()
@Index(['createAt', 'farmId'])
export class Mate extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: MateID;

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

  constructor(props?: MateAttributes) {
    super();
    if (props) {
      this.id = props.id;
      this.updateFromJson(props);
    }
  }

  updateFromJson(json?: MateInput) {
    if (json) {
      json.maleRing && (this.maleRing = json.maleRing);
      json.femaleRing && (this.femaleRing = json.femaleRing);
      json.farmId && (this.farmId = json.farmId);
    }
  }
}

@Entity()
export class MateRecord extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: MateID;

  @Column()
  message: string;

  @Column()
  timeRecord: number;

  @ManyToOne(type => Mate)
  mate: Mate;

  @RelationId((mateRecord: MateRecord) => mateRecord.mate)
  mateId: MateID;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  constructor(props: MateRecordAttributes) {
    super();
    if (props) {
      this.id = props.id;
    }
  }

  fromJson(json: MateRecordInput) {
    json.message && (this.message = json.message);
    json.mateId && (this.mateId = json.mateId);
  }
}
