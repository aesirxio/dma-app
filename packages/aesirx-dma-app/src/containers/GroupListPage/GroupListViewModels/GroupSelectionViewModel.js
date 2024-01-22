/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import { GROUP_FIELD_KEY } from '../../../constants/GroupModule';

import { notify } from 'aesirx-uikit';

class GroupSelectionViewModel {
  show = false;

  multi = false;

  groupStore = null;

  group = null;

  tableStatus = PAGE_STATUS.LOADING;

  groupSelectionData = [];

  constructor(groupStore) {
    makeAutoObservable(this);
    this.groupStore = groupStore;
  }

  resetObservableProperties() {
    this.multi = false;
    this.group = null;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.groupSelectionData = [];
  }

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  setSelectionData = (data) => {
    if (!this.multi) {
      this.groupSelectionData = [];
    }

    this.groupSelectionData.push(data);
  };

  setMulti = (multi) => {
    this.multi = multi;
  };

  getSectionsValue = () => {
    return this.groupSelectionData
      .map((item) => {
        return {
          value: item[GROUP_FIELD_KEY.ID],
          label: item[GROUP_FIELD_KEY.NAME],
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
    if (!this.groupSelectionData) return null;
    const convertedInArray = this.groupSelectionData
      .map((item) => {
        return item[GROUP_FIELD_KEY.ID];
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
    return this.groupSelectionData;
  };

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.groupStore.getGroupMasterData(this.callbackOnSuccessHandler, this.callbackOnErrorHander);
  };

  callbackOnErrorHander = (error) => {
    notify(error.message);
  };

  callbackOnSuccessHandler = (groupModelData) => {
    if (groupModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      this.group = groupModelData.toDropdownFullListValues();
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default GroupSelectionViewModel;
