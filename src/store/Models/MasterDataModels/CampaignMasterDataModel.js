/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BaseMasterDataItemModel from '../Abstract/BaseMasterDataItemModel';
import BaseMasterDataModel from '../Abstract/BaseMasterDataModel';
import { CAMPAIGNS_FIELD_KEY, CAMPAIGN_API_FIELD_KEY } from '../../../constants/CampaignsModule';
import Helper from '../../../utils/helper';

class CampaignMasterDataItemModel extends BaseMasterDataItemModel {
  startDate = '';
  endDate = '';
  status = 0;

  constructor(entity) {
    super(entity);
    if (entity) {
      this.startDate = entity[CAMPAIGN_API_FIELD_KEY.START_DATE] ?? '';
      this.endDate = entity[CAMPAIGN_API_FIELD_KEY.END_DATE] ?? '';
      this.status = entity[CAMPAIGN_API_FIELD_KEY.STATUS] ?? '';
      this.data = entity[CAMPAIGN_API_FIELD_KEY.DATA] ?? '';
    }
  }

  toDropdownFullSelectionItem = () => {
    return {
      [CAMPAIGNS_FIELD_KEY.ID]: this.id ?? 0,
      [CAMPAIGNS_FIELD_KEY.NAME]: this.name ?? '',
      [CAMPAIGNS_FIELD_KEY.START_DATE]: this.startDate ?? '',
      [CAMPAIGNS_FIELD_KEY.END_DATE]: this.endDate ?? '',
      [CAMPAIGNS_FIELD_KEY.STATUS]: this.status ?? 0,
      [CAMPAIGNS_FIELD_KEY.DATA]: Helper.isNull(this.data) ? {} : JSON.parse(this.data),
    };
  };
}

class CampaignMasterDataModel extends BaseMasterDataModel {
  constructor(entities) {
    super(entities);
    if (entities) {
      this.unTransformedItems = entities;
      this.items = entities.result.map((element) => {
        return new CampaignMasterDataItemModel(element);
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
export { CampaignMasterDataModel, CampaignMasterDataItemModel };
