/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import PersonaTemplateModel from "../PersonaModel/PersonaTemplateModel";

class PersonaTemplateUtils {
  transformPersonaTemplateResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new PersonaTemplateModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformPersonaTemplateModelIntoTableDataRow = (personaModels) => {
    return personaModels
      .map((item) => {
        return item.toTableRowData();
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };
}

const utils = new PersonaTemplateUtils();

export default utils;
