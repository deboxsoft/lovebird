import gql from 'graphql-tag';
import { BirdAttributes, RegisterBirdInput, BirdInput } from '@deboxsoft/lb-module-farm-management-types';

export interface BirdMutationResponse {
  node?: BirdAttributes;
}

export interface RegisterBirdVar {
  input: RegisterBirdInput;
}

export interface UpdateBirdVar {
  input: BirdInput;
}

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
