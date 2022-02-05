import styled from '@emotion/styled';
import React from 'react';

function CentralizeWrapper({ children }: React.PropsWithChildren<Record<never, never>>): JSX.Element {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 0 auto;
`;

export { CentralizeWrapper };
