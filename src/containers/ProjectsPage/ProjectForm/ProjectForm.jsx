/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component, lazy } from 'react';

import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PROJECT_COLUMN_INDICATOR } from '../../../constants/ProjectModule';

import PAGE_STATUS from '../../../constants/PageStatus';

import Spinner from '../../../components/Spinner';
import { renderingGroupFieldHandler } from '../../../utils/form';

class ProjectForm extends Component {
  formPropsData = {
    [PROJECT_COLUMN_INDICATOR.NAME]: '',
    [PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION]: '',
    [PROJECT_COLUMN_INDICATOR.START_DATE]: '',
    [PROJECT_COLUMN_INDICATOR.END_DATE]: '',
    [PROJECT_COLUMN_INDICATOR.LOGO]: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.viewModel = this.props.viewModel;

    console.log('[ProjectForm] viewModel');
    console.log(this.props.viewModel);

    this.viewModel.setForm(this);
  }

  generateFormSetting = () => {
    console.log('re generate Form Setting', this.formPropsData);
    return [
      {
        fields: [
          {
            label: 'Project Name',
            key: PROJECT_COLUMN_INDICATOR.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[PROJECT_COLUMN_INDICATOR.NAME],
            required: true,
            validation: 'required',
            changed: (event) => {
              this.formPropsData[PROJECT_COLUMN_INDICATOR.NAME] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Project Name');
              }
            },
          },
          {
            type: FORM_FIELD_TYPE.DATERANGE,
            startField: {
              label: 'Start Date',
              key: PROJECT_COLUMN_INDICATOR.START_DATE,
              value: this.formPropsData[PROJECT_COLUMN_INDICATOR.START_DATE],
              changed: (date) => {
                this.formPropsData[PROJECT_COLUMN_INDICATOR.START_DATE] = date;
              },
              required: true,
              validation: 'required',
              blurred: () => {
                this.validator.showMessageFor('Start Date');
              },
            },
            endField: {
              label: 'End Date',
              key: PROJECT_COLUMN_INDICATOR.END_DATE,
              value: this.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE],
              changed: (date) => {
                this.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE] = date;
              },
              required: true,
              validation: 'required',
              blurred: () => {
                this.validator.showMessageFor('End Date');
              },
            },
          },
          {
            label: 'Project Logo',
            key: PROJECT_COLUMN_INDICATOR.LOGO,
            type: FORM_FIELD_TYPE.DAM,
            value: this.formPropsData[PROJECT_COLUMN_INDICATOR.LOGO],
            formPropsData: this.formPropsData,
            getLinkImage: this.formPropsData[PROJECT_COLUMN_INDICATOR.LOGO],
            changed: (data) => {
              this.formPropsData[PROJECT_COLUMN_INDICATOR.LOGO] = data[0].url;
            },
          },
          {
            label: 'Short description about project',
            key: PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION,
            type: FORM_FIELD_TYPE.TEXTAREA,
            value: this.formPropsData[PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION],
            changed: (event) => {
              this.formPropsData[PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION] = event.target.value;
            },
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    console.log('populatingFormDataHandler');
    console.log(data);
    console.log(data.getStartDate().original);
    console.log(data.getEndDate().original);

    if (!data) return false;

    this.formPropsData[PROJECT_COLUMN_INDICATOR.NAME] = data.getName().value;
    this.formPropsData[PROJECT_COLUMN_INDICATOR.START_DATE] = data.getOriginalStartDate();
    this.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE] = data.getOriginalEndDate();
    this.formPropsData[PROJECT_COLUMN_INDICATOR.LOGO] = data.getLogoUrlValue();
    this.formPropsData[
      PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION
    ] = data.getShortDescriptionValue();

    console.log('-- is DATA POPu ---');
    console.log(this.formPropsData);
  };

  onDrop = (files) => {
    this.setState({ files });
  };

  render() {
    console.log('[Project - Form] - re-render .........');
    console.log(this.formPropsData);

    const { formStatus, projectEditdata, editMode } = this.viewModel;

    if (editMode) {
      this.populatingFormDataHandler(projectEditdata);
    }

    if (formStatus === PAGE_STATUS.LOADING) {
      return <Spinner />;
    }

    const formSetting = this.generateFormSetting();

    return (
      <>
        {Object.keys(formSetting)
          .map((groupIndex) => {
            return [...Array(formSetting[groupIndex])].map((group) => {
              return renderingGroupFieldHandler(group, this.props.validator);
            });
          })
          .reduce((arr, el) => {
            return arr.concat(el);
          }, [])}
      </>
    );
  }
}

export default ProjectForm;
