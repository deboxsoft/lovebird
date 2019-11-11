import React from 'react';
import { useFormBird, RegisterBirdInput } from '@deboxsoft/lb-module-farm-management-client';
import { useNavigation } from 'react-navi';
import { Button, Container } from '@deboxsoft/component-webapp-react';
import { Form } from 'react-final-form';
import FormStyles from '../../styles/form/default';
import FieldForm from '../../components/form/FieldForm';

// eslint-disable-next-line @typescript-eslint/prefer-interface
type Props = {
  initialData?: RegisterBirdInput;
};

export const BirdFormPage = ({ initialData }: Props) => {
  const isNew = !initialData;
  const navigation = useNavigation();
  const onCompleted = () => {
    navigation.navigate('', {});
  };
  const [saveBird, { loading }] = useFormBird({ isNew, onCompleted });
  const onSubmit = (values: RegisterBirdInput) => {
    saveBird({ variables: { input: Object.assign(values, { farmId: '1', speciesId: 1 }) } });
  };
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <Container>
      <FormStyles>
        <Form
          initialValues={initialData}
          onSubmit={onSubmit}
          validate={(values: RegisterBirdInput) => {
            const errors: Partial<Record<keyof RegisterBirdInput, string>> = {};
            if (!values.ring) errors.ring = 'required';
            return errors;
          }}
          render={props => {
            const { handleSubmit, pristine, submitting } = props;
            return (
              <form onSubmit={handleSubmit}>
                <FieldForm name="ring" component="input" label="Ring" />
                <FieldForm name="name" component="input" label="Nama" />
                <FieldForm name="gender" component="input" label="Jenis Kelamin" />
                <FieldForm name="birth" component="input" label="Lahir" />
                <FieldForm name="colorMutation" component="input" label="Mutasi warna" />
                <FieldForm name="speciesId" component="input" label="spesies" />
                <Button type="submit" disabled={pristine || submitting}>
                  {isNew ? 'Register' : 'Save'}
                </Button>
                <Button type="button" disabled={pristine || submitting}>
                  Reset
                </Button>
              </form>
            );
          }}
        />
      </FormStyles>
    </Container>
  );
};
