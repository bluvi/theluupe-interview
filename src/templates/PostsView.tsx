import { CentralizeWrapper } from '@atoms/CentralizeWrapper';
import { UserContext } from '@atoms/UserContext';
import { IPost } from '@dal/Post';
import styled from '@emotion/styled';
import { Post } from '@molecules/Post';
import { AddPostModal } from '@organisms/AddPostModal';
import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';

type IPostsManagerProps = {
  posts: IPost[];
  refetchPosts: () => Promise<void>;
};

export function PostsView({ posts, refetchPosts }: IPostsManagerProps): JSX.Element {
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const { userId } = UserContext.useContainer();
  const isAuthenticated = !!userId;

  const newPostModalOnCloseHandler = useCallback(() => setShowNewPostModal(false), [setShowNewPostModal]);
  const newPostModalOnOpenHandler = useCallback(() => setShowNewPostModal(true), [setShowNewPostModal]);

  return (
    <CentralizeWrapper width="60%">
      {isAuthenticated && (
        <CustomButton variant="link" onClick={newPostModalOnOpenHandler}>
          Add Post
        </CustomButton>
      )}

      {posts.map(post => (
        <Post key={post.id} post={post} refetchPosts={refetchPosts} />
      ))}

      <AddPostModal show={showNewPostModal} onClose={newPostModalOnCloseHandler} refetchPosts={refetchPosts} />
    </CentralizeWrapper>
  );
}

const CustomButton = styled(Button)`
  padding: 0;
  font-size: 14px;
  line-height: 21px;
  display: block;
  text-align: left;
`;
