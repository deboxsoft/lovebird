import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import {
  BreedingID,
  BreedingInput,
  BreedingRecordInput,
  FarmID
} from '@deboxsoft/lb-module-farm-management-types';
import DataLoader from 'dataloader';
import { Breeding, BreedingRecord } from './entities';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed, DataNotFound } from '../error';

@EntityRepository(Breeding)
export class BreedingRepo extends AbstractRepository<Breeding> {
  dataLoaderId: DataLoader<BreedingID, Breeding | undefined>;

  create(input: BreedingInput): Promise<Breeding> {
    const breeding = this.repository.create();
    breeding.fromJson(input);
    return this.repository.save(breeding).catch(reason => {
      throw new CreateEntityFailed('Breeding', reason);
    });
  }

  async update(id: BreedingID, input: BreedingInput): Promise<Breeding> {
    const breeding = await this.findById(id);
    if (!breeding) throw new DataNotFound('Breeding', id);
    breeding.fromJson(input);
    return this.repository.save(breeding).catch(reason => {
      throw new UpdateEntityFailed(id, 'Breeding', reason);
    });
  }

  async remove(id: BreedingID | BreedingID[]): Promise<BreedingID[]> {
    const breeding = await this.findInIds(id);
    return this.repository
      .remove(breeding)
      .then(rows => rows.map(row => row.id))
      .catch(reason => {
        throw new RemoveEntityFailed(id, 'Breeding', reason);
      });
  }

  findInIds(ids: BreedingID | BreedingID[]): Promise<Breeding[]> {
    return this.createQueryBuilder()
      .whereInIds(ids)
      .getMany();
  }

  async findById(id: BreedingID): Promise<Breeding> {
    const breeding = await this.createQueryBuilder()
      .where('id = := id', { id })
      .getOne();

    if (!breeding) throw new DataNotFound('Breeding', id);
    return breeding;
  }

  async addRecord(input: BreedingRecordInput): Promise<BreedingRecord> {
    const breeding = await this.findById(input.breedingId);
    const breedingRecord = this.getRepositoryFor(BreedingRecord).create();
    breedingRecord.fromJson(input);
    breeding.records.push(breedingRecord);
    return this.repository
      .save(breeding)
      .then(() => breedingRecord)
      .catch(reason => {
        throw new CreateEntityFailed('BreedingRecord', reason);
      });
  }

  findByFarm(farmId: FarmID, pagination?: Pagination): Promise<Breeding[]> {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination).andWhere('farmId = :farmId', { farmId });
    } else {
      queryBuilder.where('farmId = :farmId', { farmId });
    }
    return queryBuilder.getMany();
  }

  countByFarm(farmId: FarmID): Promise<number> {
    return this.createQueryBuilder()
      .where('farmId = :farmId', { farmId })
      .getCount();
  }

  getRecord(breedingId: BreedingID, pagination?: Pagination): Promise<BreedingRecord[]> {
    const queryBuilder = this.createQueryBuilderFor(BreedingRecord);
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination);
      queryBuilder.andWhere('breedingId = :breedingId', { breedingId });
    } else {
      queryBuilder.where('breedingId = :breedingId', { breedingId });
    }
    return queryBuilder.getMany();
  }

  countRecord(breedingId: BreedingID): Promise<number> {
    return this.createQueryBuilder()
      .where('breedingId = :breedingId', { breedingId })
      .getCount();
  }

  LoadId(id: BreedingID) {
    return this.dataLoaderId.load(id);
  }

  createDataLoaderId() {
    this.dataLoaderId = new DataLoader(ids =>
      this.findInIds(ids).then(breedingList =>
        ids.map(id => breedingList.find(breeding => breeding.id === id))
      )
    );
  }

  getDataLoaderId() {
    return this.dataLoaderId;
  }
}
