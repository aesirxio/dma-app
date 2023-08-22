/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, Suspense } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';

import { renderingGroupFieldHandler } from '../../../utils/form';

class LoginChannelFormWriteFreely extends Component {
  formPropsData = {
    blog: '',
    username: '',
    password: '',
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
          label: 'Blog',
          key: 'blog',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.blog,
          required: false,
          // validation: 'required',
          placeholder: '',
          changed: (event) => {
            this.formPropsData.blog = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Blog');
          },
        },
        {
          label: 'Username',
          key: 'username',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.username,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.username = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Username');
          },
        },
        {
          label: 'Password',
          key: 'password',
          type: FORM_FIELD_TYPE.INPUT,
          typeFormat: FORM_FIELD_TYPE.PASSWORD,
          value: this.formPropsData.password,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.password = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Password');
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

export default LoginChannelFormWriteFreely;
