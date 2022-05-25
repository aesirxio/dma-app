import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ field }) => {
  const handleChange = (e) => {
    if (field.hasOwnProperty('changed')) {
      e.target.value = e.target.value.normalize('NFKC');
      field.changed(e);
    }
  };

  return (
    <>
      <Form.Control
        as="input"
        defaultValue={field.value ?? ''}
        type={field.typeFormat ? field.typeFormat : 'text'}
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
