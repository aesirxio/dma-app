/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import _ from 'lodash';
import { AesirxGoogleDataApiService } from 'aesirx-dma-lib';

const fetchSearchInterestFromGoogleData = async (inputValue) => {
  if (inputValue.length > 3) {
    const googleDataAPIService = new AesirxGoogleDataApiService();
    let response = await googleDataAPIService.getInterestsFromGoogleData(inputValue);

    return filterData(inputValue, response?.google_ad_user_interests);
  }
  return [];
};

const filterData = (value, dataLocation) => {
  return Array.isArray(dataLocation)
    ? dataLocation
        .filter((i) => i.name.toLowerCase().includes(value.toLowerCase()))
        .map((item) => ({
          label: item.name,
          value: item.userInterestId,
        }))
    : [];
};

const debouncedChangeHandlerInterests = _.throttle(fetchSearchInterestFromGoogleData, 500);

export { debouncedChangeHandlerInterests };
