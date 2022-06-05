/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BaseMasterDataItemModel from '../Abstract/BaseMasterDataItemModel';
import BaseMasterDataModel from '../Abstract/BaseMasterDataModel';
class ProjectMasterDataItemModel extends BaseMasterDataItemModel {
  constructor(entity) {
    super(entity);
  }
}

class ProjectMasterDataModel extends BaseMasterDataModel {
  constructor(entities) {
    super(entities);
    if (entities) {
      this.unTransformedItems = entities;
      this.items = entities.map((element) => {
        return new ProjectMasterDataItemModel(element);
      });
    }
  }
}
export { ProjectMasterDataModel, ProjectMasterDataItemModel };
