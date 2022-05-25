import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';

class HomeListViewModel {
  homeStore = null;

  inspiration = null;

  status = PAGE_STATUS.LOADING;

  constructor(homeStore) {
    makeAutoObservable(this);
    this.homeStore = homeStore;
  }

  initializeData = () => {
    this.status = PAGE_STATUS.LOADING;
    this.homeStore.getNews(this.callbackOnSuccessHandler, this.callbackOnErrorHander);
  };
  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHander');
    console.log(error);
    // notify(error.message);
  };

  callbackOnSuccessHandler = (data) => {
    console.log('callbackOnSuccessHandler');
    console.log(data);
    if (data) {
      this.status = PAGE_STATUS.READY;
      console.log('Inspiration data');
      this.inspiration = data.list;
    } else {
      this.status = PAGE_STATUS.ERROR;
    }
  };
}

export default HomeListViewModel;
