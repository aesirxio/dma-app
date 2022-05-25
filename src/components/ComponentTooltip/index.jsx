import React, { useRef, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import './index.scss';

const ComponentTooltip = ({ children, title, placement }) => {
  const textInput = useRef(null);

  useEffect(() => {
    console.log('ComponentTooltip', textInput);
    new Tooltip(textInput.current);
  }, []);

  return (
    <div data-bs-toggle="tooltip" title={title} placement={placement} ref={textInput}>
      {children}
    </div>
  );
};

export default ComponentTooltip;
