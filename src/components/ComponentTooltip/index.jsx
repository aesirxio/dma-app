/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useRef, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import './index.scss';

const ComponentTooltip = ({ children, title, placement }) => {
  const textInput = useRef(null);

  useEffect(() => {
    new Tooltip(textInput.current);
  }, []);

  return (
    <div data-bs-toggle="tooltip" title={title} placement={placement} ref={textInput}>
      {children}
    </div>
  );
};

export default ComponentTooltip;
