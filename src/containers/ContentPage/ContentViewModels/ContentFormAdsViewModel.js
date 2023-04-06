/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { CONTENT_FIELD_KEY } from '../../../constants/ContentModule';
import { notify } from '../../../components/Toast';
class ContentFormAdsViewModel {
  parentNextStep = null;
  parentPreviousStep = null;
  formPropsData = null;
  previewData = {};
  validateGG = null;
  validateFB = null;

  constructor() {
    makeAutoObservable(this);
  }

  init = (formPropsData, parentNextStep, parentPreviousStep) => {
    this.formPropsData = formPropsData[CONTENT_FIELD_KEY.ADS];
    this.parentNextStep = parentNextStep;
    this.parentPreviousStep = parentPreviousStep;
  };

  setFromAdsData = (key, value, channeltype) => {
    this.previewData[key] = value;
    this.formPropsData[channeltype].setupAds[key] = value;
  };

  setFromCampaignData = (key, value, channeltype) => {
    this.formPropsData[channeltype].campaign[key] = value;
  };

  setFromAdsGroupData = (key, value, channeltype) => {
    this.formPropsData[channeltype].ad_group[key] = value;
  };

  checkValidateStep = (name) => {
    switch (name) {
      case 'fbad':
        if (
          this.formPropsData.google_ads.setupAds.final_url &&
          this.formPropsData.google_ads.setupAds.landscape_image &&
          this.formPropsData.google_ads.setupAds.square_image &&
          this.formPropsData.google_ads.setupAds.headline &&
          this.formPropsData.google_ads.setupAds.long_headline &&
          this.formPropsData.google_ads.setupAds.description &&
          this.formPropsData.google_ads.setupAds.businessName &&
          this.formPropsData.google_ads.campaign.name &&
          this.formPropsData.google_ads.campaign.startdate &&
          this.formPropsData.google_ads.campaign.budget &&
          this.formPropsData.google_ads.ad_group.name &&
          this.formPropsData.google_ads.ad_group.location &&
          this.formPropsData.google_ads.ad_group.ageFrom &&
          this.formPropsData.google_ads.ad_group.gender &&
          this.formPropsData.google_ads.ad_group.interests
        ) {
          this.validateGG = true;
        } else {
          this.validateGG = false;
          notify('The Google Ads field is required.', 'error');
        }
        break;
      case 'google_ads':
        if (
          this.formPropsData.fbad.setupAds.ad_name &&
          this.formPropsData.fbad.setupAds.link &&
          this.formPropsData.fbad.setupAds.square_image &&
          this.formPropsData.fbad.setupAds.headline &&
          this.formPropsData.fbad.setupAds.text &&
          this.formPropsData.fbad.setupAds.call_action &&
          this.formPropsData.fbad.setupAds.traffic &&
          this.formPropsData.fbad.campaign.name &&
          this.formPropsData.fbad.campaign.startdate &&
          this.formPropsData.fbad.campaign.budget &&
          this.formPropsData.fbad.ad_group.name &&
          this.formPropsData.fbad.ad_group.interests &&
          this.formPropsData.fbad.ad_group.behaviors
        ) {
          this.validateFB = true;
        } else {
          this.validateFB = false;
          notify('The Facebook Ads field is required.', 'error');
        }
        break;
      default:
    }
  };
}

export default ContentFormAdsViewModel;
