/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import { renderingGroupFieldHandler } from '../../../utils/form';

class ComponentFormFieldPersonaName extends Component {
  formPropsData = {};

  constructor(props) {
    super(props);

    this.validator = this.props.validator;

    this.formPropsData = this.props.formPropsData;
  }

  filterLocation = (value) => {
    if (value.length > 3) {
      return this.state.locations
        .filter((i) => i['Canonical Name'].toLowerCase().includes(value.toLowerCase()))
        .map((location) => ({
          label: location['Canonical Name'],
          value: location['Criteria ID'],
        }));
    }

    return [];
  };

  promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterLocation(inputValue));
      }, 1000);
    });

  generateFormSetting = () => {
    return {
      fields: [
        {
          label: 'Persona Name',
          key: PERSONA_FIELD_KEY.NAME,
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData[PERSONA_FIELD_KEY.NAME],
          required: true,
          validation: 'required',
          className: 'mb-3 border-start-5 bg-white p-2 px-3 rounded-2',
          classNameInput: 'border-0',
          changed: (event) => {
            this.formPropsData[PERSONA_FIELD_KEY.NAME] = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Persona Name');
          },
        },
        {
          label: 'Avatar',
          key: PERSONA_FIELD_KEY.AVATAR_2,
          type: FORM_FIELD_TYPE.DAM,
          value: this.formPropsData[PERSONA_FIELD_KEY.AVATAR_2],
          getImageDam: this.formPropsData[PERSONA_FIELD_KEY.AVATAR_2],
          required: true,
          validation: 'required',
          className: 'mb-3 border-start-5 bg-white p-2 px-3 rounded-2 avatar_persona',
          changed: (data) => {
            this.formPropsData[PERSONA_FIELD_KEY.AVATAR_2] = data;
          },
          blurred: () => {
            this.validator.showMessageFor('avatar');
          },
        },
      ],
    };
  };

  render() {
    const formSetting = this.generateFormSetting();

    return renderingGroupFieldHandler(formSetting, this.props.validator);
  }
}

export default ComponentFormFieldPersonaName;
