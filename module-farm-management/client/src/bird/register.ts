import gql from 'graphql-tag';
import { useMutation, MutationHookOptions, MutationFn, MutationResult } from 'react-apollo-hooks';
import { BirdInput, RegisterBirdInput } from '@deboxsoft/lb-module-farm-management-types/bird';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RegisterResponse extends RegisterBirdInput {}

export const REGISTER = gql`
  mutation registerBird($input: BirdRegisterInput!) {
    registerBird(input: $input) {
      error {
        code
        message
      }
      node {
        ring
      }
      status
    }
  }
`;

export const useRegisterBird = (
  options?: MutationHookOptions<RegisterResponse, RegisterBirdInput>
): [MutationFn<RegisterResponse, RegisterBirdInput>, MutationResult<RegisterResponse>] => {
  return useMutation(REGISTER, options);
};
