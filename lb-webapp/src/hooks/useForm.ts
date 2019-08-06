import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { MutationFn, MutationHookOptions } from 'react-apollo-hooks';

export const useFormApollo = <VR>(onSubmitEvent?: MutationFn<object, VR>, initial?: VR) => {
  const [inputs, setInputs] = useState<VR>(initial);
  const onSubmit = (event: SyntheticEvent) => {
    if (event) {
      event.preventDefault();
    }
    onSubmitEvent && onSubmitEvent({ variables: inputs });
  };
  const inputChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInputs(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };
  return {
    onSubmit,
    inputChangeHandle,
    inputs
  };
};
