import gql from 'graphql-tag';

export const LIST = gql`
  query list {
    listSpecies {
      id
      name
    }
  }
`;

export const CREATE = gql`
  mutation create($input: SpeciesCreateInput!) {
    createSpecies(input: $input) {
      node {
        id
        name
      }
    }
  }
`;

export const UPDATE = gql`
  mutation update($input: SpeciesUpdateInput!) {
    updateSpecies(input: $input) {
      node {
        id
        name
      }
    }
  }
`;

export const REMOVE = gql`
  mutation remove($input: SpeciesRemoveInput!) {
    removeSpecies(input: $input) {
      node {
        id
      }
    }
  }
`;

export const REMOVE_LIST = gql`
  mutation removeList($input: SpeciesRemoveListInput!) {
    removeListSpecies(input: $input) {
      node {
        id
      }
    }
  }
`;
