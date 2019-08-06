import merge from 'lodash.merge';
import * as birdGraphql from './bird/graphql';
import * as breedingGraphql from './breeding/graphql';
import * as farmGraphql from './farm/graphql';
import * as mateGraphql from './mate/graphql';
import * as speciesGraphql from './species/graphql';

export const farmManagementTypeDef = `
  ${birdGraphql.typeDef}
  ${breedingGraphql.typeDef}
  ${farmGraphql.typeDef}
  ${mateGraphql.typeDef}
  ${speciesGraphql.typeDef}
`;

export const farmManagementQueryDef = `
  ${birdGraphql.queryDef}
  ${breedingGraphql.queryDef}
  ${farmGraphql.queryDef}
  ${mateGraphql.queryDef}
  ${speciesGraphql.queryDef}
`;

export const farmManagementMutationDef = `
  ${birdGraphql.mutationDef}
  ${breedingGraphql.mutationDef}
  ${farmGraphql.mutationDef}
  ${mateGraphql.mutationDef}
  ${speciesGraphql.mutationDef}
`;

export const farmManagementResolver = merge(
  birdGraphql.resolver,
  breedingGraphql.resolver,
  farmGraphql.resolver,
  mateGraphql.resolver,
  speciesGraphql.resolver
);
