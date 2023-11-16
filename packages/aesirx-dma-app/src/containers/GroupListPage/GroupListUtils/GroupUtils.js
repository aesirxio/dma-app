/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import GroupModel from '../GroupListModel/GroupModel';

class GroupUtils {
  transformGroupResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          const model = new GroupModel(item);

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

    return this.transformGroupResponseIntoModel(data).map((item) => ({
      label: item.name,
      value: item.id,
    }));
  };

  transformGroupModelIntoTableDataRow = (GroupModels) => {
    return GroupModels.map((item) => {
      return item.toTableRowData();
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  };
}

const utils = new GroupUtils();

export default utils;
