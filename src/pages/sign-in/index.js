import React from 'react';

import { withApollo } from '@lib/apollo';

import { PublicLayout } from '@templates/Layout';
import { SignInTemplate } from '@templates/SignInTemplate';

function SignIn() {
  return (
    <PublicLayout loading={false}>
      <SignInTemplate />
    </PublicLayout>
  );
}

// eslint-disable-next-line import/no-default-export
export default withApollo(SignIn);
