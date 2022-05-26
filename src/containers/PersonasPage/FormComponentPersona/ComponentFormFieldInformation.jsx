/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Label from '../../../components/Form/Label';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';
import ComponentLinkChannels from '../../../components/ComponentLinkChannels';
import FormSelectDropdown from '../../../components/Form/FormSelectDropdown';

const optionInterest = [
  {
    value: 'design',
    label: 'Design',
    text: 'Design',
    type: 'Interests',
    size: '496,890,422',
    interest: 'Fitness and wellness > Physical fitness',
    description:
      'Aliquam quis lorem facilisis, molestie lectus sed, gravida felis. Morbi fringilla viverra magna. Cras laoreet metus sed posuere eleifend. Sed facilisis dictum',
  },
  {
    value: 'interior',
    label: 'Interior design',
    text: 'Interior design',
    type: 'Employers',
    size: '196,890,422',
    interest: 'Fitness and wellness > Physical fitness',
    description: 'Aliquam quis lorem facilisis, molestie lectus sed, gravida felis',
  },
  {
    value: 'fashion',
    label: 'Fashion design',
    text: 'Fashion design',
    type: 'Job Titles',
    // type: 'Employers',
    size: '342,890,422',
    interest: 'Fitness and wellness > Physical fitness',
    description: 'Aliquam quis lorem facilisis, molestie lectus sed, gravida felis',
  },
  {
    value: 'graphic',
    label: 'Graphic design',
    text: 'Graphic design',
    type: 'Interests',
    size: '888,890,453',
    interest: 'Fitness and wellness > Physical fitness',
    description: 'Aliquam quis lorem facilisis, molestie lectus sed, gravida felis',
  },
  {
    value: 'industrial',
    label: 'Industrial design',
    text: 'Industrial design',
    type: 'Titles Titles',
    size: '888,111,555',
    interest: 'Fitness and wellness > Physical fitness',
    description: 'Aliquam quis lorem facilisis, molestie lectus sed, gravida felis',
  },
  {
    value: 'architecture',
    label: 'Architecture design',
    text: 'Architecture design',
    type: 'Interests',
    size: '565,322,777',
    interest: 'Fitness and wellness > Physical fitness',
    description: 'Aliquam quis lorem facilisis, molestie lectus sed, gravida felis',
  },
];

const ComponentFormFieldInformation = ({ validator, formPropsData, viewModel }) => {
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
      // required: true,
      // validation: 'required',
      changed: (event) => {
        formPropsData[PERSONA_FIELD_KEY.VENDOR_RESEARCH] = event.target.value;
      },
    },
  ];
  console.log(' formPropsData[PERSONA_FIELD_KEY.CHANNELS]');
  console.log(formPropsData);

  // let fieldChannels = {
  //   label: "Channels",
  //   key: PERSONA_FIELD_KEY.CHANNELS,
  //   type: FORM_FIELD_TYPE.DROPDOWN,
  //   value:
  //     formPropsData[PERSONA_FIELD_KEY.CHANNELS] != ""
  //       ? formPropsData[PERSONA_FIELD_KEY.CHANNELS]
  //       : "",

  //   defaultValue: formPropsData["connected_channels_master_data"],
  //   required: true,
  //   validation: "required",
  //   option: formPropsData["connected_channels_master_data"],
  //   changed: (data) => {
  //     let values = data && data.map((e) => e.value);
  //     formPropsData[PERSONA_FIELD_KEY.CHANNELS] = values;
  //   },
  //   isMulti: true,
  // };

  // let fieldInterest = {
  //   label: "Interest",
  //   key: PERSONA_FIELD_KEY.INTEREST,
  //   type: FORM_FIELD_TYPE.DROPDOWN,
  //   value: formPropsData[PERSONA_FIELD_KEY.INTEREST],
  //   required: true,
  //   validation: "required",
  //   option: optionInterest,
  //   changed: (value) => {
  //     console.log("OnChange", value);
  //     formPropsData[PERSONA_FIELD_KEY.INTEREST] = value;

  //     console.log("formPropsData", formPropsData);
  //   },
  //   isMulti: true,
  //   isComponents: true,
  // };

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
