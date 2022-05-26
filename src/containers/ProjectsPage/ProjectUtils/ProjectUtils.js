/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import ProjectModel from '../ProjectModel/ProjectModel';
import { ProjectLeadModel } from '../ProjectModel/ProjectLeadModel';

class ProjectUtils {
  transformProjectResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new ProjectModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformProjectModelIntoTableDataRow = (projectModels) => {
    return projectModels
      .map((item) => {
        console.log('Debug An Item');
        console.log(item);
        return item.toTableRowData();
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformProjectLeadResponseIntoModel = (response) => {
    return new ProjectLeadModel(response);
  };

  toDropdownOptions = (data) => {
    let options = [];

    if (!data) {
      return options;
    }

    return this.transformProjectResponseIntoModel(data).map((item) => ({
      label: item.name,
      value: item.id,
      image: item.logoUrl,
    }));
  };
}

const utils = new ProjectUtils();

export default utils;
