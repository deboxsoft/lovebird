import {
  connectionDefinitions,
  connectionArgs,
  ConnectionArguments,
  paginate,
  mutationDefinition
} from '@deboxsoft/graphql';
import { Context } from '../__definition';
import { SpeciesID, SpeciesInterface } from './types';

const name = 'Species';

const create = mutationDefinition<Context>({
  modelName: name,
  verb: 'create',
  inputFields: `
    name: String
  `,
  mutateAndGetPayload<Context>({ input }, { birdManager }) {
    return birdManager.createSpecies(input);
  }
});

const update = mutationDefinition<Context>({
  modelName: name,
  verb: 'update',
  inputFields: `
    id: ID!
    name: String
  `,
  mutateAndGetPayload<Context>({ input }, { birdManager }) {
    return birdManager.updateSpecies(input.id, input);
  }
});

const remove = mutationDefinition<Context>({
  modelName: name,
  verb: 'remove',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { birdManager }) {
    return birdManager.removeSpecies(input.id);
  }
});

const removes = mutationDefinition<Context>({
  modelName: name,
  verb: 'removeList',
  inputFields: `
    id: ID!
  `,
  mutateAndGetPayload<Context>({ input }, { birdManager }) {
    return birdManager.removeSpecies(input.id);
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
    birds${connectionArgs(['speciesId: ID!'])}: BirdConnection
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

export const resolver = {
  types: {
    Species: {
      birds(species: SpeciesInterface, args: ConnectionArguments, { birdManager }: Context) {
        return paginate(args, pagination => birdManager.findBirdBySpecies(species.id, pagination));
      }
    }
  },
  query: {
    species(root: null, { id }: { id: SpeciesID }, { birdManager }: Context) {
      return birdManager.getSpecies(id);
    },
    listSpecies(root: null, args, { birdManager }: Context) {
      return birdManager.findSpecies();
    }
  },
  mutation: {
    createSpecies: create.resolver,
    updateSpecies: update.resolver,
    removeSpecies: remove.resolver,
    removeListSpecies: removes.resolver
  }
};
