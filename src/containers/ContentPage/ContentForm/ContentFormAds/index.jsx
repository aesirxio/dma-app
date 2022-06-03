/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Tab, Tabs } from 'react-bootstrap';

import ContentFormAdsGoogleAds from './GoogleAds';
import ContentFormAdsFacebookAds from './FacebookAds';

import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';

import ContentUtils from '../../ContentUtils/ContentUtils';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';

import { CHANNEL_ADS_GOOGLE, CHANNEL_ADS_FACEBOOK } from '../../../../constants/ChannelModule';

const ContentFormAds = observer((props) => {
  const contentContext = useContext(ContentViewModelContext);

  const viewAdsModel = contentContext.getFormAdsViewModel();
  const viewFromModel = contentContext.getFormViewModel();

  const channelMasterData = viewFromModel.channelMasterData;
  const channelData = ChannelUtils.getChannelByFilter(channelMasterData, 'removed', 'not');

  viewAdsModel.init(props.formPropsData, props.nextStep, props.previousStep);

  return (
    <div className="pe-80">
      <h3 className="mb-4">Setup Ads</h3>
      <div className="wrapper_tabs wrapper_tabs_2 bg-white p-3">
        <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3">
          {channelData.map(
            ({ id, list }, index) =>
              id === 'advertising' &&
              list.map((channelData, i) => (
                <Tab eventKey={i} title={channelData.name}>
                  {channelData.id === CHANNEL_ADS_GOOGLE && (
                    <ContentFormAdsGoogleAds formPropsData={props.formPropsData} />
                  )}
                  {channelData.id === CHANNEL_ADS_FACEBOOK && (
                    <ContentFormAdsFacebookAds formPropsData={props.formPropsData} />
                  )}
                </Tab>
              ))
          )}
        </Tabs>
      </div>
    </div>
  );
});

export default ContentFormAds;
