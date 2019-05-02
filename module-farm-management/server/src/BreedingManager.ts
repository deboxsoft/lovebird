import { Connection, Pagination } from '@deboxsoft/typeorm';
import { Breeding, BreedingRecord, BreedingInput, BreedingRepo, BreedingID } from './breeding';

interface Args {
  connection: Connection;
}

export class BreedingManager {
  breedingRepo: BreedingRepo;

  constructor(args: Args) {
    this.breedingRepo = args.connection.getCustomRepository(BreedingRepo);
  }

  createBreeding(input: BreedingInput): Promise<Breeding> {
    return this.breedingRepo.create(input);
  }

  updateBreeding(id, input: BreedingInput): Promise<Breeding> {
    return this.breedingRepo.update(id, input);
  }

  removeBreeding(id: BreedingID): Promise<number> {
    return this.breedingRepo.remove(id);
  }

  addRecordBreeding(breedingId: BreedingID, message: string): Promise<BreedingRecord> {
    return this.breedingRepo.addRecord(breedingId, message);
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
