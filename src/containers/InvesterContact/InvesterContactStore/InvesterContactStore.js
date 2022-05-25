import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import { AesirxInvesterContactApiServ } from 'aesirx-dma-lib';
import { notify } from '../../../components/Toast';

export default class InvesterContactStore {
  async investerContactSave(callbackOnSuccess, callbackOnError, dataPost) {
    const investerContactService = new AesirxInvesterContactApiServ();
    let response = null;
    console.log('dataPost dataPost', dataPost);
    runInAction(() => {
      callbackOnSuccess(response);
    });
    setTimeout(function () {
      notify('Thank you! Your information has been submitted successfully');
    }, 1000);

    //response = await investerContactService.createInvesterContact(dataPost);

    //console.log("response dataPost", response);
    // if (response == true) {
    //   runInAction(() => {
    //     callbackOnSuccess(response);
    //   });
    // } else {
    //   callbackOnError({
    //     message: "Something went wrong from Server response",
    //   });
    // }
  }
}
