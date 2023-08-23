/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../constants/FormFieldType';
import { renderingGroupFieldHandler } from '../../utils/form';
import { Form } from 'react-bootstrap';
const FormComponent = lazy(() => import('../../components/Form'));

class Wordpress extends Component {
  validator = null;
  formPropsData = {
    endpoint_url: '',
    username: '',
    password: '',
    projectId: '',
  };

  viewModel = null;

  constructor(props) {
    super(props);
    this.viewModel = this.props.viewModel;
    this.isEditMode = this.viewModel.editMode;
    this.isEditMode = this.viewModel.editMode === true;

    this.validator = new SimpleReactValidator();
    this.viewModel.setForm(this);
  }
  generateFormSetting = () => {
    return [
      {
        fields: [
          {
            label: 'Endpoint Url',
            key: 'endpoint_url',
            type: FORM_FIELD_TYPE.INPUT,
            value: '',
            required: true,
            validation: 'required',
            placeholder: 'https://testwp.R Digital',
            changed: (event) => {
              this.props.setFormData(event, 'endpoint_url');
            },
          },
          {
            label: 'Username',
            key: 'username',
            type: FORM_FIELD_TYPE.INPUT,
            value: '',
            required: true,
            validation: 'required',
            changed: (event) => {
              this.props.setFormData(event, 'username');
            },
          },
          {
            label: 'Password',
            key: 'password',
            type: FORM_FIELD_TYPE.INPUT,
            typeFormat: FORM_FIELD_TYPE.PASSWORD,
            value: '',
            required: true,
            validation: 'required',
            changed: (event) => {
              this.props.setFormData(event, 'password');
            },
          },
        ],
      },
    ];
  };

  renderingFormHandler = (formSetting) => {
    return (
      <Form key={Math.random(40, 200)} className={this.props.formClassName}>
        {Object.keys(formSetting)
          .map((groupIndex) => {
            return [...Array(formSetting[groupIndex])].map((group) => {
              return renderingGroupFieldHandler(group, this.validator);
            });
          })
          .reduce((arr, el) => {
            return arr.concat(el);
          }, [])}
      </Form>
    );
  };

  render() {
    return (
      <FormComponent
        generateFormSetting={() => this.generateFormSetting()}
        formPropsData={this.formPropsData}
        viewModel={this.viewModel}
        key={Math.random(40, 200)}
      />
    );
  }
}

export default Wordpress;
