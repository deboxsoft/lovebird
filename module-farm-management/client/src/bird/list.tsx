import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo-hooks';

const BIRDLIST = gql`
  query listBird {
    bird {
      
    }
  }
`;

export const list = () => {
  return (<div> </div>)
}
