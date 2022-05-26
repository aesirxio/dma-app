/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

class ContentGoogleAdsModel {
  dataAds = {};
  constructor(data) {
    console.log('dataGoogleAdsEdit', data);
    this.dataAds = {
      setupAds: {
        final_url: data?.display_ad?.final_urls,
        square_image: data?.display_ad?.square_marketing_image_url,
        landscape_image: data?.display_ad?.marketing_image_url,
        headline: data?.display_ad?.headlines,
        long_headline: data?.display_ad?.long_headline,
        description: data?.display_ad?.descriptions,
        businessName: data?.display_ad?.business_name,
      },
      campaign: {
        name: data?.campaign?.name,
        budget: data?.campaign?.budget_amount,
        startdate: data?.campaign?.start_date,
        enddate: data?.campaign?.end_date,
      },
      ad_group: {
        name: data?.ad_group?.name,
        ageFrom: {
          value: data?.ad_group?.age_range_type,
          label: data?.ad_group?.age_range_type.replace('_to_', ' - '),
        },
        ageTo: {
          value: data?.ad_group?.income_range_type,
          label: data?.ad_group?.income_range_type.replace('_to_', ' - '),
        },
        location: data?.campaign?.location_id,
        gender: data?.ad_group?.gender_type,
        interests: data?.ad_group?.user_interest_id,
      },
    };
  }

  getDataAds = () => this.dataAds;

  static convertSubmittedDataToAPIService(data) {
    console.log('convertdatagoogleads', data);

    if (!data.campaign.name) {
      return null;
    }

    const result = {
      campaign: {
        name: data?.campaign?.name,
        budget_amount: data?.campaign?.budget,
        location_id: data?.ad_group?.location,
        start_date: data?.campaign?.startdate,
        end_date: data?.campaign?.enddate,
        // location_id: data?.ad_group?.location
        //   ? data?.ad_group?.location.map((item) => item.value).toString()
        //   : '',
      },
      ad_group: {
        name: data?.ad_group?.name,
        gender_type: data?.ad_group?.gender ? data?.ad_group?.gender : 'all',
        parental_status_type: 'not_a_parent',
        age_range_type: data?.ad_group?.ageFrom?.value,
        income_range_type: data?.ad_group?.ageTo?.value,
        user_interest_id: data?.ad_group?.interests,
        // user_interest_id: data?.ad_group?.interests
        //   ? data?.ad_group?.interests.map((item) => item.value).toString()
        //   : '',
      },
      display_ad: {
        headlines: data?.setupAds?.headline,
        long_headline: data?.setupAds?.long_headline,
        descriptions: data?.setupAds?.description,
        business_name: data?.setupAds?.businessName,
        marketing_image_url: data?.setupAds?.landscape_image[0]?.url,
        square_marketing_image_url: data?.setupAds?.square_image[0]?.url,
        final_urls: data?.setupAds?.final_url,
      },
    };

    return result;
  }
}

export default ContentGoogleAdsModel;
