import { IUser } from '@dal/User';
import styled from '@emotion/styled';
import { Table } from '@molecules/Table';
import { AddUserModal } from '@organisms/AddUserModal';
import { ApolloQueryResult } from 'apollo-client';
import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';

interface IUsersManagerProps {
  users: IUser[];
  refetchUsers: () => Promise<ApolloQueryResult<unknown>>;
}

const columns = [
  { Header: 'Email', accessor: 'email' },
  { Header: 'FullName', accessor: 'fullName' },
  { Header: 'Number of Posts', accessor: 'totalPosts' },
];

export function UsersManager({ users, refetchUsers }: IUsersManagerProps): JSX.Element {
  const [showUserModal, setShowUserModal] = useState(false);

  const userModalOnCloseHandler = useCallback(() => setShowUserModal(false), [setShowUserModal]);
  const userModalOnOpenHandler = useCallback(() => setShowUserModal(true), [setShowUserModal]);

  return (
    <>
      <CustomButton variant="link" onClick={userModalOnOpenHandler}>
        Add User
      </CustomButton>

      <Table data={users} columns={columns} />

      <AddUserModal show={showUserModal} onClose={userModalOnCloseHandler} refetchUsers={refetchUsers} />
    </>
  );
}

const CustomButton = styled(Button)`
  padding: 0;
  font-size: 14px;
  line-height: 21px;
  display: block;
  text-align: left;
`;
