import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import ProjectUtils from '../ProjectUtils/ProjectUtils';
import { PROJECT_COLUMN_INDICATOR } from '../../../constants/ProjectModule';
import { notify } from '../../../components/Toast';
import Helper from '../../../utils/helper';
class ProjectsListViewModel {
  projectStore = null;

  projects = null;

  pagination = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  projectIdsSelected = null;

  dataFilter = null;

  isList = true;

  pageSize = 5;

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
    this.projectIdsSelected = null;
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

  deleteProjects = () => {
    let getArrayId = this.projectIdsSelected;

    if (getArrayId.length > 0) {
      if (Helper.confirmDeleteItem()) {
        this.tableStatus = PAGE_STATUS.LOADING;
        this.projectStore.deleteProjects(
          this.projectIdsSelected,
          this.refreshTableProjectList,
          this.callbackOnErrorHander
        );
      }
    } else {
      notify('Please choose an item to delete');
    }
  };

  getPagination = (paginationStep, isList, limit = 5) => {
    console.log('paginationStep', paginationStep);
    this.pageSize = limit;
    console.log(this.isFilter);
    console.log(this.dataFilter);
    console.log(this.pageSize);
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

  searchProjects = (dataFilter) => {
    this.dataFilter = dataFilter;
    this.projectStore.searchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter,
      0,
      this.pageSize
    );
  };

  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHandler');
    console.log(error);
    if (error.message === 'No result') {
      this.projects = [];
    }

    this.tableStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (projectModelData) => {
    console.log('callbackOnSuccessHandler');
    console.log(projectModelData);
    if (projectModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = ProjectUtils.transformProjectModelIntoTableDataRow(
        projectModelData.list
      );

      console.log('Row Data is Formatted');
      console.log(rowDataTransformed);

      this.projects = rowDataTransformed;
      this.pagination = projectModelData.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default ProjectsListViewModel;
