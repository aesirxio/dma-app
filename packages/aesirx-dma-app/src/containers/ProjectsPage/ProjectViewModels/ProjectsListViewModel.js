/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import ProjectUtils from '../ProjectUtils/ProjectUtils';
import { notify } from 'aesirx-uikit';
import moment from 'moment';

class ProjectsListViewModel {
  projectStore = null;

  projects = null;

  pagination = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  projectIdsSelected = [];

  dataFilter = null;

  isList = true;

  pageSize = 5;

  sort = {};

  isDesc = false;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  resetObservableProperties = () => {
    this.projects = null;
    this.pagination = null;
    this.tableRowHeader = null;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectIdsSelected = [];
    this.dataFilter = null;
    this.isList = true;
    this.pageSize = 5;
  };

  refreshTableProjectList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  deleteProjects = async () => {
    let getArrayId = this.projectIdsSelected;
    if (getArrayId.length > 0) {
      this.tableStatus = PAGE_STATUS.LOADING;
      const notify_success = await this.projectStore.deleteProjects(
        this.projectIdsSelected,
        this.refreshTableProjectList,
        this.callbackOnErrorHander
      );
      if (notify_success?.result) {
        notify('Delete success', 'success');
        runInAction(() => {
          this.projectIdsSelected = [];
        });
      }
    } else {
      notify('Please choose an item to delete', 'warn');
      runInAction(() => {
        this.projectIdsSelected = [];
      });
    }
  };

  getPagination = (paginationStep, isList, limit = 5) => {
    this.pageSize = limit;
    this.tableStatus = PAGE_STATUS.LOADING;
    this.isList = isList;

    if (this.dataFilter !== null) {
      this.projectStore.searchProjects(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander,
        this.dataFilter,
        paginationStep,
        this.pageSize
      );
    } else {
      this.projectStore.fetchProjects(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander,
        paginationStep,
        this.pageSize
      );
    }
  };

  searchProjects = (dataFilter, sort) => {
    if (sort?.direction === 'asc') {
      this.isDesc = !this.isDesc;
    } else {
      this.isDesc = false;
    }

    if (dataFilter.start_date && dataFilter.end_date) {
      const end = moment(dataFilter.end_date).endOf('day');
      const start_date = moment.utc(dataFilter.start_date).format();
      const end_date = moment.utc(end).format();
      dataFilter.start_date = start_date;
      dataFilter.end_date = end_date;
    }

    this.dataFilter = dataFilter;
    this.sort = sort;

    this.projectStore.searchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter,
      0,
      this.pageSize,
      sort
    );
  };

  callbackOnErrorHander = (error) => {
    if (error.message === 'No result') {
      this.projects = [];
    }

    this.tableStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (projectModelData) => {
    console.log('projectModelData', projectModelData);
    if (projectModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = ProjectUtils.transformProjectModelIntoTableDataRow(
        projectModelData.list
      );

      this.projects = rowDataTransformed;
      this.pagination = projectModelData.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default ProjectsListViewModel;
