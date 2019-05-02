import {
  EntityRepository,
  AbstractRepository,
  paginationSelectQueryBuilder,
  Pagination
} from '@deboxsoft/typeorm';
import DataLoader from 'dataloader';
import { Species } from './entities';
import { SpeciesID, SpeciesInput } from './types';
import { CreateEntityFailed, UpdateEntityFailed, RemoveEntityFailed } from '../error';

@EntityRepository()
export class SpeciesRepo extends AbstractRepository<Species> {
  dataLoaderId: DataLoader<SpeciesID, Species | undefined>;

  create(input: SpeciesInput) {
    const executeQuery = this.createQueryBuilder('species')
      .insert()
      .values(input)
      .execute();

    return executeQuery
      .then(result => result.raw && new Species(result.raw))
      .catch(reason => {
        throw new CreateEntityFailed('Species', reason);
      });
  }

  update(id: SpeciesID, input: SpeciesInput) {
    const executeQuery = this.createQueryBuilder('species')
      .update()
      .set(input)
      .where('id = :id', { id })
      .execute();

    return executeQuery
      .then(result => result.raw && new Species(result.raw))
      .catch(reason => {
        throw new UpdateEntityFailed(id, 'Species', reason);
      });
  }

  remove(id: SpeciesID | SpeciesID[]) {
    const executeQuery = this.createQueryBuilder('species')
      .delete()
      .andWhereInIds(id)
      .execute();

    return executeQuery
      .then(result => {
        if (result.affected) {
          return result.affected;
        }
        throw new RemoveEntityFailed(id, 'Species');
      })
      .catch(reason => {
        throw new RemoveEntityFailed(id, 'Species', reason);
      });
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

  findById(id: SpeciesID) {
    return this.createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
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
