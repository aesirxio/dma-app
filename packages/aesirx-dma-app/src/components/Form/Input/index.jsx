/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ field }) => {
  const handleChange = (e) => {
    if (Object.prototype.hasOwnProperty.call(field, 'changed')) {
      e.target.value = e.target.value.normalize('NFKC');
      field.changed(e);
    }
  };

  return (
    <>
      <Form.Control
        as="input"
        defaultValue={field.value ?? ''}
        type={field.typeFormat ? (field.typeFormat == 11 ? 'password' : 'text') : 'text'}
        required={field.required ?? false}
        id={field.key}
        onChange={(e) => handleChange(e)}
        onPaste={field.pasted ?? undefined}
        className={`${field.classNameInput}`}
        onBlur={field.blurred ?? undefined}
        placeholder={field.placeholder ?? undefined}
        readOnly={field.readOnly}
      />
    </>
  );
};

export default Input;
