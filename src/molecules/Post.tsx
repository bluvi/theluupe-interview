import { useMutation } from '@apollo/react-hooks';
import { Icon } from '@atoms/Icon';
import { UserContext } from '@atoms/UserContext';
import { IPost } from '@dal/Post';
import styled from '@emotion/styled';
import { DeleteOnePost } from '@lib/gql/mutations.gql';
import { DeleteModal } from '@organisms/DeleteModal';
import React, { useCallback, useState } from 'react';

interface IPostProps {
  post: IPost;
  refetchPosts: () => Promise<void>;
}

export function Post({ post, refetchPosts }: IPostProps): JSX.Element {
  const [deleteOnePost, { loading }] = useMutation(DeleteOnePost);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const { userId } = UserContext.useContainer();
  const canManagePost = userId === post.author.id;

  const deletePostModalOnCloseHandler = useCallback(() => setShowDeletePostModal(false), [setShowDeletePostModal]);
  const deletePostModalOnOpenHandler = useCallback(() => setShowDeletePostModal(true), [setShowDeletePostModal]);

  const handleDelete = useCallback(async () => {
    const deleteResults = await deleteOnePost({
      variables: {
        data: { id: post.id },
      },
    });
    await refetchPosts();
    deletePostModalOnCloseHandler();
    return deleteResults;
  }, [refetchPosts, deleteOnePost, deletePostModalOnCloseHandler, post.id]);

  return (
    <div key={post.id}>
      <TitleContainer>
        <h3>{post.title}</h3>
        <ActionIcon disabled={!canManagePost} role="button" onClick={() => {}}>
          <Icon icon="edit" size={18} />
        </ActionIcon>
        <ActionIcon disabled={!canManagePost} role="button" onClick={deletePostModalOnOpenHandler}>
          <Icon icon="trash" size={18} />
        </ActionIcon>
      </TitleContainer>
      <p>{`By ${post.author.fullName}`}</p>
      <p>{formatDateTime(post.createdAt)}</p>
      <p>{post.text}</p>
      <DeleteModal
        text={post.title}
        show={showDeletePostModal}
        isLoading={loading}
        onClose={deletePostModalOnCloseHandler}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function formatDateTime(stringDate: string) {
  const fullDate = new Date(stringDate);
  const [date, time] = fullDate.toISOString().split('T');
  const splittedDate = date.split('-');
  const formattedDate = [splittedDate[1], splittedDate[2], splittedDate[0]].join('/');

  const formattedTime = time.split('.')[0];

  return `${formattedDate} ${formattedTime}`;
}

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface IActionIconProps {
  disabled: boolean;
}

const ActionIcon = styled.div<IActionIconProps>`
  margin-left: 12px;
  cursor: pointer;
  svg {
    color: var(--brand-bubble);
  }
  ${({ disabled }) =>
    disabled &&
    `
    svg {
      opacity: 0.5;
      color: var(--brand-bubble-100);
    }
    pointer-events: none;
  `}
`;
