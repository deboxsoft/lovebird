/* eslint-disable */
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';


interface ConfigGraphql {
  uri?: string;
}

const createLinkOnError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([createLinkOnError,
    new HttpLink({
      uri: process.env.DEBOX_APP_GRAPHQL_URI || 'localhost:3000',
      credentials: process.env.DEBOX_APP_GRAPHQL_CREDENTIALS || 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

export const uploadImageClient = new ApolloClient({
  link: ApolloLink.from([createUploadLink({
    uri: process.env.DEBOX_APP_GRAPHQL_UPLOAD_URI || 'localhost:3000',
    credentials: process.env.DEBOX_APP_GRAPHQL_UPLOAD_CREDENTIALS || 'same-origin'
  })]),
  cache: new InMemoryCache()
})
