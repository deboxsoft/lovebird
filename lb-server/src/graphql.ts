import { ApolloServer, gql } from 'apollo-server-koa';
import merge from 'lodash.merge';
import {
  TimeStampDefinition,
  TimeStampResolver,
  pageInfoType,
  ErrorTypeDef,
  ErrorResolver
} from '@deboxsoft/graphql';
import {
  farmManagementTypeDef,
  farmManagementQueryDef,
  farmManagementMutationDef,
  farmManagementResolver
} from '@deboxsoft/lb-module-farm-management-server/graphqlSchema';
import config from 'config';
import { getConnection } from './database';

type ConfigGraphql = {
  introspection?: boolean;
};

const typeDefs = gql`
  ${pageInfoType}
  ${TimeStampDefinition}
  ${ErrorTypeDef}
  ${farmManagementTypeDef}
  type Query {
    ${farmManagementQueryDef}
  }
  
  type Mutation {
    ${farmManagementMutationDef}
  }
`;

const configGraphql = config.get<ConfigGraphql>('graphql');
export const createApolloServer = getConnection().then(connection => {
  return new ApolloServer({
    resolvers: merge(
      {
        TimeStamp: TimeStampResolver
      },
      ErrorResolver,
      farmManagementResolver
    ),
    typeDefs,
    introspection: configGraphql.introspection,
    context: {
      connection
    }
  });
});
