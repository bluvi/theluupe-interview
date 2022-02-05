import { useMutation } from '@apollo/react-hooks';
import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { IUser } from '@dal/User';
import { CreateOneUser } from '@lib/gql/mutations.gql';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';
import { ModalHeader } from '@molecules/ModalHeader';
import { User as UserSchema } from '@shared/validation/schemas';
import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export type IAddUserModalProps = {
  show: boolean;
  onClose: () => void;
};

export function AddUserModal({ show, onClose }: IAddUserModalProps): JSX.Element {
  const [createOneUser] = useMutation(CreateOneUser);
  const initialValues = {};

  const handleSubmit = useCallback(
    async (user: Partial<IUser>) => {
      const createResults = await createOneUser({
        variables: {
          data: user,
        },
      });
      onClose();
      return createResults;
    },
    [onClose, createOneUser],
  );

  return (
    <Modal show={show} centered onHide={onClose}>
      <ModalHeader title="Add a user" onClose={onClose} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={UserSchema}>
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Row>
                <ColGroup>
                  <TextField label="Email" name="email" />
                </ColGroup>
              </Row>
              <Row>
                <ColGroup>
                  <TextField label="First name" name="firstName" />
                </ColGroup>
              </Row>
              <Row>
                <ColGroup>
                  <TextField label="Last name" name="lastName" />
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
