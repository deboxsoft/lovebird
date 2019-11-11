import gql from 'graphql-tag';
import { useMutation, MutationHookOptions, MutationTuple } from '@apollo/react-hooks';
import { RegisterBirdInput, BirdAttributes } from '@deboxsoft/lb-module-farm-management-types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MutationResponse {
  node?: BirdAttributes;
}

interface VariablesRegisterInput {
  input: RegisterBirdInput;
}

export type BirdResponse = BirdAttributes;
export interface FindBirdResponse {
  findBird: BirdResponse[];
}

export const CHECK_RING = gql`
  query checkRing($ring: Ring!) {
    checkRing(ring: $ring) {
      ring
      name
      colorMutation
      speciesId
      gender
      photo
      age
      parentId
    }
  }
`;

export const LIST = gql`
  query list($farmId: ID, $page: PaginationInput) {
    findBird(farmId: $farmId, pagination: $page) {
      ring
      name
      colorMutation
      speciesId
      parentId
    }
  }
`;

export const REGISTER = gql`
  mutation register($input: BirdRegisterInput!) {
    registerBird(input: $input) {
      node {
        ring
      }
    }
  }
`;

export const UPDATE = gql`
  mutation update($input: BirdUpdateInput!) {
    updateBird(input: $input) {
      node {
        ring
      }
    }
  }
`;

export const REMOVE = gql`
  mutation remove($input: BirdRemoveInput!) {
    removeBird(input: $input) {
      node {
        ring
      }
    }
  }
`;

export const useSaveBird: (
  isNew?: boolean,
  options?: MutationHookOptions<MutationResponse, VariablesRegisterInput>
) => MutationTuple<MutationResponse, VariablesRegisterInput> = (isNew = true, options) => {
  const gqlQuery = isNew ? REGISTER : UPDATE;
  return useMutation(gqlQuery, options);
};
