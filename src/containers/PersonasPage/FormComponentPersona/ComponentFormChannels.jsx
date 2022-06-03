/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import { renderingGroupFieldHandler } from '../../../utils/form';

import { components } from 'react-select';
import ComponentImage from '../../../components/ComponentImage';

const IconOption = (props) => (
  <components.Option {...props}>
    {props.data.avatar && (
      <ComponentImage src={props.data.avatar} width="30px" alt={props.data.label} />
    )}
    <span className="ms-1">{props.data.label}</span>
  </components.Option>
);

class ComponentFormChannels extends Component {
  formPropsData = {};

  constructor(props) {
    super(props);

    this.validator = this.props.validator;

    this.connectedChannelMasterData = this.props.connectedChannelMasterData;

    this.formPropsData = this.props.formPropsData;
  }

  generateFormSetting = () => {
    return {
      fields: [
        {
          label: 'Channels',
          key: PERSONA_FIELD_KEY.CHANNELS,
          type: FORM_FIELD_TYPE.DROPDOWN,
          option: this.connectedChannelMasterData,
          value: this.formPropsData[PERSONA_FIELD_KEY.CHANNELS],
          required: true,
          validation: 'required',
          classNameInput: 'btn-outline-primary',
          isMulti: true,
          optionComponent: IconOption,
          changed: (data) => {
            this.formPropsData[PERSONA_FIELD_KEY.CHANNELS] = data;
          },
          blurred: () => {
            this.validator.showMessageFor('Channels');
          },
        },
      ],
    };
  };

  render() {
    const formSetting = this.generateFormSetting();

    return (
      <div className="mb-3 border-start-5 bg-white p-2 px-3 rounded-2">
        {renderingGroupFieldHandler(formSetting, this.props.validator)}
      </div>
    );
  }
}

export default ComponentFormChannels;
