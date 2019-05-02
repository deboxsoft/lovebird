import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import DataLoader from 'dataloader';
import { Farm } from './entities';
import { FarmID, FarmInput } from './types';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed } from '../error';

@EntityRepository()
export class FarmRepo extends AbstractRepository<Farm> {
  dataLoaderId: DataLoader<FarmID, Farm | undefined>;

  create(input: FarmInput): Promise<Farm> {
    const executeQuery = this.createQueryBuilder('farm')
      .insert()
      .values(input)
      .execute();

    return executeQuery
      .then(result => result.raw && new Farm(result.raw))
      .catch(reason => {
        throw new CreateEntityFailed('Farm', reason);
      });
  }

  update(id: FarmID, input: FarmInput): Promise<Farm> {
    const executeQuery = this.createQueryBuilder('farm')
      .update()
      .set(input)
      .where('id = :id', { id })
      .execute();

    return executeQuery
      .then(result => result.raw && new Farm(result.raw))
      .catch(reason => {
        throw new UpdateEntityFailed(id, 'Farm', reason);
      });
  }

  remove(id: FarmID | FarmID[]): Promise<number> {
    const executeQuery = this.createQueryBuilder('farm')
      .delete()
      .andWhereInIds(id)
      .execute();

    return executeQuery
      .then(result => {
        if (result.affected) {
          return result.affected;
        }
        throw new RemoveEntityFailed(id, 'Farm');
      })
      .catch(reason => {
        throw new RemoveEntityFailed(id, 'Farm', reason);
      });
  }

  findById(id: FarmID): Promise<Farm | undefined> {
    return this.createQueryBuilder()
      .where('id = := id', { id })
      .getOne();
  }

  findByUser(userId: string, pagination?: Pagination): Promise<Farm[]> {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination);
      queryBuilder.andWhere('userId = :userId', { userId });
    } else {
      queryBuilder.where('userId = :userId', { userId });
    }
    return queryBuilder.getMany();
  }

  countByUser(userId: string): Promise<number> {
    return this.createQueryBuilder()
      .where('userId = :userId', { userId })
      .getCount();
  }

  LoadId(id: FarmID) {
    return this.dataLoaderId.load(id);
  }

  createDataLoaderId() {
    this.dataLoaderId = new DataLoader(ids =>
      this.createQueryBuilder()
        .whereInIds(ids)
        .getMany()
        .then(data => ids.map(id => data.find(farm => farm.id === id)))
    );
  }

  getDataLoaderId() {
    return this.dataLoaderId;
  }
}
