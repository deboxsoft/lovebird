import {
  connectionDefinitions,
  connectionArgs,
  ConnectionArguments,
  paginate,
  mutationDefinition
} from '@deboxsoft/graphql';
import { Context } from '../__definition';
import { MateID } from './types';
import { Mate } from './entities';

const name = 'Mate';

const register = mutationDefinition<Context>({
  modelName: name,
  verb: 'register',
  inputFields: `
    maleRing: String!
    femaleRing: String!
    farmId: String!
  `,
  mutateAndGetPayload<Context>({ input }, { farmManager }) {
    return farmManager.registerMate(input);
  }
});

const change = mutationDefinition<Context>({
  modelName: name,
  verb: 'change',
  inputFields: `
    id: ID!
    maleRing: String!
    femaleRing: String!
  `,
  mutateAndGetPayload<Context>({ input }, { farmManager }) {
    return farmManager.changeMate(input.id, input);
  }
});

const remove = mutationDefinition<Context>({
  modelName: name,
  verb: 'remove',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { farmManager }) {
    return farmManager.removeMate(input.id);
  }
});

const removes = mutationDefinition<Context>({
  modelName: name,
  verb: 'removeList',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { farmManager }) {
    return farmManager.removeMate(input.id);
  }
});

const MateConnection = connectionDefinitions({
  name,
  nodeType: name
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

export const resolver = {
  types: {
    Mate: {
      chills(mate: Mate, args: ConnectionArguments, { birdManager }: Context) {
        return paginate(args, pagination => birdManager.findBirdByMate(mate.id, pagination), {
          type: 'Bird'
        });
      },
      records(mate: Mate, args: ConnectionArguments, { farmManager }: Context) {
        return paginate(args, pagination => farmManager.getRecordMate(mate.id, pagination), { type: 'Bird' });
      }
    }
  },
  query: {
    mate(root: null, { id }: { id: MateID }, { farmManager }: Context) {
      return farmManager.findMateById(id);
    }
  },
  mutation: {
    registerMate: register.resolver,
    changeMate: change.resolver,
    removeMate: remove.resolver,
    removeListMate: removes.resolver
  }
};
