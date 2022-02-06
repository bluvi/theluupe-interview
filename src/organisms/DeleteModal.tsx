import { WithOptional } from '@lib/util/types';
import { ModalHeader } from '@molecules/ModalHeader';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export type IDeleteModalProps = {
  text?: string;
  show: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customText?: string;
  buttonText?: string;
};

export type IDeleteModalPropsOptText = WithOptional<IDeleteModalProps, 'text'>;

export function DeleteModal({
  text,
  show,
  isLoading,
  onConfirm,
  onClose,
  customText,
  buttonText,
}: IDeleteModalProps): JSX.Element {
  return (
    <Modal show={show} centered onHide={onClose}>
      <ModalHeader as="h4" title="Are you sure?" onClose={onClose} />
      <Modal.Body>{customText || `Are you sure you want to delete ${text || ''}? This cannot be undone.`}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {buttonText || (isLoading ? `Deleting...` : `Yes, delete ${text || ''}`)}
        </Button>
        <Button disabled={isLoading} variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
