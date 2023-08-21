/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useRef, useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import './index.scss';

const ComponentTooltip = ({ children, title }) => {
  const textInput = useRef(null);

  useEffect(() => {
    if (title) {
      new Tooltip(textInput.current);
    }
  }, [title]);

  return (
    <div data-bs-toggle={title ? 'tooltip' : undefined} title={title} ref={textInput}>
      {children}
    </div>
  );
};

export default ComponentTooltip;
