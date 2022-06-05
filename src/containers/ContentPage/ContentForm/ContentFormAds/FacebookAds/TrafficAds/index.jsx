/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext } from 'react';
import { FORM_FIELD_TYPE } from '../../../../../../constants/FormFieldType';

import { renderingGroupFieldHandler } from '../../../../../../utils/form';
import { observer } from 'mobx-react';
import { ContentViewModelContext } from '../../../../ContentViewModels/ContentViewModelContextProvider';
import { CHANNEL_ADS_FACEBOOK } from '../../../../../../constants/ChannelModule';

const TrafficAds = observer((props) => {
  const contentContext = useContext(ContentViewModelContext);
  const viewModel = contentContext.getFormAdsViewModel();

  const setupAds = viewModel.formPropsData[CHANNEL_ADS_FACEBOOK].setupAds ?? {};

  const callActions = [
    { value: 'NO_BUTTON', label: 'No Button' },
    { value: 'CONTACT_US', label: 'Contact Us' },
    { value: 'LEARN_MORE', label: 'Learn More' },
    { value: 'SHOP_NOW', label: 'Shop Now' },
    { value: 'SEE_MORE', label: 'See More' },
    { value: 'OPEN_LINK', label: 'Open Link' },
    { value: 'APPLY_NOW', label: 'Apply Now' },
    { value: 'REGISTER_NOW', label: 'Register Now' },
  ];

  const traffices = [
    { value: 'WEBSITE', label: 'Website' },
  ];

  const generateFormSetting = () => ({
    fields: [
      {
        label: 'Ad Name',
        key: 'ad_name',
        type: FORM_FIELD_TYPE.INPUT,
        value: setupAds?.ad_name,
        required: true,
        validation: 'required',
        changed: (event) => {
          viewModel.setFromAdsData('ad_name', event.target.value, CHANNEL_ADS_FACEBOOK);
        },
      },
      {
        label: 'Link',
        key: 'link',
        type: FORM_FIELD_TYPE.INPUT,
        typeFormat: 'url',
        value: setupAds?.link,
        required: true,
        validation: 'required|url',
        changed: (event) => {
          viewModel.setFromAdsData('link', event.target.value, CHANNEL_ADS_FACEBOOK);
        },
      },

      {
        label: 'Image',
        key: 'image',
        type: FORM_FIELD_TYPE.DAM,
        value: setupAds?.square_image,
        getImageDam: setupAds?.square_image,
        required: true,
        validation: 'required',
        changed: (data) => {
          viewModel.setFromAdsData('square_image', data, CHANNEL_ADS_FACEBOOK);
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
          viewModel.setFromAdsData('headline', event.target.value, CHANNEL_ADS_FACEBOOK);
        },
      },
      {
        label: 'Text',
        key: 'text',
        type: FORM_FIELD_TYPE.TEXTAREA,
        value: setupAds?.text,
        required: true,
        validation: 'required',
        changed: (event) => {
          viewModel.setFromAdsData('text', event.target.value, CHANNEL_ADS_FACEBOOK);
        },
      },

      {
        label: 'Call to Action',
        key: 'call_action',
        type: FORM_FIELD_TYPE.DROPDOWN,
        value: setupAds?.call_action,
        option: callActions,
        required: true,
        validation: 'required',
        changed: (data) => {
          viewModel.setFromAdsData('call_action', data, CHANNEL_ADS_FACEBOOK);
        },
      },

      {
        label: 'Traffic',
        key: 'traffic',
        type: FORM_FIELD_TYPE.DROPDOWN,
        value: setupAds?.traffic,
        option: traffices,
        required: true,
        validation: 'required',
        changed: (data) => {
          viewModel.setFromAdsData('traffic', data, CHANNEL_ADS_FACEBOOK);
        },
      },
    ],
  });

  return (
    <>
      <h4>Setup an Traffic Ad</h4>
      {renderingGroupFieldHandler(generateFormSetting(), props.validator)}
    </>
  );
});

export default TrafficAds;
