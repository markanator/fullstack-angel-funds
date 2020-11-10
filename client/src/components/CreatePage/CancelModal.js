/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@windmill/react-ui';

export default function CancelModal({
  isModalOpen,
  closeModal,
  headerText,
  bodyText,
}) {
  const history = useHistory();

  const handleCancel = () => {
    console.log('User wants to stop...');
    history.push('/dashboard');
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>{headerText}</ModalHeader>
      <ModalBody>{bodyText}</ModalBody>
      <ModalFooter>
        <Button
          className="w-full sm:w-auto"
          layout="outline"
          onClick={closeModal}
        >
          Cancel
        </Button>
        {/* Insert Action */}
        <Button className="w-full sm:w-auto bg-red-600" onClick={handleCancel}>
          Discard Work
        </Button>
      </ModalFooter>
    </Modal>
  );
}
