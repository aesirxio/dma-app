/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { CAMPAIGNS_FIELD_KEY } from '../../../constants/CampaignsModule';
import PAGE_STATUS from '../../../constants/PageStatus';
import Spinner from '../../../components/Spinner';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from '../../../utils/form';

class CampaignsForm extends Component {
  formPropsData = {
    [CAMPAIGNS_FIELD_KEY.PROJECT]: '',
    [CAMPAIGNS_FIELD_KEY.NAME]: '',
    [CAMPAIGNS_FIELD_KEY.START_DATE]: '',
    [CAMPAIGNS_FIELD_KEY.END_DATE]: '',
    [CAMPAIGNS_FIELD_KEY.DATA]: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.viewModel = this.props.viewModel;
    this.isEditMode = this.viewModel.editMode;
    this.isEditMode = this.viewModel.editMode === true;

    this.viewModel.setForm(this);
  }

  generateFormSetting = () => {
    const dropdownlistProjectValues = this.viewModel.dropdownlistProjectValues
      ? this.viewModel.dropdownlistProjectValues
      : null;

    const projectId = this.formPropsData[CAMPAIGNS_FIELD_KEY.PROJECT] ?? 0;
    const valueProject = dropdownlistProjectValues
      ? dropdownlistProjectValues.find((elm) => parseInt(elm.value) === parseInt(projectId))
      : null;
    const { t } = this.props;
    return [
      {
        fields: [
          {
            label: t('txt_project'),
            key: CAMPAIGNS_FIELD_KEY.PROJECT,
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: valueProject,
            required: true,
            validation: 'required',
            option: dropdownlistProjectValues,
            changed: (event) => {
              this.formPropsData[CAMPAIGNS_FIELD_KEY.PROJECT] = event.value;
            },
            blurred: () => {
              this.validator.showMessageFor('Project');
            },
          },
          {
            label: t('txt_campaign_name'),
            key: CAMPAIGNS_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[CAMPAIGNS_FIELD_KEY.NAME],
            required: true,
            validation: 'required',
            changed: (event) => {
              this.formPropsData[CAMPAIGNS_FIELD_KEY.NAME] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Campaign Name');
              }
            },
          },
          {
            type: FORM_FIELD_TYPE.DATERANGE,
            startField: {
              label: t('start_date'),
              key: CAMPAIGNS_FIELD_KEY.START_DATE,
              value: this.formPropsData[CAMPAIGNS_FIELD_KEY.START_DATE],
              changed: (date) => {
                this.formPropsData[CAMPAIGNS_FIELD_KEY.START_DATE] = date;
              },
              required: true,
              validation: 'required',
              blurred: () => {
                this.validator.showMessageFor('Start Date');
              },
            },
            endField: {
              label: t('end_date'),
              key: CAMPAIGNS_FIELD_KEY.END_DATE,
              value: this.formPropsData[CAMPAIGNS_FIELD_KEY.END_DATE],
              changed: (date) => {
                this.formPropsData[CAMPAIGNS_FIELD_KEY.END_DATE] = date;
              },
            },
          },

          {
            label: t('txt_budget'),
            key: `${CAMPAIGNS_FIELD_KEY.DATA}`,
            type: FORM_FIELD_TYPE.PRICE,
            value: this.formPropsData[CAMPAIGNS_FIELD_KEY.DATA].budget,
            // validation: 'required',
            changed: (data) => {
              this.formPropsData[CAMPAIGNS_FIELD_KEY.DATA].budget = data.value;
            },
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    if (!data) return false;

    this.formPropsData[CAMPAIGNS_FIELD_KEY.PROJECT] = data.getProjectId();
    this.formPropsData[CAMPAIGNS_FIELD_KEY.NAME] = data.getName().value;
    this.formPropsData[CAMPAIGNS_FIELD_KEY.START_DATE] = data.getStartDate().original;
    this.formPropsData[CAMPAIGNS_FIELD_KEY.END_DATE] = data.getEndDate().original;
    this.formPropsData[CAMPAIGNS_FIELD_KEY.DATA] = data.getData().value;
  };

  render() {
    const { formStatus, editMode } = this.viewModel;

    if (editMode) {
      let editData = this.viewModel.getCampaignEditData();
      this.populatingFormDataHandler(editData);
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

export default withTranslation('common')(CampaignsForm);
