/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

class BaseMasterDataModel {
  items = [];
  unTransformedItems = [];
  pureEntities = null;
  constructor(entities) {
    this.pureEntities = entities;
  }

  getPureEntities = () => this.pureEntities;

  getItems = () => {
    return this.items;
  };

  getUntransformedItems = () => {
    return this.unTransformedItems;
  };

  totalItems = () => this.items.length;

  toDropdownListValues = () => {
    if (!this.items) return null;
    return this.items.map((element) => {
      return element ? element.toDropdownSelectionItem() : null;
    });
  };

  toTableRowsData = () => {
    if (!this.items) return null;
    return this.items.map((element) => {
      return element ? element.toTableRowData() : null;
    });
  };
}

export default BaseMasterDataModel;
