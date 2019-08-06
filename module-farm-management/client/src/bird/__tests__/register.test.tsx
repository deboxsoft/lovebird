/* eslint-disable react/button-has-type */

import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useRegisterBird } from '../register';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { RegisterBirdInput, Ring } from '@deboxsoft/lb-module-farm-management-types/bird';
import { createClient } from '../../__mocks__/createClientMock';
import wait from 'waait';

const inputMock = (ring: Ring): RegisterBirdInput => ({
  ring,
  farmId: '1',
  gender: 'unsex'
});

const graphMock = [
  {
    request: {
      query: gql`
        mutation registerBird($input: BirdRegisterInput!) {
          registerBird(input: $input) {
            error {
              code
              message
              __typename
            }
            node {
              ring
              __typename
            }
            status
            __typename
          }
        }
      `,
      variables: inputMock('1')
    },
    result: {
      data: inputMock('1')
    }
  }
];

describe('register', () => {
  afterEach(() => {
    cleanup();
  });

  it('cek run tanpa error', async () => {
    const Register = () => {
      const [register] = useRegisterBird();
      const onClickHandler = () => {
        register();
      };
      return (
        <div>
          <button data-testid="register-button" onClick={onClickHandler} />
        </div>
      );
    };

    const { container } = render(
      <ApolloProvider client={createClient({ mocks: graphMock })}>
        <Register />
      </ApolloProvider>
    );
    await wait();
    const registerButton = container.querySelector<HTMLButtonElement>('button');
    registerButton && fireEvent.click(registerButton);
  });
});
