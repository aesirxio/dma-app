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
    console.log('AdGroup generateFormSetting', viewModel.formPropsData);
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
            console.log('datainterests', data);
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
            console.log('databehaviors', data);
            viewModel.setFromAdsGroupData('behaviors', data, CHANNEL_ADS_FACEBOOK);
          },
          blurred: () => {
            this.validator.showMessageFor('behaviors');
          },
        },
        // {
        //   label: 'Locations',
        //   key: 'adgroup_locationn',
        //   type: FORM_FIELD_TYPE.LOCATION,
        //   required: true,
        //   validation: 'required',
        //   isMulti: true,
        //   classNameInput: 'btn-outline-primary',
        //   all: 'no',
        //   isAll: false,
        //   value: adGroupData?.location,
        //   changedAll: (data) => {},
        //   changed: (data) => {
        //     viewModel.setFromAdsGroupData('location', data, CHANNEL_ADS_FACEBOOK);
        //   },
        // },

        // {
        //   label: 'Age',
        //   key: 'adgroup_age',
        //   type: FORM_FIELD_TYPE.AGE,
        //   valueFrom: adGroupData?.ageFrom,
        //   valueTo: adGroupData?.ageTo,
        //   required: true,
        //   validation: 'required',
        //   changed: (data, event) => {
        //     switch (event.name) {
        //       case 'age_from':
        //         viewModel.setFromAdsGroupData('ageFrom', data, CHANNEL_ADS_FACEBOOK);
        //         break;
        //       case 'age_to':
        //         viewModel.setFromAdsGroupData('ageTo', data, CHANNEL_ADS_FACEBOOK);
        //         break;
        //       default:
        //     }
        //   },
        //   blurred: () => {
        //     this.validator.showMessageFor('age from');
        //   },
        // },

        // {
        //   label: 'Gender',
        //   key: 'gender',
        //   type: FORM_FIELD_TYPE.RADIO,
        //   option: [
        //     { label: 'All', value: 'all' },
        //     { label: 'Male', value: 'male' },
        //     { label: 'Female', value: 'female' },
        //   ],
        //   value: adGroupData?.gender ? adGroupData?.gender : 'all',
        //   required: true,
        //   validation: 'required',
        //   classNameInput: 'btn-outline-primary',
        //   changed: (event) => {
        //     viewModel.setFromAdsGroupData('gender', event.target.value, CHANNEL_ADS_FACEBOOK);
        //   },
        // },
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
