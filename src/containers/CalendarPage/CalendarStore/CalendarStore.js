/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import { runInAction } from 'mobx';

import CalendarUtils from '../CalendarUtils/CalendarUtils';

import { AUTHORIZATION_KEY, AesirxContentApiService, Storage } from 'aesirx-dma-lib';

export default class CalendarStore {
  async fetchPlanning(callbackOnSuccess, callbackOnError, dataFilter) {
    try {
      const contentService = new AesirxContentApiService();

      const memberId = Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID) ?? 0;
      const resultEventsContent = await contentService.getScheduleChannel(memberId);

      if (resultEventsContent) {
        runInAction(() => {
          callbackOnSuccess({
            event: resultEventsContent.data,
          });
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
}
