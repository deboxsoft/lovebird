import {
  connectionDefinitions,
  connectionArgs,
  ConnectionArguments,
  paginate,
  mutationDefinition
} from '@deboxsoft/graphql';
import { Context } from '../__definition';
import { FarmID } from './types';
import { Farm } from './entities';
import { FarmManager } from '../FarmManager';

const createContextFarmManager = (context: Context) => {
  context.farmManager = new FarmManager(context);
};

const name = 'Farm';

const create = mutationDefinition({
  modelName: name,
  verb: 'create',
  inputFields: `
    name: String!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextFarmManager(context);
    return context.farmManager.createFarm(input);
  }
});

const update = mutationDefinition({
  modelName: name,
  verb: 'update',
  inputFields: `
    id: ID!
    name: String
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextFarmManager(context);
    return context.farmManager.updateFarm(input.id, input);
  }
});

const remove = mutationDefinition({
  modelName: name,
  verb: 'remove',
  multiple: false,
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextFarmManager(context);
    return context.farmManager.removeFarm(input.id);
  }
});

const removes = mutationDefinition({
  modelName: name,
  verb: 'removeList',
  multiple: true,
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextFarmManager(context);
    return context.farmManager.removeFarm(input.id);
  }
});

const FarmConnection = connectionDefinitions({
  name,
  nodeType: name
});

export const typeDef = `
  type Farm {
    name: String
    birds${connectionArgs()}: BirdConnection
  }
  
  ${FarmConnection}
  ${create.typeDef}
  ${update.typeDef}
  ${remove.typeDef}
  ${removes.typeDef}
`;

export const queryDef = `
  farm(id: ID!): Farm
`;

export const mutationDef = `
  ${create.mutationDef}
  ${update.mutationDef}
  ${remove.mutationDef}
  ${removes.mutationDef}
`;

export const resolver = {
  Farm: {
    birds(farm: Farm, args: ConnectionArguments, { birdManager }: Context) {
      return paginate(args, pagination => birdManager.findBirdByFarm(farm.id, pagination), {
        type: 'Farm'
      });
    }
  },
  Query: {
    farm(root: null, { id }: { id: FarmID }, context: Context) {
      createContextFarmManager(context);
      throw new Error('not Implementation');
    }
  },
  Mutation: {
    createFarm: create.resolver,
    updateFarm: update.resolver,
    removeFarm: remove.resolver,
    removeListFarm: removes.resolver
  }
};
