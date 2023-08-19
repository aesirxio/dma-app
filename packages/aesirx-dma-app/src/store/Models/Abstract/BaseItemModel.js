/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

class BaseItemModel {
  id = 0;
  name = '';
  createdBy = null;
  modifiedBy = null;
  createdDate = null;
  modifiedDate = null;
  featured = 0;
  constructor(entity) {
    if (entity) {
      this.id = entity.id ?? 0;
      this.name = entity.title ?? '';
      this.createdBy = entity.created_by ?? null;
      this.modifiedBy = entity.modified_by ?? null;
      this.createdDate = entity.created_date ?? null;
      this.modifiedDate = entity.modified_date ?? null;
      this.featured = entity.featured ?? 0;
    }
  }

  getId = () => {
    return this.id;
  };

  getTitle = () => {
    return this.title;
  };

  getCreatedBy = () => {
    return this.createdBy;
  };

  getModifiedBy = () => {
    return this.modifiedBy;
  };

  getCreatedDate = () => {
    return this.createdDate;
  };

  getModifiedDate = () => {
    return this.modifiedDate;
  };

  getFeatured = () => {
    return this.featured;
  };
}

export default BaseItemModel;
