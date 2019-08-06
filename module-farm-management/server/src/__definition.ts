import { Connection } from '@deboxsoft/typeorm';
import { BirdManager } from './BirdManager';
import { BreedingManager } from './BreedingManager';
import { FarmManager } from './FarmManager';

export interface Context {
  connection: Connection;
  birdManager: BirdManager;
  breedingManager: BreedingManager;
  farmManager: FarmManager;
}
