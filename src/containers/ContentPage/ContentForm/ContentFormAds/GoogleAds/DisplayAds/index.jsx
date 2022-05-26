/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useContext } from 'react';
import { FORM_FIELD_TYPE } from '../../../../../../constants/FormFieldType';

import { renderingGroupFieldHandler } from '../../../../../../utils/form';
import { observer } from 'mobx-react';
import { ContentViewModelContext } from '../../../../ContentViewModels/ContentViewModelContextProvider';
import { CHANNEL_ADS_GOOGLE } from '../../../../../../constants/ChannelModule';

const DisplayAds = observer((props) => {
  const contentContext = useContext(ContentViewModelContext);
  const viewModel = contentContext.getFormAdsViewModel();

  const setupAds = viewModel.formPropsData[CHANNEL_ADS_GOOGLE].setupAds ?? {};

  console.log('setupAds1111', viewModel);

  const generateFormSetting = () => ({
    fields: [
      {
        label: 'Final url',
        key: 'final_url',
        type: FORM_FIELD_TYPE.INPUT,
        typeFormat: 'url',
        value: setupAds?.final_url,
        required: true,
        validation: 'required|url',
        changed: (event) => {
          viewModel.setFromAdsData('final_url', event.target.value, CHANNEL_ADS_GOOGLE);
        },
      },
      {
        label: 'Square Image',
        key: 'square_image',
        type: FORM_FIELD_TYPE.DAM,
        value: setupAds?.square_image,
        getLinkImage: setupAds?.square_image,
        // required: true,
        // validation: 'required',
        changed: (data) => {
          viewModel.setFromAdsData('square_image', data, CHANNEL_ADS_GOOGLE);
        },
      },

      {
        label: 'Landscape Image',
        key: 'landscape_image',
        type: FORM_FIELD_TYPE.DAM,
        value: setupAds?.landscape_image,
        getLinkImage: setupAds?.landscape_image,
        // required: true,
        // validation: 'required',
        changed: (data) => {
          viewModel.setFromAdsData('landscape_image', data, CHANNEL_ADS_GOOGLE);
        },
      },
      {
        label: 'Headline',
        key: 'headline',
        type: FORM_FIELD_TYPE.INPUT,
        value: setupAds?.headline,
        required: true,
        validation: 'required',
        changed: (event) => {
          viewModel.setFromAdsData('headline', event.target.value, CHANNEL_ADS_GOOGLE);
        },
      },
      {
        label: 'Long headline',
        key: 'long_headline',
        type: FORM_FIELD_TYPE.INPUT,
        value: setupAds?.long_headline,
        required: true,
        validation: 'required',
        changed: (event) => {
          viewModel.setFromAdsData('long_headline', event.target.value, CHANNEL_ADS_GOOGLE);
        },
      },
      {
        label: 'Description',
        key: 'description',
        type: FORM_FIELD_TYPE.TEXTAREA,
        value: setupAds?.description,
        required: true,
        validation: 'required',
        changed: (event) => {
          viewModel.setFromAdsData('description', event.target.value, CHANNEL_ADS_GOOGLE);
        },
      },
      {
        label: 'Business Name',
        key: 'businessName',
        type: FORM_FIELD_TYPE.INPUT,
        value: setupAds?.businessName,
        required: true,
        validation: 'required',
        changed: (event) => {
          viewModel.setFromAdsData('businessName', event.target.value, CHANNEL_ADS_GOOGLE);
        },
      },
    ],
  });

  console.log('DisplayAds render', props);

  return <>{renderingGroupFieldHandler(generateFormSetting(), props.validator)}</>;
});

export default DisplayAds;
