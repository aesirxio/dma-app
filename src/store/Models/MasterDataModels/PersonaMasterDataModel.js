/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import BaseMasterDataItemModel from "../Abstract/BaseMasterDataItemModel";
import BaseMasterDataModel from "../Abstract/BaseMasterDataModel";

import {
  PERSONA_FIELD_KEY,
  ESI_PERSONA_FIELD_KEY,
} from "../../../constants/PersonaModule";

class PersonaMasterDataItemModel extends BaseMasterDataItemModel {
  constructor(entity) {
    if (entity) {
      super(entity);
    }
  }

  toDropdownFullSelectionItem = () => {
    return {
      [PERSONA_FIELD_KEY.ID]: this.id ?? 0,
      [PERSONA_FIELD_KEY.NAME]: this.name ?? '',
    };
  };
}

class PersonaMasterDataModel extends BaseMasterDataModel {
  constructor(entities) {
    if (entities) {
      super(entities);
      this.unTransformedItems = entities;
      this.items = entities.result.map((element) => {
        return new PersonaMasterDataItemModel(element);
      });
    }
  }

  toDropdownFullListValues = () => {
    if (!this.items) return null;

    return this.items.map((element) => {
      return element ? element.toDropdownFullSelectionItem() : null;
    });
  };
}
export { PersonaMasterDataModel, PersonaMasterDataItemModel };
