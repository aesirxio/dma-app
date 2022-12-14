/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, Suspense } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';

import { renderingGroupFieldHandler } from '../../../utils/form';

class LoginChannelCMSFormJoomla extends Component {
  formPropsData = {
    endpoint_url: '',
    grant_type: '',
    client_id: '',
    client_secret: '',
  };

  constructor(props) {
    super(props);
    this.viewModel = this.props.viewModel;
    this.viewModel.setForm(this);

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  generateFormSetting = () => {
    return {
      fields: [
        {
          label: 'Endpoint Url',
          key: 'endpoint_url',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.endpoint_url,
          required: true,
          validation: 'required',
          placeholder: '',
          changed: (event) => {
            this.formPropsData.endpoint_url = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Endpoint Url');
          },
        },
        {
          label: 'Grant Type',
          key: 'grant_type',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.grant_type,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.grant_type = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Grant Type');
          },
        },
        {
          label: 'Client Id',
          key: 'client_id',
          type: FORM_FIELD_TYPE.INPUT,
          // typeFormat: FORM_FIELD_TYPE.PASSWORD,
          value: this.formPropsData.client_id,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.client_id = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Client Id');
          },
        },
        {
          label: 'Client Secret',
          key: 'client_secret',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.client_secret,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.client_secret = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Client Secret');
          },
        },
      ],
    };
  };

  render() {
    const formSetting = this.generateFormSetting();
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {renderingGroupFieldHandler(formSetting, this.props.validator)}
        <a>Document-link </a>
      </Suspense>
    );
  }
}

export default LoginChannelCMSFormJoomla;
