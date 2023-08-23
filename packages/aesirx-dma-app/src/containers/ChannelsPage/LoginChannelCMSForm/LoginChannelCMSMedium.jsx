/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, Suspense } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';

import { renderingGroupFieldHandler } from '../../../utils/form';
class LoginChannelCMSMedium extends Component {
  formPropsData = {
    token: '',
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
          label: 'Integration tokens',
          key: 'token',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.token,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.token = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Integration tokens');
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
      </Suspense>
    );
  }
}

export default LoginChannelCMSMedium;
