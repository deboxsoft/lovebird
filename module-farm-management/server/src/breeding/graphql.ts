import {
  connectionDefinitions,
  connectionArgs,
  paginate,
  ConnectionArguments,
  mutationDefinition
} from '@deboxsoft/graphql';
import { BreedingID } from '@deboxsoft/lb-module-farm-management-types';
import { Context } from '../__definition';
import { Breeding } from './entities';
import { BreedingManager } from '../BreedingManager';

const name = 'Breeding';

const createContextBreedingManager = (context: Context) => {
  context.breedingManager = new BreedingManager(context);
};

const create = mutationDefinition({
  modelName: name,
  verb: 'create',
  inputFields: `
    name: String!
    farmId: ID!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBreedingManager(context);
    return context.breedingManager.createBreeding(input);
  }
});

const update = mutationDefinition({
  modelName: name,
  verb: 'update',
  inputFields: `
    id: ID!
    name: String!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBreedingManager(context);
    return context.breedingManager.updateBreeding(input.id, input);
  }
});

const remove = mutationDefinition({
  modelName: name,
  verb: 'remove',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBreedingManager(context);
    return context.breedingManager.removeBreeding(input.id);
  }
});

const removes = mutationDefinition({
  modelName: name,
  verb: 'removeList',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBreedingManager(context);
    return context.breedingManager.removeBreeding(input.id);
  }
});

const BreedingConnection = connectionDefinitions({
  name: 'BreedingRecord',
  nodeType: 'BreedingRecord'
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
  Breeding: {
    records(breeding: Breeding, args: ConnectionArguments, context: Context) {
      return paginate(args, pagination => context.breedingManager.getRecord(breeding.id, pagination), {
        type: 'BreedingRecord'
      });
    }
  },
  Query: {
    breeding(root: null, { id }: { id: BreedingID }, context: Context) {
      createContextBreedingManager(context);
      throw new Error('not implementation');
    }
  },
  Mutation: {
    createBreeding: create.resolver,
    updateBreeding: update.resolver,
    removeBreeding: remove.resolver,
    removeListBreeding: removes.resolver
  }
};
