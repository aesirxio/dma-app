/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

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
  };

  callbackOnSuccessHandler = (data) => {
    if (data) {
      this.status = PAGE_STATUS.READY;
      this.inspiration = data.list;
    } else {
      this.status = PAGE_STATUS.ERROR;
    }
  };
}

export default HomeListViewModel;
