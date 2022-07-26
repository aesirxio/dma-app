/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { UPDATE_GENERAL_FIELD_KEY } from '../../../constants/ProfileModule';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-dma-lib';

class UpdateGeneralViewModel {
  profileStore = null;
  formStatus = PAGE_STATUS.READY;
  updateGeneralViewModel = null;
  memberInfo = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(profileStore) {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  setAllValue = (updateGeneralViewModel) => {
    this.updateGeneralViewModel = updateGeneralViewModel;
  };

  setForm = (updateGeneralViewModel) => {
    this.updateGeneralViewModel = updateGeneralViewModel;
  };

  initializeData = () => {
    this.profileStore.getMember(
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.ID],
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  saveGeneralInformationOnPage = () => {
    this.profileStore.updateGeneral(
      this.updateGeneralViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result.content_id;
  };

  callbackOnSuccessHandler = (result) => {
    if (result.id) {
      // get member info
      this.memberInfo = result;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME] =
        result.full_name;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME] =
        result.username;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.EMAIL] = result.email;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.BIRTHDAY] = result.birthday
        ? result.birthday.substr(0, 10) + ' 00:00:00'
        : null;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE] = result.phone;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS] = result.address;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS_2] =
        result.address_2;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] =
        result.avatar_dam ? result.avatar_dam : '/assets/images/user_default.png';
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.ZIPCODE] = result.zipcode;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.CITY] = result.city;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.STATE] = result.state;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.COUNTRY] = result.country;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.TIMEZONE] =
        result.timezone;
    } else {
      if (this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] != null) {
        Storage.setItem(
          AUTHORIZATION_KEY.AVATAR,
          this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM]
        );
      }
      notify('Update successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };
}

export default UpdateGeneralViewModel;
