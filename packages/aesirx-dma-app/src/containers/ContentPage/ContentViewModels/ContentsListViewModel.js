/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import ContentUtils from '../ContentUtils/ContentUtils';
import { notify } from 'aesirx-uikit';
import ChannelsStore from '../../ChannelsPage/ChannelsStore/ChannelsStore';
import { CONTENT_FIELD_KEY } from '../../../constants/ContentModule';
import moment from 'moment';
class ContentsListViewModel {
  contentStore = null;

  contents = null;
  showView = 'month';
  showDate = new Date();
  tableStatus = PAGE_STATUS.LOADING;

  dataFilter = null;
  channelMasterData = [];
  contentIdsSelected = [];

  pageSize = 5;
  page = 1;
  plaining = [];
  constructor(contentStore) {
    makeAutoObservable(this);
    this.contentStore = contentStore;
    this.channelStore = new ChannelsStore();
  }

  initializeData = async () => {
    const channelsData = await this.channelStore.getChannelsData();

    this.contentStore.searchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.dataFilter,
      this.page,
      this.pageSize
    );
    runInAction(() => {
      this.channelMasterData = channelsData;
    });
  };

  resetObservableProperties = () => {
    this.contents = null;
    this.pagination = null;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.dataFilter = null;
    this.isList = true;
    this.pageSize = 5;
  };

  getPagination = (paginationStep, isList, limit = 5) => {
    this.pageSize = limit;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.isList = isList;

    // if (this.dataFilter !== null) {
    this.contentStore.searchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.dataFilter,
      paginationStep,
      this.pageSize
    );
    // }
  };

  initCalendarData = async () => {
    await this.fetchPlaing(
      {
        [CONTENT_FIELD_KEY.START_DATE]: moment().startOf('month').format('YYYY-MM-DD'),
        [CONTENT_FIELD_KEY.END_DATE]: moment().endOf('month').format('YYYY-MM-DD'),
      },
      0,
      0
    );
    await this.searchContents(
      {
        [CONTENT_FIELD_KEY.START_DATE]: moment().startOf('month').format('YYYY-MM-DD'),
        [CONTENT_FIELD_KEY.END_DATE]: moment().endOf('month').format('YYYY-MM-DD'),
      },
      0,
      0
    );
  };

  searchContents = async (dataFilter = {}, page = 1, pageSize = this.pageSize) => {
    this.dataFilter = { ...this.dataFilter, ...dataFilter };
    await this.contentStore.searchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.dataFilter,
      page,
      pageSize
    );
  };

  deleteContents = async () => {
    let getArrayId = this.contentIdsSelected;
    console.warn(this.contentIdsSelected);
    if (getArrayId.length > 0) {
      this.tableStatus = PAGE_STATUS.LOADING;
      const notify_success = await this.contentStore.deleteContents(
        this.contentIdsSelected,
        this.searchContents,
        this.callbackOnErrorHander
      );
      if (notify_success?.result) {
        notify('Delete success', 'success');
      }
    } else {
      notify('Please choose an item to delete', 'warn');
    }
  };

  fetchPlaing = async (dataFilter = this.dataFilter, page = 1, pageSize = this.pageSize) => {
    await this.contentStore.searchPlanning(
      this.callbackOnSuccessPlaingHandler,
      this.callbackOnErrorHander,
      dataFilter,
      page,
      pageSize
    );
  };

  getContentByIdExpanded = async (contentId) => {
    return await this.contentStore.getListContentChannelItem(contentId);
  };

  callbackOnErrorHander = (error) => {
    if (error.message === 'No result') {
      this.contents = [];
    }

    this.tableStatus = PAGE_STATUS.READY;
  };

  toModelEvents = (data) => {
    const mapData = data.map((item) => {
      return {
        ...item,
        created_date: new Date(item.created_date),
        end: new Date(item.end_date),
        start: new Date(item.start_date),
        type: 'planing',
        channel: [],
      };
    });
    return mapData;
  };

  callbackOnSuccessPlaingHandler = (contentsModelData) => {
    if (contentsModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = this.toModelEvents(contentsModelData.list);

      this.plaining = rowDataTransformed;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  callbackOnSuccessHandler = (contentsModelData) => {
    if (contentsModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = ContentUtils.transformContentModelIntoTableDataRow(
        contentsModelData.list
      );

      this.contents = rowDataTransformed;
      this.pagination = contentsModelData.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default ContentsListViewModel;
