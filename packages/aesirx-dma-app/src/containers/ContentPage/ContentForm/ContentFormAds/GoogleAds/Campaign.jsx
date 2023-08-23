/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext } from 'react';

import { FORM_FIELD_TYPE } from '../../../../../constants/FormFieldType';
import { Button } from 'aesirx-uikit';

import { renderingGroupFieldHandler } from '../../../../../utils/form';

import { ContentViewModelContext } from '../../../ContentViewModels/ContentViewModelContextProvider';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import Preview from './Preview';
import { observer } from 'mobx-react';

import { CHANNEL_ADS_GOOGLE, CHANNEL_ADS_FACEBOOK } from '../../../../../constants/ChannelModule';
import useValidator from '../../../../../utils/simpleValidator';
import ContentUtils from '../../../ContentUtils/ContentUtils';
import ChannelUtils from '../../../../ChannelsPage/ChannelUtils/ChannelUtils';
import AdGroup from './AdGroup';

const Campaign = observer((props) => {
  const contentContext = useContext(ContentViewModelContext);
  const viewModel = contentContext.getFormAdsViewModel();
  const viewFromModel = contentContext.getFormViewModel();

  const [validator, showValidationMessage] = useValidator();

  const previewData = viewModel.previewData;
  const campaignData = viewModel.formPropsData[CHANNEL_ADS_GOOGLE].campaign ?? {};

  const channelMasterData = viewFromModel.channelMasterData;
  const channelData = ChannelUtils.getChannelByFilter(channelMasterData, 'removed', 'not');

  const generateFormSetting = () => {
    return {
      fields: [
        {
          label: 'Campaign name',
          key: 'campaign_name',
          type: FORM_FIELD_TYPE.INPUT,
          value: campaignData?.name,
          required: true,
          validation: 'required',

          changed: (event) => {
            viewModel.setFromCampaignData('name', event.target.value, CHANNEL_ADS_GOOGLE);
          },
        },

        {
          type: FORM_FIELD_TYPE.DATERANGE,
          startField: {
            label: 'Start Date',
            key: 'startdata',
            value: campaignData?.startdate,
            changed: (date) => {
              viewModel.setFromCampaignData('startdate', date, CHANNEL_ADS_GOOGLE);
            },
            required: true,
            validation: 'required',
          },
          endField: {
            label: 'End Date',
            key: 'enddate',
            value: campaignData?.enddate,
            // required: true,
            // validation: 'required',
            changed: (date) => {
              viewModel.setFromCampaignData('enddate', date, CHANNEL_ADS_GOOGLE);
            },
          },
        },
        {
          label: 'Budget',
          key: 'budget',
          type: FORM_FIELD_TYPE.PRICE,
          value: campaignData?.budget,
          required: true,
          validation: 'required',
          changed: (event) => {
            viewModel.setFromCampaignData('budget', event.value, CHANNEL_ADS_GOOGLE);
          },
        },
      ],
    };
  };

  const handleNext = () => {
    if (validator.allValid()) {
      if (ContentUtils.hasAdvertisingAds(channelData, CHANNEL_ADS_FACEBOOK)) {
        viewModel.checkValidateStep(CHANNEL_ADS_GOOGLE);
        if (viewModel.validateFB) {
          viewModel.parentNextStep();
        }
      } else {
        viewModel.parentNextStep();
      }
    } else {
      showValidationMessage(true);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-5">
          {renderingGroupFieldHandler(generateFormSetting(), validator)}
          <AdGroup validator={validator} />
        </div>
        <div className="col-7">
          <Preview previewData={previewData} />
        </div>
      </div>

      <div className="d-flex justify-content-between border-top-1 pt-3">
        <Button
          className="btn btn-light border-success "
          onClick={props.previousStep}
          text="Back"
          icon={faChevronLeft}
        />

        <Button className="btn btn-success px-4 mw-80" onClick={handleNext} text="Next" />
      </div>
    </>
  );
});

export default Campaign;
