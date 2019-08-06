import React from 'react';
import { useRegisterBird, RegisterBirdInput } from '@deboxsoft/lb-module-farm-management-client';
import { Container, FormControl, FormGroup, FormControlPlainText } from '@deboxsoft/component-webapp-react';
import {useFormApollo} from '../../hooks'

type Props = {};

export const RegisterBirdForm = ({  }: Props) => {
  const [register, { data }] = useRegisterBird({});
  const {inputs, inputChangeHandle, onSubmit} = useFormApollo<RegisterBirdInput>(register);
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <label>Ring</label>
          <FormControl onChange={inputChangeHandle} value={inputs.ring} />
        </FormGroup>
        <FormGroup>
          <label>Nama</label>
          <FormControl onChange={inputChangeHandle} value={inputs.name} />
        </FormGroup>
        <FormGroup>
          <label>Jenis Kelamin</label>
          <FormControl onChange={inputChangeHandle} value={inputs.gender} />
        </FormGroup>
        <FormGroup>
          <label>Lahir</label>
          <FormControl onChange={inputChangeHandle} value={inputs.birth} />
        </FormGroup>
        <FormGroup>
          <label>color mutation</label>
          <FormControl onChange={inputChangeHandle} value={inputs.colorMutation} />
        </FormGroup>
        <FormGroup>
          <label>Species</label>
          <FormControl onChange={inputChangeHandle} value={inputs.speciesId} />
        </FormGroup>
      </form>
    </Container>
  );
};
