export type SpeciesID = number;
export interface SpeciesInput {
  name: string;
}
export interface SpeciesAttributes extends SpeciesInput {
  id: SpeciesID;
}

export type SpeciesInterface = SpeciesAttributes;
