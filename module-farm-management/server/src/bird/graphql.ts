import { GraphQLScalarType, Kind } from 'graphql';
import {
  connectionDefinitions,
  mutationDefinition,
  connectionArgs,
  ConnectionArguments,
  paginate
} from '@deboxsoft/graphql';
import { Context } from '../__definition';
import { Ring } from './types';
import { Bird } from './entities';

const name = 'Bird';

const register = mutationDefinition<Context>({
  modelName: name,
  verb: 'register',
  inputFields: `
    age: Int
    birth: TimeStamp
    colorMutation: String
    farmId: ID!
    name: String
    parentId: ID
    ring: Ring!
    speciesId: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { birdManager }) {
    return birdManager.registerBird(input.ring, input);
  }
});

const update = mutationDefinition<Context>({
  modelName: name,
  verb: 'update',
  inputFields: `
    age: Int
    birth: TimeStamp
    colorMutation: String
    farmId: ID
    name: String
    parentId: ID
    ring: Ring!
    speciesId: ID
  `,
  mutateAndGetPayload<Context>({ input }, { birdManager }) {
    return birdManager.updateBird(input.ring, input);
  }
});

const remove = mutationDefinition<Context>({
  modelName: name,
  verb: 'remove',
  inputFields: `
    ring: Ring!
  `,
  mutateAndGetPayload<Context>({ input }, { birdManager }) {
    return birdManager.removeBird(input.ring);
  }
});

const removes = mutationDefinition<Context>({
  modelName: name,
  verb: 'removeList',
  inputFields: `
    ring: Ring!
  `,
  mutateAndGetPayload<Context>({ input }, { birdManager }) {
    return birdManager.removeBird(input.ring);
  }
});

const createBirdRecord = mutationDefinition<Context>({
  modelName: `${name}Record`,
  verb: 'create',
  inputFields: `
    ring: String!
    message: String!
  `,
  mutateAndGetPayload<Context>({ input }, { birdManager }) {
    return birdManager.record(input.ring, input.message);
  }
});

const BirdRecordConnection = connectionDefinitions({
  name,
  nodeType: name
});

const BirdConnection = connectionDefinitions({
  name,
  nodeType: name
});

export const typeDef = `
  enum Gender {
    UNSEX
    MALE
    FEMALE
  }
  
  scalar Ring
  
  type Bird {
    ring: Ring
    speciesId: ID
    species: Species
    colorMutation: String
    name: String
    gender: Gender
    parentId: ID
    parent: Mate
    age: Int
    birth: Int
    photo: String
    records${connectionArgs()}: BirdRecord
  }
  
  type BirdRecord {
    id: ID
    ring: String
    message: String
    timeRecord: TimeStamp
  }
  
  ${BirdConnection}
  ${register.typeDef}
  ${update.typeDef}
  ${remove.typeDef}
  ${removes.typeDef}
  ${createBirdRecord.typeDef}
  ${BirdRecordConnection}
`;

export const queryDef = `
  checkRing(ring: Ring!): Bird
  bird(ring: Ring!): Bird
  birdRecord(ring: Ring!): [BirdRecord]
`;

export const mutationDef = `
  ${register.mutationDef}
  ${update.mutationDef}
  ${remove.mutationDef}
  ${removes.mutationDef}
  ${createBirdRecord.mutationDef}
`;

export const resolver = {
  types: {
    Ring() {
      new GraphQLScalarType({
        name: 'Ring',
        description: 'ring bird',
        parseValue: value => String(value),
        serialize: value => String(value),
        parseLiteral: ast => {
          return ast.kind === Kind.STRING ? String(ast.value) : null;
        }
      });
    },
    Bird: {
      records(bird: Bird, args: ConnectionArguments, { birdManager }: Context) {
        return paginate(args, pagination => birdManager.getRecordBird(bird.ring));
      }
    }
  },
  query: {
    checkRing(root: null, { ring }: { ring: Ring }, { birdManager }: Context) {
      return birdManager.checkRing(ring);
    },
    bird(root: null, { ring }: { ring: Ring }, { birdManager }: Context) {
      return birdManager.checkRing(ring);
    },
    birdRecord(root: null, { ring }: { ring: Ring }, { birdManager }: Context) {
      return birdManager.getRecordBird(ring);
    }
  },
  mutation: {
    registerBird: register.resolver,
    updateBird: update.resolver,
    removeBird: remove.resolver,
    removeListBird: removes.resolver,
    createBirdRecord: createBirdRecord.resolver
  }
};
