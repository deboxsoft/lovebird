import nanoId from 'nanoid';
import {
  Entity,
  PrimaryColumn,
  Column,
  RelationId,
  ManyToOne,
  Index,
  BeforeInsert
} from '@deboxsoft/typeorm';
import { BaseModel } from '@deboxsoft/typeorm/model/BaseModel';
import moment from 'moment';
import {
  Ring,
  Gender,
  BirdAttributes,
  BirdInput,
  BirdRecordID,
  BirdRecordInput,
  BirdRecordAttributes
} from './types';
import { FarmID } from '../farm/types';
import { MateID } from '../mate/types';
import { SpeciesID } from '../species/types';

import { Species } from '../species/entities';
import { Farm } from '../farm/entities';
import { Mate } from '../mate/entities';

@Entity()
@Index(['createAt'])
export class Bird extends BaseModel {
  @PrimaryColumn()
  ring: Ring;

  @Column()
  name: string;

  @Column('enum', { enum: ['male', 'female', 'unsex'] })
  gender: Gender;

  @Column()
  birth: number;

  @Column()
  colorMutation: string;

  @Column('simple-json', { nullable: true, default: '[]' })
  photo: string[];

  @ManyToOne(type => Farm)
  birthByFarm: Farm;

  @RelationId((bird: Bird) => {
    return bird.birthByFarm;
  })
  birthByFarmId: FarmID;

  @ManyToOne(type => Species)
  species: Species;

  @RelationId((bird: Bird) => bird.species)
  speciesId: SpeciesID;

  @ManyToOne(type => Mate, mate => mate.childes)
  parent: Mate;

  @RelationId((bird: Bird) => bird.parent)
  parentId: MateID;

  @ManyToOne(farm => Farm, farm => farm.birds)
  farm: Farm;

  @RelationId((bird: Bird) => bird.farm)
  farmId: FarmID;

  constructor(props?: BirdAttributes) {
    super();
    if (props) {
      this.ring = props.ring;
      this.fromJson(props);
    }
  }

  fromJson(json: BirdInput) {
    json.name && (this.name = json.name);
    json.gender && (this.gender = json.gender);
    json.colorMutation && (this.colorMutation = json.colorMutation);
    json.age && (this.age = json.age);
    json.birth && (this.birth = json.birth);
    json.birthByFarmId && (this.birthByFarmId = json.birthByFarmId);
    json.speciesId && (this.speciesId = json.speciesId);
    json.parentId && (this.parentId = json.parentId);
    json.farmId && (this.farmId = json.farmId);
  }

  get age(): number | undefined {
    if (this.birth) {
      return moment().diff(moment(this.birth), 'months');
    }
    return;
  }

  set age(value: number | undefined) {
    if (value) {
      this.birth = moment()
        .subtract(1, 'months')
        .unix();
    }
  }
}

@Entity()
export class BirdRecord extends BaseModel {
  @PrimaryColumn()
  id: BirdRecordID;

  @Column()
  message: string;

  @Column('datetime')
  timeRecord: number;

  @ManyToOne(type => Bird)
  bird: Bird;

  @RelationId((birdRecord: BirdRecord) => birdRecord.bird)
  ring: Ring;

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  constructor(props?: BirdRecordAttributes) {
    super();
    if (props) {
      this.id = this.id;
      this.timeRecord = props.timeRecord;
      this.fromJson(props);
    }
  }

  fromJson(json: BirdRecordInput) {
    json.ring && (this.ring = json.ring);
    json.message && (this.message = json.message);
  }
}
