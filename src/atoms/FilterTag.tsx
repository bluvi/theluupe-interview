import { Icon } from '@atoms/Icon';
import styled from '@emotion/styled';
import React from 'react';
import { Badge } from 'react-bootstrap';

type ICloseButtonProps = {
  text: string;
  onRemove: () => void;
};

function FilterTag({ text, onRemove, ...props }: ICloseButtonProps): JSX.Element {
  return (
    <div>
      <CustomBadge>
        {text}
        <CloseWrapper role="button" onClick={onRemove} tabIndex={0} {...props}>
          <Icon icon="close" size={12} color="white" />
        </CloseWrapper>
      </CustomBadge>
    </div>
  );
}

const CustomBadge = styled(Badge)`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  background-color: var(--brand-bubble);
  color: white;
`;

const CloseWrapper = styled.div`
  cursor: pointer;
`;

export { FilterTag };
