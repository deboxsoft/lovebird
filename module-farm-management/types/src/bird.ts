import { FarmID } from './farm';
import { SpeciesID } from './species';
import { MateID } from './mate';

export type Ring = string;
export type BirdRecordID = string;
export type Gender = 'MALE' | 'FEMALE' | 'UNSEX';
export const GENDER: Record<Gender, Gender> = {
  UNSEX: 'UNSEX',
  FEMALE: 'FEMALE',
  MALE: 'MALE'
};
export type BirdStatus = 'REGISTERED' | 'VERIFIED' | 'SOLD' | 'DIED';
export const BIRD_STATUS: Record<BirdStatus, BirdStatus> = {
  REGISTERED: 'REGISTERED',
  DIED: 'DIED',
  SOLD: 'SOLD',
  VERIFIED: 'VERIFIED'
}
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
  status: BirdStatus;
}

export interface RegisterBirdInput extends BirdInput {
  ring: Ring;
}

export interface BirdAttributes extends RegisterBirdInput {
  photo?: string[];
}

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
