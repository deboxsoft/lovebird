import { FarmID } from '../farm/types';
import { SpeciesID } from '../species/types';
import { MateID } from '../mate/types';

export type Ring = string;
export type BirdRecordID = string;
export type Gender = 'male' | 'female' | 'unsex';
export interface BirdInput {
  name: string;
  gender: Gender;
  age?: number;
  birth: number;
  colorMutation: string;
  birthByFarmId: FarmID;
  speciesId: SpeciesID;
  parentId: MateID;
  farmId: FarmID;
}

export interface RegisterBirdInput extends BirdInput {
  ring: Ring;
}

export interface BirdAttributes extends RegisterBirdInput {
  photo?: string[];
}

export interface BirdRecordInput {
  message: string;
  ring: Ring;
}

export interface BirdRecordAttributes extends BirdRecordInput {
  id: BirdRecordID;
  timeRecord: number;
}
