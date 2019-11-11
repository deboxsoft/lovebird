import gql from 'graphql-tag';

export const GET = gql`
  query get($farmId: ID!) {
    farm(id: $farmId) {
      id
      name
    }
  }
`;
