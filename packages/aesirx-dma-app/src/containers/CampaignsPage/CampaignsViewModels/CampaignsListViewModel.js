/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import CampaignsUtils from '../CampaignsUtils/CampaignsUtils';
import { notify } from 'aesirx-uikit';
import ContentStore from '../../ContentPage/ContentStore/ContentStore';
import moment from 'moment';

class CampaignsListViewModel {
  campaignsStore = null;

  campaigns = null;

  pagination = null;

  tableRowHeader = null;

  dataFilter = null;

  tableStatus = PAGE_STATUS.LOADING;

  campaignsIdsSelected = null;

  contentStore = null;

  subRowDataTable = null;

  pageSize = 5;

  constructor(campaignsStore) {
    makeAutoObservable(this);
    this.campaignsStore = campaignsStore;
    this.contentStore = new ContentStore();
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.campaignsStore.fetchCampaigns(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  refreshTableCampaignsList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.campaignsStore.fetchCampaigns(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  deleteCampaigns = async () => {
    let getArrayId = this.campaignsIdsSelected;

    if (getArrayId.length > 0) {
      this.tableStatus = PAGE_STATUS.LOADING;
      const notify_success = await this.campaignsStore.deleteCampaigns(
        this.campaignsIdsSelected,
        this.refreshTableCampaignsList,
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
      this.campaignsStore.searchCampaigns(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander,
        this.dataFilter,
        paginationStep,
        this.pageSize
      );
    } else {
      this.campaignsStore.fetchCampaigns(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander,
        paginationStep,
        this.pageSize
      );
    }
  };

  searchCampaign = (dataFilter, page = 1) => {
    if (dataFilter.start_date && dataFilter.end_date) {
      const end = moment(dataFilter.end_date).endOf('day');
      const start_date = moment.utc(dataFilter.start_date).format();
      const end_date = moment.utc(end).format();
      dataFilter.start_date = start_date;
      dataFilter.end_date = end_date;
    }

    this.dataFilter = dataFilter;
    this.campaignsStore.searchCampaigns(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter,
      page,
      this.pageSize
    );
  };

  getContentByIdExpanded = async (campaignId) => {
    if (!this.contentStore) {
      return null;
    }
    try {
      const contentDataModels = await this.contentStore.getContentsByCampaignIDs([campaignId], 20);
      return contentDataModels;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  setFilter = (data, key) => {
    this.dataFilter = { searchText: '', columns: [], titleFilter: {}, datetime: null, page: '' };
    switch (key) {
      // keep searchText when render
      case 1:
        return (this.dataFilter.searchText = data);
      // keep columns hide when render
      case 2:
        return (this.dataFilter.columns = data);
      // keep title filter when render
      case 3:
        return (this.dataFilter.titleFilter = data);
      // keep datetime filter when render
      case 4:
        return (this.dataFilter.datetime = data);
      // keep page when render
      case 5:
        return (this.dataFilter.page = data);
      case 6:
        this.dataFilter.searchText = '';
        this.dataFilter.columns = [];
        this.dataFilter.titleFilter = {};
        this.dataFilter.datetime = null;
        this.dataFilter.page = '';
        break;
      default:
        return null;
    }
  };

  resetObservableProperties = () => {
    this.campaigns = null;
    this.pagination = null;
    this.tableRowHeader = null;
    this.dataFilter = null;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.campaignsIdsSelected = null;
    this.contentStore = null;
    this.subRowDataTable = null;
    this.pageSize = 5;
  };

  callbackOnErrorHander = () => {
    this.tableStatus = PAGE_STATUS.READY;
    this.campaigns = null;
  };

  callbackOnSuccessHandler = (campaignsModelData) => {
    if (campaignsModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = CampaignsUtils.transformCampaignsModelIntoTableDataRow(
        campaignsModelData.list
      );
      this.campaigns = rowDataTransformed;
      this.pagination = campaignsModelData.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default CampaignsListViewModel;
