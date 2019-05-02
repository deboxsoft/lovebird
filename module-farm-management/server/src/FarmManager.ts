import { Connection, Pagination } from '@deboxsoft/typeorm';
import { Farm, FarmID, FarmInput, FarmRepo } from './farm';
import { Mate, MateID, MateInput, MateRepo, MateRecord } from './mate';

interface Args {
  connection: Connection;
}

export class FarmManager {
  farmRepo: FarmRepo;
  mateRepo: MateRepo;

  constructor(args: Args) {
    this.farmRepo = args.connection.getCustomRepository(FarmRepo);
    this.mateRepo = args.connection.getCustomRepository(MateRepo);
  }

  async createFarm(input: FarmInput): Promise<Farm> {
    return this.farmRepo.create(input);
  }

  updateFarm(id, attributes: FarmInput): Promise<Farm> {
    return this.farmRepo.update(id, attributes);
  }

  removeFarm(id: FarmID | FarmID[]): Promise<number> {
    return this.farmRepo.remove(id);
  }

  registerMate(input: MateInput): Promise<Mate> {
    return this.mateRepo.create(input);
  }

  changeMate(mateId: MateID, attributes: MateInput): Promise<Mate> {
    return this.mateRepo.update(mateId, attributes);
  }

  removeMate(mateId: MateID | MateID[]): Promise<number> {
    return this.mateRepo.remove(mateId);
  }

  addRecordMate(mateId: MateID, message: string): Promise<MateRecord> {
    return this.mateRepo.addRecord(mateId, message);
  }

  findFarmById(id: FarmID): Promise<Farm | undefined> {
    return this.farmRepo.findById(id);
  }

  findFarmByUser(userId: string, pagination?: Pagination): Promise<[Farm[], number]> {
    const data = this.farmRepo.findByUser(userId, pagination);
    const total = this.farmRepo.countByUser(userId);
    return Promise.all([data, total]);
  }

  findMateByFarm(farmId: FarmID, pagination?: Pagination): Promise<[Mate[], number]> {
    const data = this.mateRepo.findByFarm(farmId, pagination);
    const total = this.mateRepo.countByFarm(farmId);
    return Promise.all([data, total]);
  }

  findMateById(mateId: MateID): Promise<Mate | undefined> {
    return this.mateRepo.findById(mateId);
  }

  getRecordMate(mateId, pagination?: Pagination): Promise<[MateRecord[], number]> {
    const data = this.mateRepo.getRecord(mateId, pagination);
    const total = this.mateRepo.countRecord(mateId);
    return Promise.all([data, total]);
  }

  recordMate(mateId, message: string): Promise<MateRecord> {
    return this.mateRepo.addRecord(mateId, message);
  }
}
