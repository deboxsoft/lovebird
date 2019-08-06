import { Entity, PrimaryGeneratedColumn, Column } from '@deboxsoft/typeorm';
import { SpeciesAttributes, SpeciesID, SpeciesInput, SpeciesInterface } from '@deboxsoft/lb-module-farm-management-types';

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

  fromJson(json: Partial<SpeciesInput>) {
    json.name && (this.name = json.name);
  }
}
