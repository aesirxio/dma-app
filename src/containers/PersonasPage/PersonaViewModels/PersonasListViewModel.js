import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import PersonaUtils from '../PersonaUtils/PersonaUtils';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';
import Helper from '../../../utils/helper';
import { notify } from '../../../components/Toast';

class PersonasListViewModel {
  personaStore = null;

  personas = null;

  pagination = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  personaIdsSelected = null;

  pageSize = 5;

  constructor(personaStore) {
    makeAutoObservable(this);
    this.personaStore = personaStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.personaStore.fetchPersonas(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  resetObservableProperties = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.personas = null;
  };

  refreshTablePersonaList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.personaStore.fetchPersonas(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  deletePersonas = () => {
    let getArrayId = this.personaIdsSelected;

    if (getArrayId.length > 0) {
      if (Helper.confirmDeleteItem()) {
        this.tableStatus = PAGE_STATUS.LOADING;
        this.personaStore.deletePersonas(
          this.personaIdsSelected,
          this.refreshTablePersonaList,
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
    this.tableStatus = PAGE_STATUS.LOADING;

    if (this.dataFilter != null) {
      this.personaStore.searchPersonas(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander,
        this.dataFilter,
        paginationStep,
        this.pageSize
      );
    } else {
      this.personaStore.fetchPersonas(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander,
        paginationStep,
        this.pageSize
      );
    }
  };

  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHander');
    console.log(error);
    // notify(error.message);
  };

  callbackOnSuccessHandler = (personaModelData) => {
    console.log('callbackOnSuccessHandler');
    console.log(personaModelData);
    if (personaModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = PersonaUtils.transformPersonaModelIntoTableDataRow(
        personaModelData.list
      );

      console.log('Row Data is Formatted');
      console.log(rowDataTransformed);

      this.personas = rowDataTransformed;
      this.pagination = personaModelData.pagination;

      console.log('this.pagination this.pagination', this.pagination);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  searchPersonas = (dataFilter) => {
    this.dataFilter = dataFilter;

    this.personaStore.searchPersonas(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter,
      1,
      this.pageSize
    );
  };
}

export default PersonasListViewModel;
