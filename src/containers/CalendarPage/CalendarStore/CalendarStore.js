import { runInAction } from 'mobx';

import CalendarUtils from '../CalendarUtils/CalendarUtils';

import { AUTHORIZATION_KEY, AesirxContentApiService, Storage } from 'aesirx-dma-lib';

export default class CalendarStore {
  async fetchPlanning(callbackOnSuccess, callbackOnError, dataFilter) {
    try {
      console.log('Calendar Store - Fetch Content');
      const contentService = new AesirxContentApiService();

      console.log('Calendar events result');
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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
