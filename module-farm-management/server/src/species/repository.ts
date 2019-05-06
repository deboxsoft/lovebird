import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import DataLoader from 'dataloader';
import { Species } from './entities';
import { SpeciesID, SpeciesInput } from './types';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed, DataNotFound } from '../error';

@EntityRepository(Species)
export class SpeciesRepo extends AbstractRepository<Species> {
  dataLoaderId: DataLoader<SpeciesID, Species | undefined>;

  create(input: SpeciesInput): Promise<Species> {
    const species = this.repository.create();
    species.fromJson(input);
    return this.repository.save(species).catch(reason => {
      throw new CreateEntityFailed('Species', reason);
    });
  }

  async update(id: SpeciesID, input: SpeciesInput): Promise<Species> {
    const species = await this.findById(id);
    if (!species) throw new DataNotFound('Species', id);
    species.fromJson(input);
    return this.repository.save(species).catch(reason => {
      throw new UpdateEntityFailed(id, 'Species', reason);
    });
  }

  async remove(id: SpeciesID | SpeciesID[]): Promise<SpeciesID[]> {
    const species = await this.findInIds(id);
    return this.repository
      .remove(species)
      .then(rows => rows.map(row => row.id))
      .catch(reason => {
        throw new RemoveEntityFailed(id, 'Species', reason);
      });
  }

  findInIds(ids: SpeciesID | SpeciesID[]): Promise<Species[]> {
    return this.createQueryBuilder()
      .whereInIds(ids)
      .getMany();
  }

  findById(id: SpeciesID) {
    return this.createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  findAll(pagination?: Pagination) {
    const queryBuilder = this.createQueryBuilder();
    if (pagination) {
      paginationSelectQueryBuilder(queryBuilder, pagination);
    }
    return queryBuilder.getMany();
  }

  LoadId(id: SpeciesID) {
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
