import { useMutation } from '@apollo/react-hooks';
import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { UserContext } from '@atoms/UserContext';
import { IPost } from '@dal/Post';
import { CreateOnePost, UpdateOnePost } from '@lib/gql/mutations.gql';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';
import { ModalHeader } from '@molecules/ModalHeader';
import { Post as PostSchema } from '@shared/validation/schemas';
import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export type IAddPostModalProps = {
  post?: IPost;
  show: boolean;
  onClose: () => void;
  refetchPosts: () => Promise<ApolloQueryResult<unknown>>;
};

export function UpsertPostModal({ post, show, onClose, refetchPosts }: IAddPostModalProps): JSX.Element {
  const [createOnePost] = useMutation(CreateOnePost);
  const [updateOnePost] = useMutation(UpdateOnePost);
  const initialValues = { title: post?.title, text: post?.text };
  const { userId } = UserContext.useContainer();
  const isNewPost = !post;

  const handleSubmit = useCallback(
    async (upsertPost: Partial<IPost>) => {
      if (post) {
        await updateOnePost({
          variables: {
            data: { title: { set: upsertPost.title }, text: { set: upsertPost.text } },
            where: { id: post.id },
          },
        });
      } else {
        await createOnePost({
          variables: {
            data: { ...upsertPost, author: { connect: { id: userId } } },
          },
        });
      }
      await refetchPosts();
      onClose();
    },
    [onClose, createOnePost, updateOnePost, post, userId, refetchPosts],
  );

  return (
    <Modal show={show} centered onHide={onClose}>
      <ModalHeader title={`${isNewPost ? 'Add a' : 'Update'} post`} onClose={onClose} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Row>
                <ColGroup>
                  <TextField label="Title" name="title" />
                </ColGroup>
              </Row>
              <Row>
                <ColGroup>
                  <TextField label="Text" name="text" />
                </ColGroup>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <SubmitButton>{isNewPost ? 'Add' : 'Update'}</SubmitButton>
              <Button disabled={isSubmitting} variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
