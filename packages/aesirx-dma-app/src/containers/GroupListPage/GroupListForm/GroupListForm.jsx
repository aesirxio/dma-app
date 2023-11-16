/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { GROUP_FIELD_KEY } from '../../../constants/GroupModule';
import PAGE_STATUS from '../../../constants/PageStatus';
import { Spinner } from 'aesirx-uikit';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from '../../../utils/form';

class CampaignsForm extends Component {
  formPropsData = {
    [GROUP_FIELD_KEY.NAME]: '',
    [GROUP_FIELD_KEY.START_DATE]: '',
    [GROUP_FIELD_KEY.END_DATE]: '',
    [GROUP_FIELD_KEY.DATA]: {},
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
    const { t } = this.props;
    return [
      {
        fields: [
          {
            label: t('txt_campaign_name'),
            key: GROUP_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[GROUP_FIELD_KEY.NAME],
            required: true,
            validation: 'required',
            changed: (event) => {
              this.formPropsData[GROUP_FIELD_KEY.NAME] = event.target.value;
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
              key: GROUP_FIELD_KEY.START_DATE,
              value: this.formPropsData[GROUP_FIELD_KEY.START_DATE],
              changed: (date) => {
                this.formPropsData[GROUP_FIELD_KEY.START_DATE] = date;
              },
              required: true,
              validation: 'required',
              blurred: () => {
                this.validator.showMessageFor('Start Date');
              },
            },
            endField: {
              label: t('end_date'),
              key: GROUP_FIELD_KEY.END_DATE,
              value: this.formPropsData[GROUP_FIELD_KEY.END_DATE],
              changed: (date) => {
                this.formPropsData[GROUP_FIELD_KEY.END_DATE] = date;
              },
            },
          },

          {
            label: t('txt_budget'),
            key: `${GROUP_FIELD_KEY.DATA}`,
            type: FORM_FIELD_TYPE.PRICE,
            value: this.formPropsData[GROUP_FIELD_KEY.DATA].budget,
            // validation: 'required',
            changed: (data) => {
              this.formPropsData[GROUP_FIELD_KEY.DATA].budget = data.value;
            },
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    if (!data) return false;
    this.formPropsData[GROUP_FIELD_KEY.NAME] = data.getName().value;
    this.formPropsData[GROUP_FIELD_KEY.START_DATE] = data.getStartDate().original;
    this.formPropsData[GROUP_FIELD_KEY.END_DATE] = data.getEndDate().original;
    this.formPropsData[GROUP_FIELD_KEY.DATA] = data.getData().value;
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

export default withTranslation()(CampaignsForm);
