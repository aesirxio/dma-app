import React, { Component, Suspense } from 'react';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import { renderingGroupFieldHandler } from '../../../utils/form';

class ComponentFormFieldGeneral extends Component {
  formPropsData = {};

  constructor(props) {
    console.log('[ComponentFormFieldGeneral] re initialize');
    super(props);

    this.validator = this.props.validator;
    this.formPropsData = this.props.formPropsData;
  }

  generateFormSetting = () => {
    return {
      fields: [
        {
          label: 'Locations',
          key: PERSONA_FIELD_KEY.LOCATION,
          type: FORM_FIELD_TYPE.LOCATION,
          value: this.formPropsData[PERSONA_FIELD_KEY.LOCATION],
          all: this.formPropsData[PERSONA_FIELD_KEY.ALL_COUNTRIES],
          required: true,
          validation: 'required',
          isMulti: true,
          classNameInput: 'btn-outline-primary',
          isAll: true,
          changedAll: (data) => {
            this.formPropsData[PERSONA_FIELD_KEY.ALL_COUNTRIES] = data;
          },
          changed: (data) => {
            this.formPropsData[PERSONA_FIELD_KEY.LOCATION] = data;
          },
          blurred: () => {
            this.validator.showMessageFor('Locations');
          },
        },
        {
          label: 'Age',
          key: PERSONA_FIELD_KEY.AGE,
          type: FORM_FIELD_TYPE.AGE,
          valueFrom: this.formPropsData[PERSONA_FIELD_KEY.AGE_FROM],
          valueTo: this.formPropsData[PERSONA_FIELD_KEY.AGE_TO],
          required: true,
          validation: 'required',
          changed: (data, event) => {
            switch (event.name) {
              case 'age_from':
                this.formPropsData[PERSONA_FIELD_KEY.AGE_FROM] = data;
                break;
              case 'age_to':
                this.formPropsData[PERSONA_FIELD_KEY.AGE_TO] = data;
                break;
              default:
            }
          },
          blurred: () => {
            this.validator.showMessageFor('age from');
          },
        },

        {
          label: 'Gender',
          key: PERSONA_FIELD_KEY.GENDER,
          type: FORM_FIELD_TYPE.RADIO,
          option: [
            { label: 'All', value: 'all' },
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          value: this.formPropsData[PERSONA_FIELD_KEY.GENDER],
          required: true,
          validation: 'required',
          classNameInput: 'btn-outline-primary',
          changed: (event) => {
            this.formPropsData[PERSONA_FIELD_KEY.GENDER] = event.target.value;
          },
          blurred: () => {
            this.validator.showMessageFor('Gender');
          },
        },
      ],
    };
  };

  render() {
    console.log('ComponentFormFieldGeneral render', this.dataSetupAds);

    const formSetting = this.generateFormSetting();

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mb-3 border-start-5 bg-white p-2 px-3 rounded-2">
          <p className="text-blue-0 opacity-75 mb-2 fs-5">General</p>
          {renderingGroupFieldHandler(formSetting, this.props.validator)}
        </div>
      </Suspense>
    );
  }
}

export default ComponentFormFieldGeneral;
