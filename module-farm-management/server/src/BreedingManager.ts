import { Context } from './__definition';
import { Pagination } from '@deboxsoft/typeorm';
import {
  Breeding,
  BreedingRecord,
  BreedingInput,
  BreedingRepo,
  BreedingID,
  BreedingRecordInput
} from './breeding';

export class BreedingManager {
  breedingRepo: BreedingRepo;

  constructor(context: Context) {
    this.breedingRepo = context.connection.getCustomRepository(BreedingRepo);
  }

  createBreeding(input: BreedingInput): Promise<Breeding> {
    return this.breedingRepo.create(input);
  }

  updateBreeding(id, input: BreedingInput): Promise<Breeding> {
    return this.breedingRepo.update(id, input);
  }

  removeBreeding(id: BreedingID): Promise<BreedingID[]> {
    return this.breedingRepo.remove(id);
  }

  addRecordBreeding(input: BreedingRecordInput): Promise<BreedingRecord> {
    return this.breedingRepo.addRecord(input);
  }

  findBreedingByFarm(farmId, pagination?: Pagination): Promise<[Breeding[], number]> {
    const data = this.breedingRepo.findByFarm(farmId, pagination);
    const total = this.breedingRepo.countByFarm(farmId);
    return Promise.all([data, total]);
  }

  getRecord(breedingId, pagination?: Pagination): Promise<[BreedingRecord[], number]> {
    const data = this.breedingRepo.getRecord(breedingId, pagination);
    const total = this.breedingRepo.countRecord(breedingId);
    return Promise.all([data, total]);
  }
}
