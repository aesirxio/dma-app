import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function ButtonCopy({ content, className }) {
  const [copy, setCopy] = useState(false);

  const handleCopy = (content) => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
    navigator.clipboard.writeText(content);
  };
  return (
    <button
      onClick={() => handleCopy(content)}
      disabled={copy}
      className={`px-1 py-1 fs-12 lh-base font-opensans fw-bold btn btn-success cursor-copy ${className}`}
    >
      {!copy ? <FontAwesomeIcon icon={faCopy} width={16} height={16} /> : 'COPIED!'}
    </button>
  );
}

export default ButtonCopy;
