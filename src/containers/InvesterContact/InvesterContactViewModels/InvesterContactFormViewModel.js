/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';

class InvesterContactFormViewModel {
  show = false;
  investerContactStore = null;

  constructor(investerContactStore) {
    makeAutoObservable(this);
    this.investerContactStore = investerContactStore;
  }

  setForm = (investerContactFormComponent) => {
    this.investerContactFormComponent = investerContactFormComponent;
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  saveInvesterContact = () => {
    this.investerContactStore.investerContactSave(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.investerContactFormComponent.formPropsData
    );
  };

  callbackOnErrorHander = (error) => {
    notify(error.message);
  };

  callbackOnSuccessHandler = () => {
    this.closeModal();
  };
}

export default InvesterContactFormViewModel;
