/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

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
      const repondedDataFromLibrary = await this.notificationService.getNotifications(memberID);

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
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async markRead(notificationId, memberId, callbackOnSuccess, callbackOnError) {
    try {
      await this.notificationService.markRead(notificationId, memberId);

      runInAction(() => {
        callbackOnSuccess();
      });
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async markReadAll(memberId, callbackOnSuccess, callbackOnError) {
    try {
      await this.notificationService.markReadAll(memberId);

      runInAction(() => {
        callbackOnSuccess();
      });
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
