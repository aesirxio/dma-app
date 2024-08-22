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
    superuser_token: '',
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
          label: 'Super User Token',
          key: 'superuser_token',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.superuser_token,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.superuser_token = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Super User Token');
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
