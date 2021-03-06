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
import {
  MateID,
  MateAttributes,
  MateInput,
  MateRecordAttributes,
  MateRecordInput,
  FarmID,
  Ring
} from '@deboxsoft/lb-module-farm-management-types';
import { BaseModel } from '../BaseModel';
import { Bird } from '../bird';
import { Farm } from '../farm';

@Entity()
@Index(['farm', 'createdAt'])
export class Mate extends BaseModel {
  @PrimaryColumn()
  id: MateID;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  @ManyToOne(() => Bird, bird => bird.ring)
  male: Bird;

  @RelationId((mate: Mate) => mate.male)
  maleRing: Ring;

  @ManyToOne(() => Bird, bird => bird.ring)
  female: Bird;

  @RelationId((mate: Mate) => mate.female)
  femaleRing: Ring;

  @ManyToOne(() => Farm, farm => farm.id)
  farm: Farm;

  @RelationId((mate: Mate) => mate.farm)
  farmId: FarmID;

  @OneToMany(() => Bird, bird => bird.parent)
  childes: Bird[];

  @OneToMany(() => MateRecord, mateRecord => mateRecord.mate)
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

  @ManyToOne(() => Mate)
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
