/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Label from '../../../components/Form/Label';

import { FORM_FIELD_TYPE, FORMAT_DATE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

const ComponentFormFieldGCP = ({ validator, formPropsData }) => {
  let groupGCP = [
    {
      label: 'Goals',
      key: PERSONA_FIELD_KEY.GOALS,
      type: FORM_FIELD_TYPE.TEXTAREA,
      value: formPropsData[PERSONA_FIELD_KEY.GOALS],
      // required: true,
      // validation: 'required',
      changed: (event) => {
        formPropsData[PERSONA_FIELD_KEY.GOALS] = event.target.value;
      },
      className: 'border-start-5 bg-white p-2 rounded-2',
      classNameInput: 'border-0',
    },
    {
      label: 'Challenges',
      key: PERSONA_FIELD_KEY.CHALLENGES,
      type: FORM_FIELD_TYPE.TEXTAREA,
      value: formPropsData[PERSONA_FIELD_KEY.CHALLENGES],
      changed: (event) => {
        formPropsData[PERSONA_FIELD_KEY.CHALLENGES] = event.target.value;
      },
      className: 'border-start-5 bg-white p-2 rounded-2 bg-green-2 border-green',
    },
    {
      label: 'Paint point',
      key: PERSONA_FIELD_KEY.PAINT_POINT,
      type: FORM_FIELD_TYPE.TEXTAREA,
      value: formPropsData[PERSONA_FIELD_KEY.PAINT_POINT],
      changed: (event) => {
        formPropsData[PERSONA_FIELD_KEY.PAINT_POINT] = event.target.value;
      },
      className: 'border-start-5 bg-white p-2 rounded-2 bg-red-2 border-red',
    },
  ];

  return (
    <>
      {groupGCP.map((field) => {
        return (
          <Form.Group key={Math.random(40, 200)} className={`mb-4 ${field.className}`}>
            <Label text={field.label} required={field.required ?? false} />
            <Form.Control
              as="textarea"
              defaultValue={field.value}
              required={field.required ?? false}
              id={field.key}
              onChange={field.changed ?? undefined}
              onBlur={field.blurred ?? undefined}
              className="border-0 bg-transparent"
              rows={2}
            />

            {field.validation &&
              validator.message(field.label, field.value, field.validation, {
                className: 'text-danger',
              })}
          </Form.Group>
        );
      })}
    </>
  );
};

export default ComponentFormFieldGCP;
