import React from 'react';
import { AesirXDam } from 'aesirx-dam-app';
import Modal from 'components/Modal';

function ModalDAMComponent({ show, onHide, onSelect }) {
  return (
    <Modal
      dialogClassName={'modal-fullscreen modal_digital_assets position-fixed start-0'}
      show={show}
      onHide={onHide}
      body={<AesirXDam onSelect={onSelect} />}
    />
  );
}

export default ModalDAMComponent;
