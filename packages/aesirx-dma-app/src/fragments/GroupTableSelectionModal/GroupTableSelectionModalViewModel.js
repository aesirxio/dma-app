/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../constants/PageStatus';
import { GROUP_FIELD_KEY } from '../../constants/GroupModule';
import { notify } from 'aesirx-uikit';

class GroupTableSelectionModalViewModel {
  show = false;

  multi = false;

  fragmentStore = null;

  groupMasterData = null;

  tableStatus = PAGE_STATUS.LOADING;

  groupSelectionData = [];

  getDataSelectOptions = [];

  getValueSelected = [];

  inputRef = null;
  constructor(fragmentStore) {
    makeAutoObservable(this);
    this.fragmentStore = fragmentStore;
  }

  openModal = (inputRef) => {
    this.show = true;
    this.inputRef = inputRef;
  };

  closeModal = () => {
    this.show = false;
    this.inputRef = null;
  };

  setSelectionData = (data) => {
    if (!this.multi) {
      this.groupSelectionData = [];
    }
    if (data) {
      this.groupSelectionData.push(data);
    }
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

  getSelectionData = () => {
    return this.groupSelectionData;
  };

  getSelectedIDs = () => {
    if (!this.groupSelectionData) return null;
    const convertedInArray = this.groupSelectionData
      .map((item) => {
        return item[GROUP_FIELD_KEY.VALUE];
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

  loadDataIntoUI = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.fragmentStore.getGroupMasterData(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    notify(error.message);
  };

  callbackOnSuccessHandler = (groupModelData) => {
    if (groupModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      this.groupMasterData = groupModelData.toTableRowsData();
      // NEW
      this.getDataSelectOptions = groupModelData.toDropdownListValues();
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default GroupTableSelectionModalViewModel;
