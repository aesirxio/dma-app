/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import { AesirxBillingPlanApiService } from 'aesirx-dma-lib';
import { AesirxNewsApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
export default class HomeStore {
  getMemberSubscriptionDetail = async () => {
    try {
      const billingPlanService = new AesirxBillingPlanApiService();

      return await billingPlanService.getMemberSubscriptionDetail();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getNews = async (callbackOnSuccess, callbackOnError) => {
    try {
      const newsService = new AesirxNewsApiService();
      const responsedDataFromLibary = await newsService.getNews();
      console.log('News - getNews from API', responsedDataFromLibary);
      if (responsedDataFromLibary) {
        runInAction(() => {
          callbackOnSuccess(responsedDataFromLibary);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
