import { GraphQLScalarType, Kind } from 'graphql';
import {
  connectionDefinitions,
  mutationDefinition,
  connectionArgs,
  ConnectionArguments,
  paginate
} from '@deboxsoft/graphql';
import { Context } from '../__definition';
import { BirdRecordInput, Ring } from './types';
import { Bird } from './entities';
import { BirdManager } from '../BirdManager';

const createContextBirdManager = (context: Context) => {
  context.birdManager = new BirdManager(context);
};

const name = 'Bird';

const register = mutationDefinition({
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
  mutateAndGetPayload({ input }, context: Context) {
    createContextBirdManager(context);
    return context.birdManager.registerBird(input.ring, input);
  }
});

const update = mutationDefinition({
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
  mutateAndGetPayload({ input }, context: Context) {
    createContextBirdManager(context);
    return context.birdManager.updateBird(input.ring, input);
  }
});

const remove = mutationDefinition({
  modelName: name,
  verb: 'remove',
  inputFields: `
    ring: Ring!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBirdManager(context);
    return context.birdManager.removeBird(input.ring);
  }
});

const removes = mutationDefinition({
  modelName: name,
  verb: 'removeList',
  inputFields: `
    ring: Ring!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBirdManager(context);
    return context.birdManager.removeBird(input.ring);
  }
});

const createBirdRecord = mutationDefinition({
  modelName: `${name}Record`,
  verb: 'create',
  inputFields: `
    ring: String!
    message: String!
  `,
  mutateAndGetPayload({ input }: { input: BirdRecordInput }, context: Context) {
    createContextBirdManager(context);
    return context.birdManager.addRecordBird(input);
  }
});

const BirdConnection = connectionDefinitions({
  name,
  nodeType: name
});

const BirdRecordConnection = connectionDefinitions({
  name: 'BirdRecord',
  nodeType: 'BirdRecord'
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
    createdAt: TimeStamp
  }
  
  ${BirdConnection}
  ${BirdRecordConnection}
  ${register.typeDef}
  ${update.typeDef}
  ${remove.typeDef}
  ${removes.typeDef}
  ${createBirdRecord.typeDef}
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
    records(bird: Bird, args: ConnectionArguments, context: Context) {
      return paginate(args, pagination => context.birdManager.getRecord(bird.ring), {
        idName: 'ring',
        type: 'Bird'
      });
    }
  },

  Query: {
    checkRing(root: null, { ring }: { ring: Ring }, context: Context) {
      createContextBirdManager(context);
      return context.birdManager.checkRing(ring);
    },

    bird(root: null, { ring }: { ring: Ring }, context: Context) {
      createContextBirdManager(context);
      return context.birdManager.checkRing(ring);
    },

    birdRecord(root: null, args: { ring: Ring } & ConnectionArguments, context: Context) {
      createContextBirdManager(context);
      return paginate(args, pagination => context.birdManager.getRecord(args.ring), { type: 'BirdRecord' });
    }
  },

  Mutation: {
    registerBird: register.resolver,
    updateBird: update.resolver,
    removeBird: remove.resolver,
    removeListBird: removes.resolver,
    createBirdRecord: createBirdRecord.resolver
  }
};
