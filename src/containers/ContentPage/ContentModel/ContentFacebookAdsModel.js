/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

class ContentFacebookAdsModel {
  dataAds = {};

  constructor(data) {
    console.log('dataFacebookAdsEdit', data);
    this.dataAds = {
      setupAds: {
        ad_name: data?.ad?.name,
        link: data?.ad_creative?.object_story_spec?.link_data?.link,
        square_image: data?.ad_creative?.object_story_spec?.link_data?.picture,
        headline: data?.ad_creative?.object_story_spec?.link_data?.name,
        text: data?.ad_creative?.object_story_spec?.link_data?.message,
        call_action: data?.ad_creative?.object_story_spec?.link_data?.call_to_action?.type,
        traffic: data?.ad_set?.destination_type,
      },
      campaign: {
        name: data?.campaign?.name,
        startdate: data?.ad_set?.start_time,
        enddate: data?.ad_set?.end_time,
        budget: data?.ad_set?.daily_budget,
      },
      ad_group: {
        name: data?.ad_set?.name,
      },
    };
  }

  getDataAds = () => this.dataAds;

  static convertSubmittedDataToAPIService(data) {
    console.log('convertdatafacebookads', data);

    if (!data.campaign.name) {
      return null;
    }

    const result = {
      campaign: {
        special_ad_categories: 'NONE',
        status: 'ACTIVE',
        objective: 'LINK_CLICKS', // Traffic - Todo: other format
        name: data?.campaign?.name,
      },
      ad_set: {
        billing_event: 'IMPRESSIONS',
        targeting: {
          geo_locations: {
            countries: ['VN'],
          },
          behaviors: data?.ad_group?.behaviors,
          interests: data?.ad_group?.interests,
        },
        bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
        destination_type: data?.setupAds?.traffic,
        name: data?.ad_group?.name,
        daily_budget: data?.campaign?.budget,
        start_time: data?.campaign?.startdate,
        end_time: data?.campaign?.enddate,
      },
      ad_creative: {
        object_story_spec: {
          link_data: {
            call_to_action: {
              type: data?.setupAds?.call_action,
            },
            name: data?.setupAds?.headline,
            message: data?.setupAds?.text,
            link: data?.setupAds?.link,
            picture: data?.setupAds?.square_image,
          },
        },
      },
      ad: {
        status: 'ACTIVE',
        name: data?.setupAds?.ad_name,
      },
    };
    return result;
  }
}

export default ContentFacebookAdsModel;
