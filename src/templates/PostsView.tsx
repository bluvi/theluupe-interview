import { IPost } from '@dal/Post';
import styled from '@emotion/styled';
import { Table } from '@molecules/Table';
import React from 'react';
import { Button } from 'react-bootstrap';

type IPostsManagerProps = {
  posts: IPost[];
};

const columns = [
  { Header: 'Author', accessor: 'author.fullName' },
  { Header: 'Post', accessor: 'text' },
  { Header: 'Created at', accessor: 'createdAt' },
  { Header: 'Updated at', accessor: 'updatedAt' },
];

export function PostsView({ posts }: IPostsManagerProps): JSX.Element {
  return (
    <>
      {/* <CustomButton variant="link" onClick={userModalOnOpenHandler}>
        Add Post
      </CustomButton> */}

      <Table data={posts} columns={columns} />

      {/* <AddUserModal show={showUserModal} onClose={userModalOnCloseHandler} /> */}
    </>
  );
}

PostsView.defaultProps = {
  posts: [],
};

const CustomButton = styled(Button)`
  padding: 0;
  font-size: 14px;
  line-height: 21px;
  display: block;
  text-align: left;
`;
