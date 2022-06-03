/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Label from '../../../components/Form/Label';

import { FORM_FIELD_TYPE, FORMAT_DATE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

const ComponentFormFieldBio = ({ validator, formPropsData }) => {
  let field = {
    label: 'Bio',
    key: PERSONA_FIELD_KEY.BIO,
    type: FORM_FIELD_TYPE.TEXTAREA,
    value: formPropsData[PERSONA_FIELD_KEY.BIO],
    // required: true,
    // validation: "required",
    changed: (event) => {
      formPropsData[PERSONA_FIELD_KEY.BIO] = event.target.value;
    },
  };
  return (
    <Form.Group key={Math.random(40, 200)} className="mb-4 border-start-5 bg-white p-2 rounded-2">
      <Label text={field.label} required={field.required ?? false} />
      <Form.Control
        as="textarea"
        defaultValue={field.value}
        required={field.required ?? false}
        id={field.key}
        onChange={field.changed ?? undefined}
        onBlur={field.blurred ?? undefined}
        className="border-0"
      />

      {field.validation &&
        validator.message(field.label, field.value, field.validation, {
          className: 'text-danger',
        })}
    </Form.Group>
  );
};

export default ComponentFormFieldBio;
