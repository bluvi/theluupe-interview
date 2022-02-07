import { useMutation } from '@apollo/react-hooks';
import { CentralizeWrapper } from '@atoms/CentralizeWrapper';
import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { UserContext } from '@atoms/UserContext';
import { IUserTokenResponse } from '@dal/UserTokenResponse';
import { SignUp } from '@lib/gql/mutations.gql';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';
import { SignIn as SignInSchema } from '@shared/validation/schemas';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

export function SignUpTemplate(): JSX.Element {
  const [signUp] = useMutation(SignUp);
  const router = useRouter();
  const { setAccessToken } = UserContext.useContainer();

  const handleSubmit = useCallback(
    async (userInput: Partial<IUserTokenResponse>) => {
      const signUpResults = await signUp({
        variables: {
          data: userInput,
        },
      });

      const {
        data: {
          signUp: { accessToken },
        },
      } = signUpResults;
      setAccessToken(accessToken);
      router.push('/');
    },
    [signUp],
  );

  return (
    <CentralizeWrapper width="550px">
      <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={SignInSchema}>
        {() => (
          <Form>
            <Row>
              <ColGroup>
                <TextField label="Email" name="email" />
              </ColGroup>
            </Row>
            <Row>
              <ColGroup>
                <TextField label="Password" name="password" type="password" />
              </ColGroup>
            </Row>
            <Row>
              <ColGroup>
                <TextField label="First name" name="firstName" />
              </ColGroup>
            </Row>
            <Row>
              <ColGroup>
                <TextField label="Last name" name="lastName" />
              </ColGroup>
            </Row>
            <SubmitButton>Sign Up</SubmitButton>
          </Form>
        )}
      </Formik>
    </CentralizeWrapper>
  );
}
