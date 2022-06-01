/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useContext } from 'react';
import { components } from 'react-select';
import { FORM_FIELD_TYPE } from '../../../../../constants/FormFieldType';

import { renderingGroupFieldHandler } from '../../../../../utils/form';

import { ContentViewModelContext } from '../../../ContentViewModels/ContentViewModelContextProvider';

import { observer } from 'mobx-react';

import { CHANNEL_ADS_FACEBOOK } from '../../../../../constants/ChannelModule';
import { debouncedChangeHandlerTargeting } from './FetchDataFBAds';

const AdGroup = observer((props) => {
  const contentContext = useContext(ContentViewModelContext);
  const viewModel = contentContext.getFormAdsViewModel();

  const adGroupData = viewModel.formPropsData[CHANNEL_ADS_FACEBOOK].ad_group ?? {};

  const generateFormSetting = () => {
    return {
      fields: [
        {
          label: 'Ad group name',
          key: 'adgroup_name',
          type: FORM_FIELD_TYPE.INPUT,
          value: adGroupData?.name,
          required: true,
          validation: 'required',

          changed: (event) => {
            viewModel.setFromAdsGroupData('name', event.target.value, CHANNEL_ADS_FACEBOOK);
          },
        },
        {
          label: 'Interests',
          key: 'interests',
          type: FORM_FIELD_TYPE.DROPDOWN,
          value: adGroupData?.interests,
          isMulti: true,
          async: true,
          required: true,
          validation: 'required',
          loadOptions: (value) => debouncedChangeHandlerTargeting(value, 'interests'),
          placeholderComponent: (props) => (
            <components.Placeholder {...props}>Search...</components.Placeholder>
          ),
          changed: (data) => {
            viewModel.setFromAdsGroupData('interests', data, CHANNEL_ADS_FACEBOOK);
          },
          blurred: () => {
            this.validator.showMessageFor('interests');
          },
        },
        {
          label: 'Behaviors',
          key: 'behaviors',
          type: FORM_FIELD_TYPE.DROPDOWN,
          value: adGroupData?.behaviors,
          isMulti: true,
          async: true,
          required: true,
          validation: 'required',
          loadOptions: (value) => debouncedChangeHandlerTargeting(value, 'behaviors'),
          placeholderComponent: (props) => (
            <components.Placeholder {...props}>Search...</components.Placeholder>
          ),
          changed: (data) => {
            viewModel.setFromAdsGroupData('behaviors', data, CHANNEL_ADS_FACEBOOK);
          },
          blurred: () => {
            this.validator.showMessageFor('behaviors');
          },
        },
      ],
    };
  };

  return (
    <>
      <h4>Setup an Ad Set</h4>
      {renderingGroupFieldHandler(generateFormSetting(), props.validator)}
    </>
  );
});

export default AdGroup;
