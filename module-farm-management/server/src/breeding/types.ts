import { FarmID } from '../farm/types';

export type BreedingID = string;
export type BreedingRecordID = string;
export interface BreedingInput {
  name: string;
  farmId: FarmID;
}
export interface BreedingAttributes extends BreedingInput {
  id: BreedingID;
  recordsId: BreedingRecordID[];
}

export interface BreedingRecordInput {
  message: string;
  breedingId: BreedingID;
}

export interface BreedingRecordAttributes extends BreedingRecordInput {
  id: BreedingRecordID;
  timeRecord: number;
}
