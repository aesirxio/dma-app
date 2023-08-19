/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { CHANNEL_ADS_FACEBOOK, CHANNEL_ADS_GOOGLE } from '../../../constants/ChannelModule';

import ContentGoogleAdsModel from './ContentGoogleAdsModel';
import ContentFacebookAdsModel from './ContentFacebookAdsModel';

class ContentAdsModel {
  static convertSubmittedDataToAPIService(data, channelId) {
    let result = {};

    switch (channelId) {
      case CHANNEL_ADS_GOOGLE:
        result = ContentGoogleAdsModel.convertSubmittedDataToAPIService(data[CHANNEL_ADS_GOOGLE]);
        break;
      case CHANNEL_ADS_FACEBOOK:
        result = ContentFacebookAdsModel.convertSubmittedDataToAPIService(
          data[CHANNEL_ADS_FACEBOOK]
        );
        break;
      default:
    }

    return result;
  }
}

export default ContentAdsModel;
