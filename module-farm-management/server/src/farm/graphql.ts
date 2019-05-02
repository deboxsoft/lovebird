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

const name = 'Farm';

const create = mutationDefinition<Context>({
  modelName: name,
  verb: 'create',
  inputFields: `
    name: String
  `,
  mutateAndGetPayload<Context>({ input }, { farmManager }) {
    return farmManager.createFarm(input);
  }
});

const update = mutationDefinition<Context>({
  modelName: name,
  verb: 'update',
  inputFields: `
    id: ID!
    name: String
  `,
  mutateAndGetPayload<Context>({ input }, { farmManager }) {
    return farmManager.updateFarm(input.id, input);
  }
});

const remove = mutationDefinition<Context>({
  modelName: name,
  verb: 'remove',
  multiple: false,
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { farmManager }) {
    return farmManager.removeFarm(input.id);
  }
});

const removes = mutationDefinition<Context>({
  modelName: name,
  verb: 'removeList',
  multiple: true,
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { farmManager }) {
    return farmManager.removeFarm(input.id);
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
  types: {
    Farm: {
      birds(farm: Farm, args: ConnectionArguments, { birdManager }: Context) {
        return paginate(args, pagination => birdManager.findBirdByFarm(farm.id, pagination), {
          type: 'Farm'
        });
      }
    }
  },
  query: {
    farm(root: null, { id }: { id: FarmID }, { farmManager }: Context) {
      throw new Error('not Implementation');
    }
  },
  mutation: {
    createFarm: create.resolver,
    updateFarm: update.resolver,
    removeFarm: remove.resolver,
    removeListFarm: removes.resolver
  }
};
