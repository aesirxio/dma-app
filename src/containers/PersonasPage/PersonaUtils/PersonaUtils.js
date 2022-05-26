/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import PersonaModel from '../PersonaModel/PersonaModel';

class PersonaUtils {
  transformPersonaResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new PersonaModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformPersonaModelIntoTableDataRow = (personaModels) => {
    return personaModels
      .map((item) => {
        console.log('Debug An Item');
        console.log(item);
        return item.toTableRowData();
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

    return this.transformPersonaResponseIntoModel(data).map((item) => ({
      label: item.name,
      value: item.id,
      channels: item.channels,
    }));
  };
}

const utils = new PersonaUtils();

export default utils;
