import { useMutation } from '@apollo/react-hooks';
import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { UserContext } from '@atoms/UserContext';
import { IPost } from '@dal/Post';
import { CreateOnePost } from '@lib/gql/mutations.gql';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';
import { ModalHeader } from '@molecules/ModalHeader';
import { Post as PostSchema } from '@shared/validation/schemas';
import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export type IAddPostModalProps = {
  show: boolean;
  onClose: () => void;
  refetchPosts: () => Promise<void>;
};

export function AddPostModal({ show, onClose, refetchPosts }: IAddPostModalProps): JSX.Element {
  const [createOnePost] = useMutation(CreateOnePost);
  const initialValues = {};
  const { userId } = UserContext.useContainer();

  const handleSubmit = useCallback(
    async (post: Partial<IPost>) => {
      const createResults = await createOnePost({
        variables: {
          data: { ...post, author: { connect: { id: userId } } },
        },
      });
      await refetchPosts();
      onClose();
      return createResults;
    },
    [onClose, createOnePost],
  );

  return (
    <Modal show={show} centered onHide={onClose}>
      <ModalHeader title="Add a post" onClose={onClose} />
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
              <SubmitButton>Add</SubmitButton>
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
