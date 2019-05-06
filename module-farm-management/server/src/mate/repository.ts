import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import DataLoader from 'dataloader';
import { Mate, MateRecord } from './entities';
import { MateID, MateInput, MateRecordInput } from './types';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed, DataNotFound } from '../error';
import { FarmID } from '../farm/types';

@EntityRepository(Mate)
export class MateRepo extends AbstractRepository<Mate> {
  dataLoaderId: DataLoader<MateID, Mate | undefined>;

  create(input: MateInput): Promise<Mate> {
    const mate = this.repository.create();
    mate.fromJson(input);
    return this.repository.save(mate).catch(reason => {
      throw new CreateEntityFailed('Mate', reason);
    });
  }

  async update(id: MateID, input: MateInput): Promise<Mate> {
    const mate = await this.findById(id);

    mate.fromJson(input);
    return this.repository.save(mate).catch(reason => {
      throw new UpdateEntityFailed(id, 'Farm', reason);
    });
  }

  async remove(id: MateID | MateID[]): Promise<MateID[]> {
    const mate = await this.findInIds(id);
    return this.repository
      .remove(mate)
      .then(rows => rows.map(row => row.id))
      .catch(reason => {
        throw new RemoveEntityFailed(id, 'Mate', reason);
      });
  }

  findInIds(ids: MateID | MateID[]): Promise<Mate[]> {
    return this.createQueryBuilder()
      .whereInIds(ids)
      .getMany();
  }

  async findById(id: MateID): Promise<Mate> {
    const mate = await this.createQueryBuilder()
      .where('id = := id', { id })
      .getOne();

    if (!mate) throw new DataNotFound('Mate', id);
    return mate;
  }

  async addRecord(input: MateRecordInput): Promise<MateRecord> {
    const mate = await this.findById(input.mateId);
    const mateRecord = this.getRepositoryFor(MateRecord).create();
    mateRecord.fromJson(input);
    mate.records.push(mateRecord);
    return this.repository
      .save(mate)
      .then(() => mateRecord)
      .catch(reason => {
        throw new CreateEntityFailed('MateRecord', reason);
      });
  }

  findByFarm(farmId: FarmID, pagination?: Pagination): Promise<Mate[]> {
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

  getRecord(mateId: MateID, pagination?: Pagination): Promise<MateRecord[]> {
    const queryBuilder = this.createQueryBuilderFor(MateRecord);
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination);
      queryBuilder.andWhere('mateId = :mateId', { mateId });
    } else {
      queryBuilder.where('mateId = :mateId', { mateId });
    }
    return queryBuilder.getMany();
  }

  countRecord(mateId: MateID): Promise<number> {
    return this.createQueryBuilder()
      .where('mateId = :mateId', { mateId })
      .getCount();
  }

  LoadId(id: MateID) {
    return this.dataLoaderId.load(id);
  }

  createDataLoaderId() {
    this.dataLoaderId = new DataLoader(ids =>
      this.createQueryBuilder()
        .whereInIds(ids)
        .getMany()
        .then(breedingList => ids.map(id => breedingList.find(breeding => breeding.id === id)))
    );
  }

  getDataLoaderId() {
    return this.dataLoaderId;
  }
}
