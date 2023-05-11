/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, Suspense } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';

import { renderingGroupFieldHandler } from '../../../utils/form';

class LoginChannelFormTelegram extends Component {
  formPropsData = {
    organisation_id: '',
    bot_username: '',
    bot_token: '',
    chat_ids: '',
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
          label: 'Organisation Id',
          key: 'organisation_id',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.organisation_id,
          required: true,
          validation: 'required',
          placeholder: '',
          changed: (event) => {
            this.formPropsData.organisation_id = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Organisation Id');
          },
        },
        {
          label: 'Bot Username',
          key: 'bot_username',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.bot_username,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.bot_username = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Bot Username');
          },
        },
        {
          label: 'Bot token',
          key: 'bot_token',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.bot_token,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.bot_token = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Bot token');
          },
        },
        {
          label: 'Chat Ids',
          key: 'chat_ids',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.formPropsData.chat_ids,
          required: true,
          validation: 'required',
          changed: (event) => {
            this.formPropsData.chat_ids = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Chat Ids');
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

export default LoginChannelFormTelegram;
