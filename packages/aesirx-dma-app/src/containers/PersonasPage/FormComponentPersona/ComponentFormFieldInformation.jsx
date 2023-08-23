/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';
import Label from '../../../components/Form/Label';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

const ComponentFormFieldInformation = ({ validator, formPropsData }) => {
  let information = [
    {
      label: 'Tools',
      key: PERSONA_FIELD_KEY.TOOLS,
      type: FORM_FIELD_TYPE.INPUT,
      value: formPropsData[PERSONA_FIELD_KEY.TOOLS],
      // required: true,
      // validation: 'required',
      changed: (event) => {
        formPropsData[PERSONA_FIELD_KEY.TOOLS] = event.target.value;
      },
    },
    {
      label: 'Website',
      key: PERSONA_FIELD_KEY.WEBSITE,
      type: FORM_FIELD_TYPE.INPUT,
      value: formPropsData[PERSONA_FIELD_KEY.WEBSITE],
      // required: true,
      // validation: 'required',
      changed: (event) => {
        formPropsData[PERSONA_FIELD_KEY.WEBSITE] = event.target.value;
      },
    },
    {
      label: 'Vendor research',
      key: PERSONA_FIELD_KEY.VENDOR_RESEARCH,
      type: FORM_FIELD_TYPE.INPUT,
      value: formPropsData[PERSONA_FIELD_KEY.VENDOR_RESEARCH],
      changed: (event) => {
        formPropsData[PERSONA_FIELD_KEY.VENDOR_RESEARCH] = event.target.value;
      },
    },
  ];
  return (
    <>
      {information.map((field) => {
        return (
          <Form.Group
            key={Math.random(40, 200)}
            className={`mb-4 border-start-5 bg-white p-2 px-3 rounded-2`}
          >
            <Label text={field.label} required={field.required ?? false} />
            <Form.Control
              as="input"
              defaultValue={field.value}
              required={field.required ?? false}
              id={field.key}
              onChange={field.changed ?? undefined}
              onBlur={field.blurred ?? undefined}
              rows={5}
              className="border-0 bg-transparent"
            />

            {field.validation &&
              validator.message(field.label, field.value, field.validation, {
                className: 'text-danger',
              })}
          </Form.Group>
        );
      })}
      {/* <Form.Group
        key={Math.random(40, 200)}
        className={`mb-4 border-start-5 bg-white p-2 px-3 rounded-2`}
      >
        <Label text={"Channels"} required={true} />
        <FormSelectDropdown field={fieldChannels ? fieldChannels : null} />
        <ComponentLinkChannels viewModel={viewModel} />
      </Form.Group> */}
      {/* <Form.Group
        key={Math.random(40, 200)}
        className={`mb-4 border-start-5 bg-white p-2 px-3 rounded-2`}
      >
        <Label text={"Interest"} required={true} />
        <FormSelectDropdown field={fieldInterest} />
      </Form.Group> */}
    </>
  );
};

export default ComponentFormFieldInformation;
