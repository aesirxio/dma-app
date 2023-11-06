import { Image, ModalComponent } from 'aesirx-uikit';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ChatGPTForm from './ChatGPTForm';
import { useContentViewModel } from 'containers/ContentPage/ContentViewModels/ContentViewModelContextProvider';

const ChatGPTButton = ({ handleImage }) => {
  const { contentFormViewModel } = useContentViewModel();
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ModalComponent
        modalClassname="modal-xl"
        closeButton
        show={showModal}
        onHide={hideModal}
        body={<ChatGPTForm handleImage={handleImage} />}
        bodyClassName="pb-3"
      />
      <Button
        variant="success"
        disabled={!contentFormViewModel?.chatGPTAPIKey}
        onClick={() => setShowModal(true)}
        className="fs-14 d-flex align-items-center text-white btn btn-success py-9px rounded-3"
      >
        <Image className="me-1" width="21" height="21" src="/assets/images/chatgpt-icon.svg" /> Chat
        GPT
      </Button>
    </>
  );
};

export default ChatGPTButton;
