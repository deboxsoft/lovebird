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
import { BaseModel } from '../BaseModel';
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
@Index(['farm', 'createdAt'])
export class Breeding extends BaseModel {
  @PrimaryColumn()
  id: BreedingID;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  @Column()
  name: string;

  @ManyToOne(type => Farm)
  farm: Farm;

  @RelationId((breeding: Breeding) => breeding.farm)
  farmId: FarmID;

  @OneToMany(type => BreedingRecord, breedingRecord => breedingRecord.breeding)
  records: BreedingRecord[];

  constructor(props?: BreedingAttributes) {
    super();
    if (props) {
      this.id = props.id;
      this.fromJson(props);
    }
  }

  fromJson(json: Partial<BreedingInput>) {
    json.farmId && (this.farmId = json.farmId);
    json.name && (this.name = json.name);
  }
}

@Entity()
export class BreedingRecord extends BaseModel {
  @PrimaryColumn()
  id: BreedingRecordID;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  @Column()
  message: string;

  @Column('datetime')
  timeRecord: number;

  @ManyToOne(type => Breeding, breeding => breeding.records)
  breeding: Breeding;

  @RelationId((breedingRecord: BreedingRecord) => breedingRecord.breeding)
  breedingId: BreedingID;

  constructor(props?: BreedingRecordAttributes) {
    super();
    if (props) {
      this.id = props.id;
      this.timeRecord = props.timeRecord;
    }
  }

  fromJson(json: Partial<BreedingRecordInput>) {
    json.message && (this.message = json.message);
    json.breedingId && (this.breedingId = json.breedingId);
  }
}
