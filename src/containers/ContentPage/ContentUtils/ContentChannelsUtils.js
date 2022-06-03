/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ContentModel from '../ContentModel/ContentModel';
import ContentChannelsModel from '../ContentModel/ContentChannelsModel';

class ContentChannelsUtils {
  transformContentResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new ContentChannelsModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformContentModelIntoTableDataRow = (contentChannelsModels) => {
    return contentChannelsModels
      .map((item) => {
        return item.toTableRowData();
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };
}

const utils = new ContentChannelsUtils();

export default utils;
