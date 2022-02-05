import React from 'react';

import { withApollo } from '@lib/apollo';

import { PublicLayout } from '@templates/Layout';
import { SignUpTemplate } from '@templates/SignUpTemplate';

function SignUp() {
  return (
    <PublicLayout loading={false}>
      <SignUpTemplate />
    </PublicLayout>
  );
}

// eslint-disable-next-line import/no-default-export
export default withApollo(SignUp);
