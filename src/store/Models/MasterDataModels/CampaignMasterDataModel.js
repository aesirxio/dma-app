import BaseMasterDataItemModel from '../Abstract/BaseMasterDataItemModel';
import BaseMasterDataModel from '../Abstract/BaseMasterDataModel';
import { CAMPAIGNS_FIELD_KEY, CAMPAIGN_API_FIELD_KEY } from '../../../constants/CampaignsModule';
import Helper from '../../../utils/helper';

class CampaignMasterDataItemModel extends BaseMasterDataItemModel {
  startDate = '';
  endDate = '';
  status = 0;

  constructor(entity) {
    if (entity) {
      super(entity);
      this.startDate = entity[CAMPAIGN_API_FIELD_KEY.START_DATE] ?? '';
      this.endDate = entity[CAMPAIGN_API_FIELD_KEY.END_DATE] ?? '';
      this.status = entity[CAMPAIGN_API_FIELD_KEY.STATUS] ?? '';
      this.data = entity[CAMPAIGN_API_FIELD_KEY.DATA] ?? '';
    }
  }

  toDropdownFullSelectionItem = () => {
    console.log('toDropdownFullSelectionItem - debug - campaign');
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
    if (entities) {
      console.log('CampaignMasterDataModel - debug');
      console.log(entities);
      super(entities);
      this.unTransformedItems = entities;
      this.items = entities.result.map((element) => {
        return new CampaignMasterDataItemModel(element);
      });
      console.log('CampaignMasterDataModel - debug after');
      console.log(this.items);
    }
  }

  toDropdownFullListValues = () => {
    console.log('toDropdownFullListValues - debug');

    if (!this.items) return null;

    return this.items.map((element) => {
      return element ? element.toDropdownFullSelectionItem() : null;
    });
  };
}
export { CampaignMasterDataModel, CampaignMasterDataItemModel };
