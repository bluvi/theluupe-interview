import { CentralizeWrapper } from '@atoms/CentralizeWrapper';
import { UserContext } from '@atoms/UserContext';
import { IPost } from '@dal/Post';
import styled from '@emotion/styled';
import { Post } from '@molecules/Post';
import { UpsertPostModal } from '@organisms/UpsertPostModal';
import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';

type IPostsManagerProps = {
  posts: IPost[];
  refetchPosts: () => Promise<void>;
};

export function PostsView({ posts, refetchPosts }: IPostsManagerProps): JSX.Element {
  const [showUpsertPostModal, setShowUpsertPostModal] = useState(false);
  const { userId } = UserContext.useContainer();
  const isAuthenticated = !!userId;

  const upsertPostModalOnCloseHandler = useCallback(() => setShowUpsertPostModal(false), [setShowUpsertPostModal]);
  const upsertPostModalOnOpenHandler = useCallback(() => setShowUpsertPostModal(true), [setShowUpsertPostModal]);

  return (
    <CentralizeWrapper width="60%">
      {isAuthenticated && (
        <CustomButton variant="link" onClick={upsertPostModalOnOpenHandler}>
          Add Post
        </CustomButton>
      )}

      {posts.map(post => (
        <Post key={post.id} post={post} refetchPosts={refetchPosts} />
      ))}

      <UpsertPostModal show={showUpsertPostModal} onClose={upsertPostModalOnCloseHandler} refetchPosts={refetchPosts} />
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
