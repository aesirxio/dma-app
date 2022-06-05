/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { logout } from '../../../auth';
import { notify } from '../../../components/Toast';

class UpdatePasswordViewModel {
  profileStore = null;
  formStatus = PAGE_STATUS.READY;
  updatePasswordViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(profileStore) {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  setAllValue = (updatePasswordViewModel) => {
    this.updatePasswordViewModel = updatePasswordViewModel;
  };

  savePasswordInformationOnPage = () => {
    this.profileStore.updatePassword(
      this.updatePasswordViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    this.successResponse.state = false;
    this.successResponse.content_id = error.result.content_id;
  };

  callbackOnSuccessHandler = () => {
    logout();
    notify('Change password successfully, please re-login with your new password.', 'success');
  };
}

export default UpdatePasswordViewModel;
