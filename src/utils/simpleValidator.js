import { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const useValidator = (customMessage = {}, customValidator = {}) => {
  const [show, setShow] = useState(false);
  const validator = new SimpleReactValidator({
    messages: customMessage,
    validators: customValidator,
  });

  if (show) {
    validator.showMessages();
  }

  return [validator, setShow];
};

export default useValidator;
