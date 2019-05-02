import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import DataLoader from 'dataloader';
import { Bird, BirdRecord } from './entities';
import { Ring, BirdInput } from './types';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed } from '../error';
import { FarmID } from '../farm';
import { MateID } from '../mate';
import { SpeciesID } from '../species';

@EntityRepository()
export class BirdRepo extends AbstractRepository<Bird> {
  dataLoaderId: DataLoader<Ring, Bird | undefined>;

  create(input: BirdInput & { ring: Ring }): Promise<Bird> {
    const executeQuery = this.createQueryBuilder()
      .insert()
      .values(input)
      .execute();

    return executeQuery
      .then(result => result.raw && new Bird(result.raw))
      .catch(reason => {
        throw new CreateEntityFailed('Bird', reason);
      });
  }

  update(id: Ring, input: BirdInput): Promise<Bird> {
    const executeQuery = this.createQueryBuilder()
      .update()
      .set(input)
      .where('id = :id', { id })
      .execute();

    return executeQuery
      .then(result => {
        return result.raw && new Bird(result.raw);
      })
      .catch(reason => {
        throw new UpdateEntityFailed(id, 'Bird', reason);
      });
  }

  remove(rings: Ring | Ring[]): Promise<number> {
    const executeQuery = this.createQueryBuilder()
      .delete()
      .andWhereInIds(rings)
      .execute();

    return executeQuery
      .then(result => {
        if (result.affected) {
          return result.affected;
        }
        throw new RemoveEntityFailed(rings, 'Bird');
      })
      .catch(reason => {
        throw new RemoveEntityFailed(rings, 'Bird', reason);
      });
  }

  addRecord(ring: Ring, message: string): Promise<BirdRecord> {
    const executeQuery = this.createQueryBuilderFor(BirdRecord)
      .insert()
      .values({ ring, message })
      .execute();
    return executeQuery
      .then(result => result.raw && new BirdRecord(result.raw))
      .catch(reason => {
        throw new CreateEntityFailed('BirdRecord', reason);
      });
  }

  findByRing(ring: Ring): Promise<Bird | undefined> {
    return this.createQueryBuilder()
      .where('ring = :ring', { ring })
      .getOne();
  }

  findByFarm(farmId: FarmID, pagination?: Pagination): Promise<Bird[]> {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination);
      queryBuilder.andWhere('farmId = :farmId', { farmId });
    } else {
      queryBuilder.where('farmId = :farmId', { farmId });
    }
    return queryBuilder.getMany();
  }

  findBySpecies(speciesId: SpeciesID, pagination?: Pagination): Promise<Bird[]> {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination);
      queryBuilder.andWhere('speciesId = :speciesId', { speciesId });
    } else {
      queryBuilder.where('speciesId = :speciesId', { speciesId });
    }
    return queryBuilder.getMany();
  }

  findByMate(mateId: MateID, pagination?: Pagination): Promise<Bird[]> {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination);
      queryBuilder.andWhere('mateId = :mateId', { mateId });
    } else {
      queryBuilder.where('mateId = :mateId', { mateId });
    }
    return queryBuilder.getMany();
  }

  getRecord(ring: Ring, pagination?: Pagination): Promise<BirdRecord[]> {
    const queryBuilder = this.createQueryBuilderFor(BirdRecord);
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination);
      queryBuilder.andWhere('ring = :ring', { ring });
    } else {
      queryBuilder.where('ring = :ring', { ring });
    }
    return queryBuilder.getMany();
  }

  countByFarm(farmId: FarmID): Promise<number> {
    return this.createQueryBuilder()
      .where('FarmId = :FarmId', { farmId })
      .getCount();
  }

  countBySpecies(speciesId: SpeciesID): Promise<number> {
    return this.createQueryBuilder()
      .where('SpeciesId = :SpeciesId', { speciesId })
      .getCount();
  }

  countByMate(mateId: MateID): Promise<number> {
    return this.createQueryBuilder()
      .where('MateId = :MateId', { mateId })
      .getCount();
  }

  countRecord(ring: Ring): Promise<number> {
    return this.createQueryBuilderFor(BirdRecord)
      .where('ring = :ring', { ring })
      .getCount();
  }

  LoadId(ring: Ring): Promise<Bird | undefined> {
    return this.dataLoaderId.load(ring);
  }

  createDataLoaderId(): void {
    this.dataLoaderId = new DataLoader(rings =>
      this.createQueryBuilder()
        .whereInIds(rings)
        .getMany()
        .then(birds => rings.map(ring => birds.find(bird => bird.ring === ring)))
    );
  }

  getDataLoaderId(): DataLoader<string, Bird | undefined> {
    return this.dataLoaderId;
  }
}
