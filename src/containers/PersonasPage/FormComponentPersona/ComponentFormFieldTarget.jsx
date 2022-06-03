/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { AesirxFacebookDataApiService } from 'aesirx-dma-lib';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import Label from '../../../components/Form/Label';
import { components } from 'react-select';

const FormSelectDropdown = lazy(() => import('../../../components/Form/FormSelectDropdown'));

class ComponentFormFieldTarget extends Component {
  formPropsData = {};

  constructor(props) {
    super(props);

    this.state = {
      demographics: [],
      interests: [],
      behaviors: [],
    };

    this.validator = this.props.validator;

    this.formPropsData = this.props.formPropsData;

  }

  componentDidMount = async () => {
    const facebookDataAPIService = new AesirxFacebookDataApiService();
    let resDemographics = await facebookDataAPIService.getDemographicsFromFacebookData();
    let resInterests = await facebookDataAPIService.getInterestsFromFacebookData();
    let resBehaviors = await facebookDataAPIService.getBehaviorsFromFacebookData();

    this.setState({
      demographics: resDemographics?.data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      interests: resInterests?.data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      behaviors: resBehaviors?.data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    });
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  generateFormSetting = () => {
    return {
      demographics: {
        label: 'Demographics',
        required: true,
        validation: 'required',
        value: this.formPropsData[PERSONA_FIELD_KEY.DEMOGRAPHICS_SELECT],
        fields: [
          {
            key: PERSONA_FIELD_KEY.DEMOGRAPHICS_SELECT,
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: this.formPropsData[PERSONA_FIELD_KEY.DEMOGRAPHICS_SELECT],
            option: this.state.demographics,
            className: 'col-12',
            isMulti: true,
            changed: (data) => {
              this.formPropsData[PERSONA_FIELD_KEY.DEMOGRAPHICS_SELECT] = data;
            },
            blurred: () => {
              this.validator.showMessageFor('Demographics');
            },
          },
        ],
      },
      interests: {
        label: 'Interests',
        required: true,
        validation: 'required',
        value: this.formPropsData[PERSONA_FIELD_KEY.INTERESTS_SELECT],
        fields: [
          {
            key: PERSONA_FIELD_KEY.INTERESTS_SELECT,
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: this.formPropsData[PERSONA_FIELD_KEY.INTERESTS_SELECT],
            option: this.state.interests,
            className: 'col-12',
            isMulti: true,
            changed: (data) => {
              this.formPropsData[PERSONA_FIELD_KEY.INTERESTS_SELECT] = data;
            },
            blurred: () => {
              this.validator.showMessageFor('Interests');
            },
          },
        ],
      },

      behaviors: {
        label: 'Behaviors',
        required: true,
        validation: 'required',
        value: this.formPropsData[PERSONA_FIELD_KEY.BEHAVIORS_SELECT],
        fields: [
          {
            key: PERSONA_FIELD_KEY.BEHAVIORS_SELECT,
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: this.formPropsData[PERSONA_FIELD_KEY.BEHAVIORS_SELECT],
            option: this.state.behaviors,
            className: 'col-12',
            isMulti: true,
            changed: (data) => {
              this.formPropsData[PERSONA_FIELD_KEY.BEHAVIORS_SELECT] = data;
            },
            blurred: () => {
              this.validator.showMessageFor('Behaviors');
            },
          },
        ],
      },
    };
  };

  render() {

    const formSetting = this.generateFormSetting();

    return (
      <div className="mb-3 border-start-5 bg-white p-2 px-3 rounded-2 row">
        <p className="text-blue-0 opacity-75 mb-2 fs-5">Targeting</p>
        {Object.keys(formSetting).map((index) => (
          <React.Fragment key={Math.random(40, 200)}>
            <Label
              text={formSetting[index].label}
              required={formSetting[index].required ?? false}
            />

            {formSetting[index].fields.map((field) => (
              <div className={field.className} key={Math.random(40, 200)}>
                <FormSelectDropdown field={field} />
              </div>
            ))}
            {formSetting[index].validation &&
              this.validator.message(
                formSetting[index].label,
                formSetting[index].value,
                formSetting[index].validation,
                {
                  className: 'text-danger',
                }
              )}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default ComponentFormFieldTarget;
