import { Ring } from '../bird';
import { FarmID } from '../farm';

export type MateID = string;
export type MateRecordID = string;
export interface MateInput {
  maleRing: Ring;
  femaleRing: Ring;
  farmId: FarmID;
}

export interface MateAttributes extends MateInput {
  id: MateID;
}

export interface MateRecordInput {
  message: string;
  mateId: MateID;
}

export interface MateRecordAttributes extends MateRecordInput {
  id: MateRecordID;
  timeRecord: number;
}
