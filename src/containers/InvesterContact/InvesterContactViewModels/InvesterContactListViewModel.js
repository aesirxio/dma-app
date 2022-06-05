/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';

class InvesterContactListViewModel {
  investerContactStore = null;

  investerContact = null;

  tableStatus = PAGE_STATUS.LOADING;

  constructor(investerContactStore) {
    makeAutoObservable(this);
    this.investerContactStore = investerContactStore;
  }
}

export default InvesterContactListViewModel;
