import gql from 'graphql-tag';
import { Ring, BirdAttributes } from '@deboxsoft/lb-module-farm-management-types';

export interface CheckRingVar {
  input: {
    ring: Ring;
  };
}

export interface CheckRingResponse {
  data: BirdAttributes;
}

export interface ListBirdVar {
  input: {};
  filter?: {};
}

export interface ListBirdResponse {
  findBird: BirdAttributes[];
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
