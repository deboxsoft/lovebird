import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  REGISTER,
  UPDATE,
  BirdMutationResponse,
  RegisterBirdVar,
  UpdateBirdVar
} from './graphql/bird.mutation';
import {
  LIST,
  CHECK_RING,
  ListBirdResponse,
  ListBirdVar,
  CheckRingResponse,
  CheckRingVar
} from './graphql/bird.query';
import { MutationHookFunction, QueryHookFunction } from './types/graphql';

export const useFormBird: MutationHookFunction<BirdMutationResponse, RegisterBirdVar, { isNew: boolean }> = (
  options = { isNew: true }
) => {
  const mutation = options.isNew ? REGISTER : UPDATE;
  return useMutation(mutation, options);
};

export const useListBird: QueryHookFunction<ListBirdResponse, ListBirdVar> = options => {
  return useQuery(LIST, options);
};

export const useCheckRing: QueryHookFunction<CheckRingResponse, CheckRingVar> = options => {
  return useQuery(CHECK_RING, options);
};
