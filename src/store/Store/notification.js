import React from 'react';
import { runInAction } from 'mobx';

import { AesirxNotificationApiService } from 'aesirx-dma-lib';

export default class NotificationStore {
  globalStore = null;
  notificationService = null;

  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }

    this.notificationService = new AesirxNotificationApiService();
  }

  async getNotificationsService(memberID, callbackOnSuccess, callbackOnError) {
    try {
      console.log('Notification Store - Fetch Notification');
      const repondedDataFromLibrary = await this.notificationService.getNotifications(memberID);

      console.log('repondedDataFromLibrary repondedDataFromLibrary 32423432');
      console.log(repondedDataFromLibrary);

      if (repondedDataFromLibrary) {
        runInAction(() => {
          callbackOnSuccess(repondedDataFromLibrary);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async markRead(notificationId, memberId, callbackOnSuccess, callbackOnError) {
    try {
      console.log('Notification Store - Fetch Notification');
      await this.notificationService.markRead(notificationId, memberId);

      runInAction(() => {
        callbackOnSuccess();
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async markReadAll(memberId, callbackOnSuccess, callbackOnError) {
    try {
      console.log('Notification Store - Fetch Notification');
      await this.notificationService.markReadAll(memberId);

      runInAction(() => {
        callbackOnSuccess();
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
