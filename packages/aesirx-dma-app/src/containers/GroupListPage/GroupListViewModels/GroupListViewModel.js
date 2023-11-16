/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import GroupUtils from '../GroupListUtils/GroupUtils';
import { notify } from 'aesirx-uikit';
import ContentStore from '../../ContentPage/ContentStore/ContentStore';

class GroupListViewModel {
  groupStore = null;

  group = null;

  pagination = null;

  tableRowHeader = null;

  dataFilter = null;

  tableStatus = PAGE_STATUS.LOADING;

  groupIdsSelected = null;

  contentStore = null;

  subRowDataTable = null;

  pageSize = 5;

  constructor(groupStore) {
    makeAutoObservable(this);
    this.groupStore = groupStore;
    this.contentStore = new ContentStore();
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.groupStore.fetchGroup(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  refreshTableGroupList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.groupStore.fetchGroup(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  deleteGroup = async () => {
    let getArrayId = this.groupIdsSelected;

    if (getArrayId.length > 0) {
      this.tableStatus = PAGE_STATUS.LOADING;
      const notify_success = await this.groupStore.deleteGroup(
        this.groupIdsSelected,
        this.refreshTableGroupList,
        this.callbackOnErrorHander
      );
      if (notify_success?.result) {
        notify('Delete success', 'success');
      }
    } else {
      notify('Please choose an item to delete', 'warn');
    }
  };

  getPagination = (paginationStep, isList, limit = 5) => {
    this.pageSize = limit;
    this.tableStatus = PAGE_STATUS.LOADING;
    if (this.dataFilter !== null) {
      this.groupStore.searchGroup(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander,
        this.dataFilter,
        paginationStep,
        this.pageSize
      );
    } else {
      this.groupStore.fetchGroup(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander,
        paginationStep,
        this.pageSize
      );
    }
  };

  searchGroup = (dataFilter, page = 1) => {
    this.dataFilter = dataFilter;
    this.groupStore.searchGroup(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter,
      page,
      this.pageSize
    );
  };

  // getContentByIdExpanded = async (groupId) => {
  //   if (!this.contentStore) {
  //     return null;
  //   }
  //   try {
  //     const contentDataModels = await this.contentStore.getContentsByCampaignIDs([campaignId], 20);
  //     return contentDataModels;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

  resetObservableProperties = () => {
    this.group = null;
    this.pagination = null;
    this.tableRowHeader = null;
    this.dataFilter = null;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.groupIdsSelected = null;
    this.contentStore = null;
    this.subRowDataTable = null;
    this.pageSize = 5;
  };

  callbackOnErrorHander = () => {
    this.tableStatus = PAGE_STATUS.READY;
    this.group = null;
  };

  callbackOnSuccessHandler = (groupModelData) => {
    if (groupModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = GroupUtils.transformGroupModelIntoTableDataRow(
        groupModelData.list
      );
      this.group = rowDataTransformed;
      this.pagination = groupModelData.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default GroupListViewModel;
