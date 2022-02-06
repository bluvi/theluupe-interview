import { useMutation } from '@apollo/react-hooks';
import { CentralizeWrapper } from '@atoms/CentralizeWrapper';
import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { UserContext } from '@atoms/UserContext';
import { IUserTokenResponse } from '@dal/UserTokenResponse';
import { SignIn } from '@lib/gql/mutations.gql';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';
import { SignIn as SignInSchema } from '@shared/validation/schemas';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

export function SignInTemplate(): JSX.Element {
  const [signIn] = useMutation(SignIn);
  const router = useRouter();
  const { setAccessToken } = UserContext.useContainer();

  const handleSubmit = useCallback(
    async (userInput: Partial<IUserTokenResponse>) => {
      const signInResults = await signIn({
        variables: {
          data: userInput,
        },
      });

      const {
        data: {
          signIn: { accessToken },
        },
      } = signInResults;
      setAccessToken(accessToken);
      router.push('/');
    },
    [signIn],
  );

  return (
    <CentralizeWrapper width="40%">
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
            <SubmitButton>Sign In</SubmitButton>
          </Form>
        )}
      </Formik>
    </CentralizeWrapper>
  );
}
