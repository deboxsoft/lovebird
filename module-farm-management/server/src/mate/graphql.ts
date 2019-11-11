import {
  connectionDefinitions,
  connectionArgs,
  ConnectionArguments,
  paginate,
  mutationDefinition
} from '@deboxsoft/graphql';
import { MateID } from '@deboxsoft/lb-module-farm-management-types';
import { Context } from '../__definition';
import { Mate } from './entities';
import { BirdManager } from '../BirdManager';

const createContextBirdManager = (context: Context) => {
  context.birdManager = new BirdManager(context);
};

const name = 'Mate';

const register = mutationDefinition({
  modelName: name,
  verb: 'register',
  inputFields: `
    maleRing: String!
    femaleRing: String!
    farmId: String!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBirdManager(context);
    return context.farmManager.registerMate(input);
  }
});

const change = mutationDefinition({
  modelName: name,
  verb: 'change',
  inputFields: `
    id: ID!
    maleRing: String!
    femaleRing: String!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBirdManager(context);
    return context.farmManager.changeMate(input.id, input);
  }
});

const remove = mutationDefinition({
  modelName: name,
  verb: 'remove',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBirdManager(context);
    return context.farmManager.removeMate(input.id);
  }
});

const removes = mutationDefinition({
  modelName: name,
  verb: 'removeList',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBirdManager(context);
    return context.farmManager.removeMate(input.id);
  }
});

const MateConnection = connectionDefinitions({
  name: 'MateRecord',
  nodeType: 'MateRecord'
});

const MateRecordConnection = connectionDefinitions({
  name,
  nodeType: name
});

export const typeDef = `
  type Mate {
    id: ID!
    male: Bird
    maleRing: String
    female: Bird
    femaleRing: String
    farm: Farm
    farmId: ID
    chills${connectionArgs()}: BirdConnection
    records${connectionArgs()}: MateRecord
  }
  
   type MateRecord {
    id: ID
    ring: String
    message: String
    createdAt: TimeStamp
  }
  
  ${MateConnection}
  ${MateRecordConnection}
  ${register.typeDef}
  ${change.typeDef}
  ${remove.typeDef}
  ${removes.typeDef}
`;

export const queryDef = `
  mate(id: ID): Mate
`;

export const mutationDef = `
  ${register.mutationDef}
  ${change.mutationDef}
  ${remove.mutationDef}
  ${removes.mutationDef}
`;

export const resolver: object = {
  Mate: {
    chills(mate: Mate, args: ConnectionArguments, context: Context) {
      return paginate(args, pagination => context.birdManager.findBirdByMate(mate.id, pagination), {
        type: 'Bird'
      });
    },
    records(mate: Mate, args: ConnectionArguments, context: Context) {
      return paginate(args, pagination => context.farmManager.getRecordMate(mate.id, pagination), {
        type: 'Bird'
      });
    }
  },
  Query: {
    mate(root: null, { id }: { id: MateID }, context: Context) {
      createContextBirdManager(context);
      return context.farmManager.findMateById(id);
    }
  },
  Mutation: {
    registerMate: register.resolver,
    changeMate: change.resolver,
    removeMate: remove.resolver,
    removeListMate: removes.resolver
  }
};
