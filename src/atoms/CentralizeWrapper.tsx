import styled from '@emotion/styled';
import React from 'react';

interface ICentralizeWrapper {
  width: string;
}

function CentralizeWrapper({ width, children }: React.PropsWithChildren<ICentralizeWrapper>): JSX.Element {
  return <Wrapper width={width}>{children}</Wrapper>;
}

const Wrapper = styled.div<ICentralizeWrapper>`
  ${props => `width: ${props.width}`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

export { CentralizeWrapper };
