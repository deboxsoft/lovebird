import { Ring } from '../bird/types';
import { FarmID } from '../farm/types';
import { MateRecordID } from '../../../lb-farm-model/src/model';

export type MateID = string;
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
