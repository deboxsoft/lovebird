import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import DataLoader from 'dataloader';
import { Farm } from './entities';
import { FarmID, FarmInput } from './types';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed, DataNotFound } from '../error';

@EntityRepository(Farm)
export class FarmRepo extends AbstractRepository<Farm> {
  dataLoaderId: DataLoader<FarmID, Farm | undefined>;

  create(input: FarmInput): Promise<Farm> {
    const farm = this.repository.create();
    farm.fromJson(input);
    return this.repository.save(farm).catch(reason => {
      throw new CreateEntityFailed('Farm', reason);
    });
  }

  async update(id: FarmID, input: FarmInput): Promise<Farm> {
    const farm = await this.findById(id);

    farm.fromJson(input);
    return this.repository.save(farm).catch(reason => {
      throw new UpdateEntityFailed(id, 'Farm', reason);
    });
  }

  async remove(id: FarmID | FarmID[]): Promise<FarmID[]> {
    const farm = await this.findInIds(id);
    return this.repository
      .remove(farm)
      .then(rows => rows.map(row => row.id))
      .catch(reason => {
        throw new RemoveEntityFailed(id, 'Farm', reason);
      });
  }

  findInIds(ids: FarmID | FarmID[]): Promise<Farm[]> {
    return this.createQueryBuilder()
      .whereInIds(ids)
      .getMany();
  }

  async findById(id: FarmID): Promise<Farm> {
    const farm = await this.createQueryBuilder()
      .where('id = := id', { id })
      .getOne();

    if (!farm) throw new DataNotFound('Farm', id);
    return farm;
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
      this.findInIds(ids).then(data => ids.map(id => data.find(farm => farm.id === id)))
    );
  }

  getDataLoaderId() {
    return this.dataLoaderId;
  }
}
