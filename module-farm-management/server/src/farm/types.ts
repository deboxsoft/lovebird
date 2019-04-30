import { Ring } from '../bird/types';

export type FarmID = string;

export interface FarmInput {
  name: string;
  rings: Ring[];
}

export interface FarmAttributes extends FarmInput {
  id: FarmID;
}
