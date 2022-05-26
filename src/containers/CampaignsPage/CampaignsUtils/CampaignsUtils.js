/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import CampaignsModel from '../CampaignsModel/CampaignsModel';

class CampaignsUtils {
  transformCampaignResponseIntoModel = (response) => {
    console.log(response);
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          console.log('Campaign Model:', item);
          const model = new CampaignsModel(item);

          return model;
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  toDropdownOptions = (data) => {
    let options = [];

    if (!data) {
      return options;
    }

    return this.transformCampaignResponseIntoModel(data).map((item) => ({
      label: item.name,
      value: item.id,
    }));
  };

  transformCampaignsModelIntoTableDataRow = (CampaignsModels) => {
    return CampaignsModels.map((item) => {
      console.log('Debug An Item');
      console.log(item);
      return item.toTableRowData();
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  };
}

const utils = new CampaignsUtils();

export default utils;
