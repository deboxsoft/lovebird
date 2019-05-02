import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import DataLoader from 'dataloader';
import { Mate, MateRecord } from './entities';
import { MateID, MateInput } from './types';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed } from '../error';
import { FarmID } from '../farm/types';

@EntityRepository()
export class MateRepo extends AbstractRepository<Mate> {
  dataLoaderId: DataLoader<MateID, Mate | undefined>;

  create(input: MateInput): Promise<Mate> {
    const executeQuery = this.createQueryBuilder('mate')
      .insert()
      .values(input)
      .execute();

    return executeQuery
      .then(result => result.raw && new Mate(result.raw))
      .catch(reason => {
        throw new CreateEntityFailed('Mate', reason);
      });
  }

  update(id: MateID, input: MateInput): Promise<Mate> {
    const executeQuery = this.createQueryBuilder('mate')
      .update()
      .set(input)
      .where('id = :id', { id })
      .execute();

    return executeQuery
      .then(result => result.raw && new Mate(result.raw))
      .catch(reason => {
        throw new UpdateEntityFailed(id, 'Mate', reason);
      });
  }

  remove(id: MateID | MateID[]): Promise<number> {
    const executeQuery = this.createQueryBuilder('mate')
      .delete()
      .andWhereInIds(id)
      .execute();

    return executeQuery
      .then(result => {
        if (result.affected) {
          return result.affected;
        }
        throw new RemoveEntityFailed(id, 'Mate');
      })
      .catch(reason => {
        throw new RemoveEntityFailed(id, 'Mate', reason);
      });
  }

  addRecord(mateId: MateID, message: string): Promise<MateRecord> {
    const executeQuery = this.createQueryBuilderFor(MateRecord)
      .insert()
      .values({ mateId, message })
      .execute();
    return executeQuery
      .then(result => result.raw && new MateRecord(result.raw))
      .catch(reason => {
        throw new CreateEntityFailed('MateRecord', reason);
      });
  }

  findById(id: MateID): Promise<Mate | undefined> {
    return this.createQueryBuilder()
      .where('id = := id', { id })
      .getOne();
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
