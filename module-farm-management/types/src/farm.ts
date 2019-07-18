import { Ring } from './bird';

export type FarmID = string;

export interface FarmInput {
  name: string;
  rings: Ring[];
}

export interface FarmAttributes extends FarmInput {
  id: FarmID;
}
