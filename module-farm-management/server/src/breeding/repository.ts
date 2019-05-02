import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import DataLoader from 'dataloader';
import { Breeding, BreedingRecord } from './entities';
import { BreedingID, BreedingInput } from './types';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed } from '../error';
import { FarmID } from '../farm/types';

@EntityRepository()
export class BreedingRepo extends AbstractRepository<Breeding> {
  dataLoaderId: DataLoader<BreedingID, Breeding | undefined>;

  create(input: BreedingInput): Promise<Breeding> {
    const executeQuery = this.createQueryBuilder('breeding')
      .insert()
      .values(input)
      .execute();

    return executeQuery
      .then(result => result.raw && new Breeding(result.raw))
      .catch(reason => {
        throw new CreateEntityFailed('Breeding', reason);
      });
  }

  update(id: BreedingID, input: BreedingInput): Promise<Breeding> {
    const executeQuery = this.createQueryBuilder('breeding')
      .update()
      .set(input)
      .where('id = :id', { id })
      .execute();

    return executeQuery
      .then(result => result.raw && new Breeding(result.raw))
      .catch(reason => {
        throw new UpdateEntityFailed(id, 'Breeding', reason);
      });
  }

  remove(id: BreedingID | BreedingID): Promise<number> {
    const executeQuery = this.createQueryBuilder('breeding')
      .delete()
      .andWhereInIds(id)
      .execute();

    return executeQuery
      .then(result => {
        if (result.affected) {
          return result.affected;
        }
        throw new RemoveEntityFailed(id, 'Breeding');
      })
      .catch(reason => {
        throw new RemoveEntityFailed(id, 'Breeding', reason);
      });
  }

  addRecord(breedingId: BreedingID, message: string): Promise<BreedingRecord> {
    const executeQuery = this.createQueryBuilderFor(BreedingRecord)
      .insert()
      .values({ breedingId, message })
      .execute();
    return executeQuery
      .then(result => result.raw && new BreedingRecord(result.raw))
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
