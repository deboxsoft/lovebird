import {
  connectionDefinitions,
  connectionArgs,
  paginate,
  ConnectionArguments,
  mutationDefinition
} from '@deboxsoft/graphql';
import { Context } from '../__definition';
import { BreedingID } from './types';
import { Breeding } from './entities';

const name = 'Breeding';

const create = mutationDefinition<Context>({
  modelName: name,
  verb: 'create',
  inputFields: `
    name: String!
    farmId: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { breedingManager }) {
    return breedingManager.createBreeding(input);
  }
});

const update = mutationDefinition<Context>({
  modelName: name,
  verb: 'update',
  inputFields: `
    id: ID!
    name: String!
  `,
  mutateAndGetPayload<Context>({ input }, { breedingManager }) {
    return breedingManager.updateBreeding(input.id, input);
  }
});

const remove = mutationDefinition<Context>({
  modelName: name,
  verb: 'remove',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { breedingManager }) {
    return breedingManager.removeBreeding(input.id);
  }
});

const removes = mutationDefinition<Context>({
  modelName: name,
  verb: 'removeList',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { breedingManager }) {
    return breedingManager.removeBreeding(input.id);
  }
});

const BreedingConnection = connectionDefinitions({
  name,
  nodeType: name
});

const BreedingRecordConnection = connectionDefinitions({
  name,
  nodeType: name
});

export const typeDef = `
  type Breeding {
    name: String
    farmId: ID
    farm: Farm
    records${connectionArgs()}: BreedingRecordConnection
  }
  
   type BreedingRecord {
    id: ID
    ring: String
    message: String
    createdAt: TimeStamp
  }
  
  ${BreedingConnection}
  ${BreedingRecordConnection}
  ${create.typeDef}
  ${update.typeDef}
  ${remove.typeDef}
  ${removes.typeDef}
`;

export const queryDef = `
  breeding(id: ID!): Breeding
`;

export const mutationDef = `
  ${create.mutationDef}
  ${update.mutationDef}
  ${remove.mutationDef}
  ${removes.mutationDef}
`;

export const resolver = {
  types: {
    Breeding: {
      records(breeding: Breeding, args: ConnectionArguments, { breedingManager }: Context) {
        return paginate(args, pagination => breedingManager.getRecord(breeding.id, pagination), {
          type: 'BreedingRecord'
        });
      }
    }
  },
  query: {
    breeding(root: null, { id }: { id: BreedingID }, { breedingManager }: Context) {
      throw new Error('not implementation');
    }
  },
  mutation: {
    createBreeding: create.resolver,
    updateBreeding: update.resolver,
    removeBreeding: remove.resolver,
    removeListBreeding: removes.resolver
  }
};
