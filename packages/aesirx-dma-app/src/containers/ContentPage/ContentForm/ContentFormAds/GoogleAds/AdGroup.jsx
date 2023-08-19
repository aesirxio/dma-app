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

import { CHANNEL_ADS_GOOGLE } from '../../../../../constants/ChannelModule';
import { debouncedChangeHandlerInterests } from './FetchDataGGAds';

const AdGroup = observer((props) => {
  const contentContext = useContext(ContentViewModelContext);
  const viewModel = contentContext.getFormAdsViewModel();

  const adGroupData = viewModel.formPropsData[CHANNEL_ADS_GOOGLE].ad_group ?? {};

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
            viewModel.setFromAdsGroupData('name', event.target.value, CHANNEL_ADS_GOOGLE);
          },
        },
        {
          label: 'Locations',
          key: 'adgroup_location',
          type: FORM_FIELD_TYPE.LOCATION,
          required: true,
          validation: 'required',
          isMulti: true,
          value: adGroupData?.location,
          classNameInput: 'btn-outline-primary',
          all: 'no',
          name: 'googleads',
          isAll: false,
          changedAll: () => {},
          changed: (data) => {
            viewModel.setFromAdsGroupData('location', data, CHANNEL_ADS_GOOGLE);
          },
        },
        {
          label: 'Age',
          key: 'adgroup_age',
          type: FORM_FIELD_TYPE.AGE,
          valueFrom: adGroupData?.ageFrom,
          valueTo: adGroupData?.ageTo,
          required: true,
          validation: 'required',
          isAgeGG: true,
          changed: (data, event) => {
            switch (event.name) {
              case 'age_from':
                viewModel.setFromAdsGroupData('ageFrom', data, CHANNEL_ADS_GOOGLE);
                break;
              case 'age_to':
                viewModel.setFromAdsGroupData('ageTo', data, CHANNEL_ADS_GOOGLE);
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
          key: 'gender',
          type: FORM_FIELD_TYPE.RADIO,
          option: [
            { label: 'All', value: 'all' },
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          value: adGroupData?.gender ? adGroupData?.gender : 'all',
          required: true,
          validation: 'required',
          classNameInput: 'btn-outline-primary',
          changed: (event) => {
            viewModel.setFromAdsGroupData('gender', event.target.value, CHANNEL_ADS_GOOGLE);
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
          loadOptions: (value) => debouncedChangeHandlerInterests(value),
          placeholderComponent: (props) => (
            <components.Placeholder {...props}>Search...</components.Placeholder>
          ),
          changed: (data) => {
            viewModel.setFromAdsGroupData('interests', data, CHANNEL_ADS_GOOGLE);
          },
          blurred: () => {
            this.validator.showMessageFor('interests');
          },
        },
      ],
    };
  };

  return (
    <>
      <h4>Setup an Ads Group</h4>
      {renderingGroupFieldHandler(generateFormSetting(), props.validator)}
    </>
  );
});

export default AdGroup;
