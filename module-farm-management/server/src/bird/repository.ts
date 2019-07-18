import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import {
  Ring,
  BirdInput,
  BirdRecordInput,
  FarmID,
  MateID,
  SpeciesID,
  BirdFilterInput
} from '@deboxsoft/lb-module-farm-management-types';
import DataLoader from 'dataloader';
import { Bird, BirdRecord } from './entities';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed, DataNotFound } from '../error';

@EntityRepository(Bird)
export class BirdRepo extends AbstractRepository<Bird> {
  dataLoaderId: DataLoader<Ring, Bird | undefined>;

  async create(input: BirdInput & { ring: Ring }): Promise<Bird> {
    const bird = new Bird(input);
    return await this.repository.save(bird).catch(reason => {
      throw new CreateEntityFailed('Bird', reason);
    });
  }

  async update(ring: Ring, input: BirdInput): Promise<Bird> {
    const bird = await this.findByRing(ring);

    bird.fromJson(input);
    return this.repository.save(bird).catch(reason => {
      throw new UpdateEntityFailed(ring, 'Bird', reason);
    });
  }

  async remove(rings: Ring | Ring[]): Promise<Ring[]> {
    const bird = await this.findInRings(rings);
    return this.repository
      .remove(bird)
      .then(rows => rows.map(row => row.ring))
      .catch(reason => {
        throw new RemoveEntityFailed(rings, 'Bird', reason);
      });
  }

  find(filter: BirdFilterInput, pagination?: Pagination) {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination, { idName: 'ring' });
    }
    Object.entries(filter).forEach(([key, val], index) => {
      if (val) {
        if (queryBuilder.expressionMap.wheres.length === 0) {
          queryBuilder.where(`${key} = :${key}`, { [key]: val });
        } else {
          queryBuilder.andWhere(`${key} = :${key}`, { [key]: val });
        }
      }
    });
    return queryBuilder.getMany();
  }

  findInRings(rings: Ring | Ring[]): Promise<Bird[]> {
    return this.createQueryBuilder()
      .whereInIds(rings)
      .getMany();
  }

  async findByRing(ring: Ring): Promise<Bird> {
    const bird = await this.createQueryBuilder()
      .where('ring = :ring', { ring })
      .getOne();

    if (!bird) throw new DataNotFound('Bird', ring, ring);
    return bird;
  }

  async addRecord(input: BirdRecordInput): Promise<BirdRecord> {
    const bird = await this.findByRing(input.ring);
    const birdRecord = this.getRepositoryFor(BirdRecord).create();
    birdRecord.fromJson(input);
    bird.records.push(birdRecord);
    return this.repository
      .save(bird)
      .then(() => birdRecord)
      .catch(reason => {
        throw new CreateEntityFailed('BirdRecord', reason);
      });
  }

  findByFarm(farmId: FarmID, pagination?: Pagination): Promise<Bird[]> {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination, { idName: 'ring' });
      queryBuilder.andWhere('farmId = :farmId', { farmId });
    } else {
      queryBuilder.where('farmId = :farmId', { farmId });
    }
    return queryBuilder.getMany();
  }

  findBySpecies(speciesId: SpeciesID, pagination?: Pagination): Promise<Bird[]> {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination, { idName: 'ring' });
      queryBuilder.andWhere('speciesId = :speciesId', { speciesId });
    } else {
      queryBuilder.where('speciesId = :speciesId', { speciesId });
    }
    return queryBuilder.getMany();
  }

  findByMate(mateId: MateID, pagination?: Pagination): Promise<Bird[]> {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination, { idName: 'ring' });
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
      .where('farmId = :farmId', { farmId })
      .getCount();
  }

  countBySpecies(speciesId: SpeciesID): Promise<number> {
    return this.createQueryBuilder()
      .where('speciesId = :speciesId', { speciesId })
      .getCount();
  }

  countByMate(mateId: MateID): Promise<number> {
    return this.createQueryBuilder()
      .where('mateId = :mateId', { mateId })
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
      this.findInRings(rings).then(birds => rings.map(ring => birds.find(bird => bird.ring === ring)))
    );
  }

  getDataLoaderId(): DataLoader<string, Bird | undefined> {
    return this.dataLoaderId;
  }

  async addPhoto(ring: Ring, photo: string): Promise<Bird> {
    const bird = await this.findByRing(ring);
    bird.photo.push('photo');
    return this.repository.save(bird);
  }
}
