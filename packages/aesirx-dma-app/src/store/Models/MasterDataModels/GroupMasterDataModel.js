/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BaseMasterDataItemModel from '../Abstract/BaseMasterDataItemModel';
import BaseMasterDataModel from '../Abstract/BaseMasterDataModel';
import { GROUP_FIELD_KEY, GROUP_API_FIELD_KEY } from '../../../constants/GroupModule';
import { Helper } from 'aesirx-lib';

class GroupMasterDataItemModel extends BaseMasterDataItemModel {
  startDate = '';
  endDate = '';
  status = 0;

  constructor(entity) {
    super(entity);
    if (entity) {
      this.startDate = entity[GROUP_API_FIELD_KEY.START_DATE] ?? '';
      this.endDate = entity[GROUP_API_FIELD_KEY.END_DATE] ?? '';
      this.status = entity[GROUP_API_FIELD_KEY.STATUS] ?? '';
      this.data = entity[GROUP_API_FIELD_KEY.DATA] ?? '';
      this.published = entity[GROUP_API_FIELD_KEY.PUBLISHED] ?? '';
    }
  }

  toDropdownFullSelectionItem = () => {
    return {
      [GROUP_FIELD_KEY.ID]: this.id ?? 0,
      [GROUP_FIELD_KEY.NAME]: this.name ?? '',
      [GROUP_FIELD_KEY.START_DATE]: this.startDate ?? '',
      [GROUP_FIELD_KEY.END_DATE]: this.endDate ?? '',
      [GROUP_FIELD_KEY.STATUS]: this.status ?? 0,
      [GROUP_FIELD_KEY.PUBLISHED]: this.published ?? 0,
      [GROUP_FIELD_KEY.DATA]: Helper.isNull(this.data) ? {} : JSON.parse(this.data),
    };
  };
}

class GroupMasterDataModel extends BaseMasterDataModel {
  constructor(entities) {
    super(entities);
    if (entities) {
      this.unTransformedItems = entities;
      this.items = entities.result.map((element) => {
        return new GroupMasterDataItemModel(element);
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
export { GroupMasterDataModel, GroupMasterDataItemModel };
