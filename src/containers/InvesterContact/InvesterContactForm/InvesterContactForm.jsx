/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from "react";
import { observer } from "mobx-react";

import { FORM_FIELD_TYPE } from "../../../constants/FormFieldType";
import FormComponent from "../../../components/Form";

const InvesterContactForm = observer(
  class InvesterContactForm extends Component {
    formPropsData = {
      organization_name: "",
      contact_person: "",
      email: "",
      phone_number: "",
    };

    constructor(props) {
      super(props);
      this.viewModel = this.props.viewModel;
      this.viewModel.setForm(this);
    }

    generateFormSetting = () => {
      return [
        {
          fields: [
            {
              label: "Organization Name",
              key: "organization_name",
              type: FORM_FIELD_TYPE.INPUT,
              value: "",
              required: true,
              validation: "required",
              placeholder: "",
              changed: (event) => {
                this.formPropsData.organization_name = event.target.value;
              },
            },
            {
              label: "Contact Person",
              key: "contact_person",
              type: FORM_FIELD_TYPE.INPUT,
              value: "",
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData.contact_person = event.target.value;
              },
            },
            {
              label: "Email",
              key: "email",
              type: FORM_FIELD_TYPE.INPUT,
              value: "",
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData.email = event.target.value;
              },
            },
            {
              label: "Phone Number",
              key: "phone_number",
              type: FORM_FIELD_TYPE.INPUT,
              value: "",
              required: true,
              validation: "required",
              changed: (event) => {
                this.formPropsData.phone_number = event.target.value;
              },
            },
          ],
        },
      ];
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
);

export default InvesterContactForm;
