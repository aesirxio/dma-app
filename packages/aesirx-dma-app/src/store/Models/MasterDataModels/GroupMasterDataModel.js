/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BaseMasterDataItemModel from '../Abstract/BaseMasterDataItemModel';
import BaseMasterDataModel from '../Abstract/BaseMasterDataModel';
import { GROUP_FIELD_KEY, GROUP_API_FIELD_KEY } from '../../../constants/GroupModule';
import { Helper } from 'aesirx-lib';

class GroupMasterDataItemModel extends BaseMasterDataItemModel {}

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
}
export { GroupMasterDataModel, GroupMasterDataItemModel };
