import nanoId from 'nanoid';
import {
  Entity,
  PrimaryColumn,
  Column,
  RelationId,
  ManyToOne,
  OneToMany,
  Index,
  BeforeInsert
} from '@deboxsoft/typeorm';
import { BaseModel } from '@deboxsoft/typeorm/model/BaseModel';
import {
  BreedingRecordID,
  BreedingID,
  BreedingAttributes,
  BreedingInput,
  BreedingRecordAttributes,
  BreedingRecordInput
} from './types';
import { FarmID } from '../farm/types';
import { Farm } from '../farm/entities';

@Entity()
@Index(['createAt', 'farmId'])
export class Breeding extends BaseModel {
  @PrimaryColumn()
  id: BreedingID;

  @Column()
  name: string;

  @OneToMany(type => BreedingRecord, breedingRecord => breedingRecord.breedingId)
  records: BreedingRecord[];

  @RelationId((breeding: Breeding) => breeding.records)
  recordsId: BreedingRecordID[];

  @ManyToOne(type => Farm)
  farm: Farm;

  @RelationId((breeding: Breeding) => breeding.farm)
  farmId: FarmID;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  constructor(props?: BreedingAttributes) {
    super();
    if (props) {
      this.id = props.id;
      this.fromJson(props);
    }
  }

  fromJson(json: BreedingInput) {
    json.farmId && (this.farmId = json.farmId);
    json.name && (this.name = json.name);
  }
}

@Entity()
export class BreedingRecord extends BaseModel {
  @PrimaryColumn()
  id: BreedingRecordID;

  @Column()
  message: string;

  @Column('datetime')
  timeRecord: number;

  @ManyToOne(type => Breeding, breeding => breeding.records)
  breeding: Breeding;

  @RelationId((breedingRecord: BreedingRecord) => breedingRecord.breeding)
  breedingId: BreedingID;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  constructor(props?: BreedingRecordAttributes) {
    super();
    if (props) {
      this.id = props.id;
      this.timeRecord = props.timeRecord;
    }
  }

  fromJson(json: BreedingRecordInput) {
    json.message && (this.message = json.message);
    json.breedingId && (this.breedingId = json.breedingId);
  }
}
