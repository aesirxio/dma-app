import React from 'react';
import { runInAction } from 'mobx';

import {
  AesirxBillingPlanApiService,
  AesirxPersonaApiService,
  AUTHORIZATION_KEY,
  Storage,
} from 'aesirx-dma-lib';

export default class BillingPlanStore {
  memberId = Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID) ?? 0;

  // async getPayLink(planName, callbackOnSuccess, callbackOnError) {
  //   try {
  //     const billingPlanService = new AesirxBillingPlanApiService();
  //     let response = null;

  //     response = await billingPlanService.getPayLink(planName);

  //     if (response) {
  //       runInAction(() => {
  //         callbackOnSuccess(response);
  //       });
  //     } else {
  //       callbackOnError({
  //         message: 'Something went wrong from Server response',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     runInAction(() => {
  //       callbackOnError(error);
  //     });
  //   }
  // }

  async getPayLink(planName, callbackOnSuccess, callbackOnError) {
    try {
      console.log('================');
      const billingPlanService = new AesirxBillingPlanApiService();
      const servicePersona = new AesirxPersonaApiService();
      let response = null;

      if (planName) {
        response = await billingPlanService.createSubscription(planName);
        console.log(response);
        if (response) {
          runInAction(() => {
            callbackOnSuccess(response);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      } else {
        runInAction(() => {
          callbackOnError('Missing Plan');
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async cancelSubscription(callbackOnSuccess, callbackOnError) {
    try {
      const billingPlanService = new AesirxBillingPlanApiService();
      let response = null;

      response = await billingPlanService.cancelSubscription();
      console.log('cancelSubscription', response);
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
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

  async changeSubscriptionPlan(planName, callbackOnSuccess, callbackOnError) {
    try {
      const billingPlanService = new AesirxBillingPlanApiService();
      let response = await billingPlanService.changeSubscriptionPlan(planName);
      console.log('changeSubscriptionPlan1111', planName);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
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

  getMemberSubscriptionDetail = async () => {
    try {
      const billingPlanService = new AesirxBillingPlanApiService();

      return await billingPlanService.getMemberSubscriptionDetail();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  async getMemberInvoices(callbackOnSuccess, callbackOnError) {
    try {
      console.log('getMemberInvoices');
      const billingPlanService = new AesirxBillingPlanApiService();
      const response = await billingPlanService.getMemberInvoices();
      console.log(response);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
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

  async getMemberUploadHistoryQuotas(callbackOnSuccess, callbackOnError) {
    try {
      const billingPlanService = new AesirxBillingPlanApiService();
      let response = null;
      response = await billingPlanService.getHistoryUploadQuotas(this.memberId);

      if (response && response.status) {
        runInAction(() => {
          callbackOnSuccess(response);
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
