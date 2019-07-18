import { FarmID } from './farm';
import { SpeciesID } from './species';
import { MateID } from './mate';

export type Ring = string;
export type BirdRecordID = string;
export type Gender = 'male' | 'female' | 'unsex';
export interface BirdInput {
  name?: string;
  gender: Gender;
  age?: number;
  birth?: number;
  colorMutation?: string;
  birthByFarmId?: FarmID;
  speciesId?: SpeciesID;
  parentId?: MateID;
  farmId: FarmID;
}

export interface RegisterBirdInput extends BirdInput {
  ring: Ring;
}

export interface BirdAttributes extends RegisterBirdInput {
  photo?: string[];
}

export const BirdFilterInputDef = `
  speciesId: ID
  farmId: ID
`;

export interface BirdFilterInput {
  speciesId?: SpeciesID;
  farmId?: FarmID;
}

export interface BirdRecordInput {
  message: string;
  ring: Ring;
}

export interface BirdRecordAttributes extends BirdRecordInput {
  id: BirdRecordID;
  timeRecord: number;
}
