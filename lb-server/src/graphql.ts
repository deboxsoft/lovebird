import { ApolloServer, gql } from 'apollo-server-koa';
import { TimeStampDefinition, TimeStampResolver, pageInfoType } from '@deboxsoft/graphql';
import { typeDefs as FarmDefinition, resolvers as FarmResolvers } from '@deboxsoft/lb-farm-model';
import config from 'config';

type ConfigGraphql = {
  introspection?: boolean;
};

const typeDefs = gql`
  ${pageInfoType}
  ${TimeStampDefinition}
  ${FarmDefinition}
`;

const configGraphql = config.get<ConfigGraphql>('graphql');

export const apolloServer = new ApolloServer({
  resolvers: {
    TimeStamp: TimeStampResolver,
    ...FarmResolvers
  },
  typeDefs,
  introspection: configGraphql.introspection
});
