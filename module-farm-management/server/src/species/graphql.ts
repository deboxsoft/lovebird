import {
  connectionDefinitions,
  connectionArgs,
  ConnectionArguments,
  paginate,
  mutationDefinition
} from '@deboxsoft/graphql';
import { SpeciesID, SpeciesInterface } from '@deboxsoft/lb-module-farm-management-types';
import { Context } from '../__definition';
import { BirdManager } from '../BirdManager';

const name = 'Species';

const createContextBirdManager = (context: Context) => {
  context.birdManager = new BirdManager(context);
};

const create = mutationDefinition({
  modelName: name,
  verb: 'create',
  inputFields: `
    name: String!
  `,
  mutateAndGetPayload({ input }, context: Context) {
    createContextBirdManager(context);
    return context.birdManager.createSpecies(input);
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
    createContextBirdManager(context);
    return context.birdManager.updateSpecies(input.id, input);
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
    return context.birdManager.removeSpecies(input.id);
  }
});

const removes = mutationDefinition({
  modelName: name,
  verb: 'removeList',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload<Context>({ input }, context) {
    createContextBirdManager(context);
    return context.birdManager.removeSpecies(input.id);
  }
});

const SpeciesConnection = connectionDefinitions({
  name,
  nodeType: name
});

export const typeDef = `
  type Species {
    id: ID
    name: String
    birds${connectionArgs()}: BirdConnection
  }
  
  ${SpeciesConnection}
  ${create.typeDef}
  ${update.typeDef}
  ${remove.typeDef}
  ${removes.typeDef}
`;

export const queryDef = `
  listSpecies: [Species]
  species(id: ID!): Species
`;

export const mutationDef = `
  ${create.mutationDef}
  ${update.mutationDef}
  ${remove.mutationDef}
  ${removes.mutationDef}
`;

export const resolver: object = {
  Species: {
    birds(species: SpeciesInterface, args: ConnectionArguments, context: Context) {
      return paginate(args, pagination => context.birdManager.findBirdBySpecies(species.id, pagination), {
        type: 'Species',
        idName: 'ring'
      });
    }
  },
  Query: {
    species(root: null, { id }: { id: SpeciesID }, context: Context) {
      createContextBirdManager(context);
      return context.birdManager.getSpecies(id);
    },
    listSpecies(root: null, args: null, context: Context) {
      createContextBirdManager(context);
      return context.birdManager.listSpecies();
    }
  },
  Mutation: {
    createSpecies: create.resolver,
    updateSpecies: update.resolver,
    removeSpecies: remove.resolver,
    removeListSpecies: removes.resolver
  }
};
