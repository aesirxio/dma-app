import { Image } from 'aesirx-uikit';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useContentViewModel } from 'containers/ContentPage/ContentViewModels/ContentViewModelContextProvider';

const ChatGPTButton = ({ handleShow }) => {
  const { contentFormViewModel } = useContentViewModel();
  return (
    <>
      <Button
        variant="success"
        disabled={!contentFormViewModel?.chatGPTAPIKey}
        onClick={handleShow}
        className="fs-14 d-flex align-items-center text-white btn btn-success py-9px rounded-3"
      >
        <Image className="me-1" width="21" height="21" src="/assets/images/chatgpt-icon.svg" /> Chat
        GPT
      </Button>
    </>
  );
};

export default ChatGPTButton;
