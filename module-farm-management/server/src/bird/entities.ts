import nanoId from 'nanoid';
import {
  Entity,
  PrimaryColumn,
  Column,
  RelationId,
  OneToMany,
  ManyToOne,
  Index,
  BeforeInsert
} from '@deboxsoft/typeorm';
import {
  Ring,
  Gender,
  GENDER,
  BirdAttributes,
  BirdInput,
  BirdRecordID,
  BirdRecordInput,
  BirdRecordAttributes,
  FarmID,
  MateID,
  SpeciesID,
  BIRD_STATUS,
  BirdStatus
} from '@deboxsoft/lb-module-farm-management-types';
import moment from 'moment';
import { BaseModel } from '../BaseModel';
import { Species } from '../species';
import { Farm } from '../farm';
import { Mate } from '../mate';

const birdStatusEnum = Object.keys(BIRD_STATUS);
const genderEnum = Object.keys(GENDER);

@Entity()
@Index(['createdAt'])
export class Bird extends BaseModel implements BirdAttributes {
  @PrimaryColumn()
  ring: Ring;

  @Column({ nullable: true })
  name?: string;

  @Column('enum', { enum: genderEnum })
  gender: Gender;

  @Column('timestamp', { nullable: true })
  birth?: number;

  @Column({ nullable: true })
  colorMutation?: string;

  @Column('simple-json', { nullable: true, default: '[]' })
  photo: string[];

  @ManyToOne(() => Farm)
  birthByFarm?: Farm;

  @RelationId((bird: Bird) => {
    return bird.birthByFarm;
  })
  birthByFarmId?: FarmID;

  @ManyToOne(() => Species)
  species: Species;

  @RelationId((bird: Bird) => bird.species)
  speciesId?: SpeciesID;

  @ManyToOne(() => Mate, mate => mate.childes)
  parent: Mate;

  @RelationId((bird: Bird) => bird.parent)
  parentId?: MateID;

  @ManyToOne(() => Farm, farm => farm.birds)
  farm: Farm;

  @RelationId((bird: Bird) => bird.farm)
  farmId: FarmID;

  @OneToMany(() => BirdRecord, birdRecord => birdRecord.bird)
  records: BirdRecord[];

  @Column('enum', { enum: birdStatusEnum })
  status: BirdStatus;

  constructor(props?: BirdAttributes) {
    super();
    if (props) {
      this.ring = props.ring;
      this.fromJson(props);
    }
  }

  fromJson(json: Partial<BirdInput>) {
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

  @BeforeInsert()
  _generateId() {
    this.id = nanoId();
  }

  @Column()
  message: string;

  @Column('datetime')
  timeRecord: number;

  @ManyToOne(() => Bird)
  bird: Bird;

  @RelationId((birdRecord: BirdRecord) => birdRecord.bird)
  ring: Ring;

  constructor(props?: BirdRecordAttributes) {
    super();
    if (props) {
      this.id = this.id;
      this.timeRecord = props.timeRecord;
      this.fromJson(props);
    }
  }

  fromJson(json: Partial<BirdRecordInput>) {
    json.ring && (this.ring = json.ring);
    json.message && (this.message = json.message);
  }
}
