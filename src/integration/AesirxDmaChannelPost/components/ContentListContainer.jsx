/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';

import { withContentViewModel } from 'containers/ContentPage/ContentViewModels/ContentViewModelContextProvider';

import SimpleReactValidator from 'simple-react-validator';

import { withTranslation } from 'react-i18next';
import ContentListConnected from './ContentListConnected';
import { CONTENT_DESCRIPTION_MODE, CONTENT_FIELD_KEY } from 'constants/ContentModule';
import { CHANNEL_ADS_GOOGLE, CHANNEL_ADS_FACEBOOK } from 'constants/ChannelModule';
import PAGE_STATUS from 'constants/PageStatus';
import { Spinner } from 'aesirx-uikit';

const ContentListContainer = observer(
  class ContentListContainer extends Component {
    formPropsData = {};

    constructor(props) {
      super(props);

      this.validator = new SimpleReactValidator();

      this.viewModel = this.props.viewModel.getFormViewModel();
      this.viewModel.initIntegration(this);
    }

    populatingFormDataHandler = (
      data,
      channelsData
      // projectMasterData,
      // campaignMasterData,
      // personaMasterData
    ) => {
      this.formPropsData[CONTENT_FIELD_KEY.ID] = data?.id ?? 0;
      this.formPropsData[CONTENT_FIELD_KEY.NAME] = this.props.title;
      // this.formPropsData[CONTENT_FIELD_KEY.PROJECT] = data?.getProject(projectMasterData) ?? '';
      // this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN] = data?.getCampaign(campaignMasterData) ?? '';
      // this.formPropsData[CONTENT_FIELD_KEY.PERSONA] = data?.getPersona(personaMasterData) ?? [];
      this.formPropsData[CONTENT_FIELD_KEY.CHANNELS] = channelsData;
      this.formPropsData[CONTENT_FIELD_KEY.MODE] =
        data?.getMode() ?? CONTENT_DESCRIPTION_MODE.BASIC;
      this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION] = this.props.description ?? '';

      this.formPropsData[CONTENT_FIELD_KEY.PUBLISH_MODE] = 'post_now';

      this.formPropsData[CONTENT_FIELD_KEY.PUBLISH_DATE] = new Date();
      this.formPropsData[CONTENT_FIELD_KEY.TIME] = new Date();

      this.formPropsData[CONTENT_FIELD_KEY.DESELECTED] = [];
      this.formPropsData[CONTENT_FIELD_KEY.CANVA] = [];
      this.formPropsData[CONTENT_FIELD_KEY.DAM] = [];

      this.formPropsData[CONTENT_FIELD_KEY.ADS] = data?.getAds() ?? {
        [CHANNEL_ADS_GOOGLE]: {
          setupAds: {},
          campaign: {},
          ad_group: {},
        },
        [CHANNEL_ADS_FACEBOOK]: {
          setupAds: {},
          campaign: {},
          ad_group: {},
        },
      };

      this.formPropsData['items'] = data?.items ?? [];
    };

    render() {
      const { formStatus } = this.viewModel;

      if (formStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return <ContentListConnected {...this.props} formPropsData={this.formPropsData} />;
    }
  }
);

export default withTranslation()(withContentViewModel(ContentListContainer));
