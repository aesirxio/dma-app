/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BaseMasterDataModel from '../Abstract/BaseMasterDataModel';

class MemberFeaturesMasterDataModel extends BaseMasterDataModel {
  constructor(entities) {
    super(entities);
    if (entities) {
      this.unTransformedItems = entities;
      this.items = entities;
    }
  }

  getFeaturesSocialMedia = () => this.items.social_media ?? null;
  getFeaturesAdvertising = () => this.items.advertising ?? null;
  getFeaturesCms = () => this.items.cms ?? null;
  getFeaturescontentMarketing = () => this.items.content_marketing ?? null;
  getFeaturesEmailMarketing = () => this.items.email_marketing ?? null;
  getFeaturesManagement = () => this.items.management ?? null;
  getFeaturestool = () => this.items.tool ?? null;
}
export { MemberFeaturesMasterDataModel };
