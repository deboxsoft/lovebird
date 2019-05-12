---
to: packages/lb-<%= module.toLowerCase() %>-service/src/repo/<%= h.changeCase.pascal(name) %>Repo.ts
---
import { EntityRepository, AbstractRepository, FindManyOptions } from '@deboxsoft/typeorm';
import DataLoader from 'dataloader';
import { <%= h.capitalize(name) %> } from '../model/<%= h.capitalize(name) %>';
import { <%= h.capitalize(name) %>ID, <%= h.capitalize(name) %>Input } from '@deboxsoft/lb-farm-model';
import CreateEntityFailed from '../error/CreateEntityFailed';
import UpdateEntityFailed from '../error/UpdateEntityFailed';
import RemovedEntityFailed from '../error/RemoveEntityFailed';

@EntityRepository()
export class <%= h.capitalize(name) %>Repo extends AbstractRepository<<%= h.capitalize(name) %>> {
  dataLoaderId: DataLoader<<%= h.capitalize(name) %>ID, <%= h.capitalize(name) %> | undefined>;

  create(input: <%= h.capitalize(name) %>Input): Promise<<%= h.capitalize(name) %>> {
    const executeQuery = this.createQueryBuilder('<%= name.toLowerCase() %>')
      .insert()
      .values(input)
      .execute();

    return executeQuery
      .then(result => result.raw && new <%= h.capitalize(name) %>(result.raw))
      .catch(reason => {
        throw new CreateEntityFailed('<%= h.capitalize(name) %>', reason);
      });
  }

  update(id: <%= h.capitalize(name) %>ID, input: <%= h.capitalize(name) %>Input): Promise<<%= h.capitalize(name) %>> {
    const executeQuery = this.createQueryBuilder('<%= name.toLowerCase() %>')
      .update()
      .set(input)
      .where('id = :id', { id })
      .execute();

    return executeQuery
      .then(result => result.raw && new <%= h.capitalize(name) %>(result.raw))
      .catch(reason => {
        throw new UpdateEntityFailed(id, '<%= h.capitalize(name) %>', reason);
      });
  }

  remove(id: <%= h.capitalize(name) %>ID | <%= h.capitalize(name) %>ID): Promise<number> {
    const executeQuery = this.createQueryBuilder('<%= name.toLowerCase() %>')
      .delete()
      .andWhereInIds(id)
      .execute();

    return executeQuery
      .then(result => {
        if (result.affected) {
          return result.affected;
        }
        throw new RemovedEntityFailed(id, '<%= h.capitalize(name) %>');
      })
      .catch(reason => {
        throw new RemovedEntityFailed(id, '<%= h.capitalize(name) %>', reason);
      });
  }

  find(options?: FindManyOptions<<%= h.capitalize(name) %>>): Promise<<%= h.capitalize(name) %>[]> {
    return this.repository.find(options);
  }

  LoadId(id: <%= h.capitalize(name) %>ID) {
    return this.dataLoaderId.load(id);
  }

  createDataLoaderId() {
    this.dataLoaderId = new DataLoader(ids =>
      this.find({
        where: {
          id: ids
        }
      }).then(rows => ids.map(id => rows.find(row => row.id === id)))
    );
  }

  getDataLoaderId() {
    return this.dataLoaderId;
  }
}
