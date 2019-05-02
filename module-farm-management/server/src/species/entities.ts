import { Entity, PrimaryGeneratedColumn, Column } from '@deboxsoft/typeorm';
import { SpeciesAttributes, SpeciesID, SpeciesInput, SpeciesInterface } from './types';

@Entity()
export class Species implements SpeciesInterface {
  @PrimaryGeneratedColumn('increment')
  id: SpeciesID;

  @Column()
  name: string;

  constructor(props?: SpeciesAttributes) {
    if (props) {
      this.id = props.id;
      this.fromJson(props);
    }
  }

  fromJson(json: SpeciesInput) {
    json.name && (this.name = json.name);
  }
}
