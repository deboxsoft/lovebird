import { BirdManager } from './BirdManager';
import { BreedingManager } from './BreedingManager';
import { FarmManager } from './FarmManager';

export interface Context {
  birdManager: BirdManager;
  breedingManager: BreedingManager;
  farmManager: FarmManager;
}
