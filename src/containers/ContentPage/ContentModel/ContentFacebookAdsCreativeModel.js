/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

class ContentFacebookAdsCreativeModel {
  static convertSubmittedDataToAPIService(data) {
    const result = {
      object_story_spec: {
        link_data: {
          call_to_action: {
            type: data?.call_action?.value,
          },
          name: data?.headline,
          message: data?.text,
          link: data?.link,
        },
      },
    };
    return JSON.stringify(result);
  }
}

export default ContentFacebookAdsCreativeModel;
