/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import _ from 'lodash';
import { AesirxFacebookDataApiService } from 'aesirx-lib';

const fetchSearchTargetingFromFacebookData = async (inputValue, name) => {
  const facebookDataAPIService = new AesirxFacebookDataApiService();
  let response = null;
  if (inputValue.length > 3) {
    switch (name) {
      case 'interests':
        response = await facebookDataAPIService.getInterestsFromFacebookData(inputValue);
        return filterData(inputValue, response?.facebook_data_interests);
      case 'behaviors':
        response = await facebookDataAPIService.getBehaviorsFromFacebookData(inputValue);
        return filterData(inputValue, response?.facebook_data_behaviors);
      default:
    }
  }

  return [];
};

const filterData = (value, data) => {
  return Array.isArray(data)
    ? data
        .filter((i) => i.name.toLowerCase().includes(value.toLowerCase()))
        .map((item) => ({
          label: item.name,
          value: item.id,
        }))
    : [];
};

const debouncedChangeHandlerTargeting = _.throttle(
  (value, name) => fetchSearchTargetingFromFacebookData(value, name),
  500
);

export { debouncedChangeHandlerTargeting };
