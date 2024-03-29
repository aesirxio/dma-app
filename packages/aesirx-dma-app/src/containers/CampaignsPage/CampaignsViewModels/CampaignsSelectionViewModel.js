/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import { CAMPAIGNS_FIELD_KEY } from '../../../constants/CampaignsModule';

import { notify } from 'aesirx-uikit';

class CampaignsSelectionViewModel {
  show = false;

  multi = false;

  campaignStore = null;

  campaigns = null;

  tableStatus = PAGE_STATUS.LOADING;

  campaignSelectionData = [];

  constructor(campaignStore) {
    makeAutoObservable(this);
    this.campaignStore = campaignStore;
  }

  resetObservableProperties() {
    this.multi = false;
    this.campaigns = null;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.campaignSelectionData = [];
  }

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  setSelectionData = (data) => {
    if (!this.multi) {
      this.campaignSelectionData = [];
    }

    this.campaignSelectionData.push(data);
  };

  setMulti = (multi) => {
    this.multi = multi;
  };

  getSectionsValue = () => {
    return this.campaignSelectionData
      .map((item) => {
        return {
          value: item[CAMPAIGNS_FIELD_KEY.ID],
          label: item[CAMPAIGNS_FIELD_KEY.NAME],
        };
      })
      .reduce((arr, el) => {
        const i = arr.findIndex((e) => e.value === el.value);

        if (i === -1) {
          arr.push(el);
        } else {
          arr[i] = el;
        }
        return arr;
      }, []);
  };

  getSelectedIDs = () => {
    if (!this.campaignSelectionData) return null;
    const convertedInArray = this.campaignSelectionData
      .map((item) => {
        return item[CAMPAIGNS_FIELD_KEY.ID];
      })
      .reduce((arr, el) => {
        const i = arr.findIndex((e) => e.value === el.value);

        if (i === -1) {
          arr.push(el);
        } else {
          arr[i] = el;
        }
        return arr;
      }, []);
    let result = convertedInArray;
    if (!this.multi) {
      result = convertedInArray.length > 0 ? convertedInArray[0] : null;
    }
    return result;
  };

  getSelectionData = () => {
    return this.campaignSelectionData;
  };

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.campaignStore.getCampaignMasterData(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    notify(error.message);
  };

  callbackOnSuccessHandler = (campaignModelData) => {
    if (campaignModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      this.campaigns = campaignModelData.toDropdownFullListValues();
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default CampaignsSelectionViewModel;
