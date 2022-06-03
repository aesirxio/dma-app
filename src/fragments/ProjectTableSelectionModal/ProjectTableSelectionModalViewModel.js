/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../constants/PageStatus';
import { PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from '../../constants/ProjectModule';
import { notify } from '../../components/Toast';

class ProjectTableSelectionModalViewModel {
  show = false;

  multi = false;

  fragmentStore = null;

  projectsMasterData = null;

  tableStatus = PAGE_STATUS.LOADING;

  projectsSelectionData = [];

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
      this.projectsSelectionData = [];
    }
    if (data) {
      this.projectsSelectionData.push(data);
    }
  };

  setMulti = (multi) => {
    this.multi = multi;
  };

  getSectionsValue = () => {
    return this.projectsSelectionData
      .map((item) => {
        return {
          value: item[PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.ID],
          label: item[PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.NAME],
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
    return this.projectsSelectionData;
  };

  getSelectedIDs = () => {
    if (!this.projectsSelectionData) return null;
    const convertedInArray = this.projectsSelectionData
      .map((item) => {
        return item[PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.VALUE];
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
    this.fragmentStore.getProjectMasterData(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    notify(error.message);
  };

  callbackOnSuccessHandler = (projectModelData) => {
    if (projectModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      this.projectsMasterData = projectModelData.toTableRowsData();
      // NEW
      this.getDataSelectOptions = projectModelData.toDropdownListValues();
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default ProjectTableSelectionModalViewModel;
