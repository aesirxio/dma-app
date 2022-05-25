import { makeAutoObservable, runInAction } from 'mobx';
import { BILLING_PLAN_COLUMN_INDICATOR } from '../../../constants/BillingPlanModule';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';

class BillingPlanListViewModel {
  billingPlanStore = null;
  tableStatus = PAGE_STATUS.READY;
  isDisable = false;
  show = false;
  hideChangePlanTable = true;
  paddleData = null;
  subscriptionDetail = null;
  invoices = [];
  uploadHistoryQuotas = null;

  constructor(billingPlanStore, channelsStore) {
    makeAutoObservable(this);
    this.billingPlanStore = billingPlanStore;
    this.channelsStore = channelsStore;
  }

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  initializeDataMemberSubscriptionDetail = async () => {
    this.tableStatus = PAGE_STATUS.LOADING;

    const response = await this.billingPlanStore.getMemberSubscriptionDetail();

    console.log('paddle - initializeData', response);
    console.log(response);

    runInAction(() => {
      this.subscriptionDetail = response?.subscription && Object.assign({}, response.subscription);
      console.log('setup - get member detail', this.subscriptionDetail);
      this.paddleData = response?.paddleData;

      if (this.subscriptionDetail == null) {
        this.hideChangePlanTable = false;
      } else {
        this.initializeDataMemberInvoices();
      }
    });

    let that = this;

    (function (document, url) {
      var script = document.createElement('script');
      script.src = url;
      script.onload = function () {
        (async function () {
          runInAction(() => {
            that.setupPaddle();

            that.tableStatus = PAGE_STATUS.READY;
          });
        })();
      };
      document.body.appendChild(script);
    })(document, 'https://cdn.paddle.com/paddle/paddle.js');
  };

  initializeDataMemberInvoices() {
    //get member invoices
    this.billingPlanStore.getMemberInvoices(
      (response) => {
        this.invoices = response;
        console.log('initializeDataMemberInvoices', this.invoices);
      },
      (error) => {}
    );
  }

  initializeDataMemberUploadHistoryQuotas() {
    //get upload history response
    this.billingPlanStore.getMemberUploadHistoryQuotas(
      (response) => {
        this.uploadHistoryQuotas = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // initializeData = (callback) => {
  //   //get init member subscription detail
  //   this.billingPlanStore.getMemberSubscriptionDetail(
  //     (response) => {
  //       console.log('paddle - initializeData',response);
  //       console.log(response);
  //       this.subscriptionDetail = response.subscription && Object.assign({}, response.subscription);
  //       console.log('setup - get member detail', this.subscriptionDetail);
  //       this.paddleData = response.paddleData;
  //       if (this.subscriptionDetail == null) {
  //         this.hideChangePlanTable = false;
  //       }
  //       callback && callback()
  //       this.setupPaddle();
  //     },
  //     (error) => {}
  //   );

  //   //get member invoices
  //   this.billingPlanStore.getMemberInvoices(
  //     (response) => {
  //       this.invoices = response.list && response.list.slice();
  //     },
  //     (error) => {}
  //   );

  //   //get upload history response
  //   this.billingPlanStore.getMemberUploadHistoryQuotas(
  //     (response) => {
  //       this.uploadHistoryQuotas = response.data;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  // };

  setupPaddle() {
    //init Paddle
    console.log('setupPaddle', this.paddleData.vendorId);

    this.Paddle = window.Paddle;
    this.Paddle.Setup({
      vendor: parseInt(this.paddleData.vendorId), // paddle vendor id
      // vendor: 1507, // paddle vendor id
      eventCallback: function (data) {
        // The data.event will specify the event type
        if (data.event === 'Checkout.Complete') {
          console.log('Complete');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else if (data.event === 'Checkout.Close') {
          console.log('Close');
        }

        console.log(data.eventData);
      },
    });
  }

  // //get pay link
  // getPayLinkModel = (planName) => {
  //   this.closeModal();

  //   //only get pay link when subscription plan detail is empty
  //   if (this.subscriptionDetail === null) {
  //     this.Paddle.Spinner.show();
  //     this.billingPlanStore.getPayLink(
  //       planName,
  //       (response) => {
  //         this.Paddle.Spinner.hide();
  //         if (response && response.result.pay_link) {
  //           this.Paddle.Checkout.open({
  //             override: response.result.pay_link,
  //           });
  //         } else {
  //           this.tableStatus = PAGE_STATUS.ERROR;
  //         }
  //       },
  //       (error) => {
  //         this.Paddle.Spinner.hide();
  //         notify(error.message);
  //       }
  //     );
  //   } else {
  //     this.changeSubscriptionPlan(planName);
  //   }
  // };

  //get pay link
  getPayLinkModel = (planName) => {
    this.closeModal();
    //only get pay link when subscription plan detail is empty
    if (
      this.subscriptionDetail === null ||
      this.subscriptionDetail === undefined ||
      this.subscriptionDetail.paddle_status === 'deleted'
    ) {
      this.Paddle?.Spinner.show();
      this.billingPlanStore.getPayLink(
        planName,
        (response) => {
          this.Paddle.Spinner.hide();
          if (response.result) {
            this.Paddle.Checkout.open({
              override: response.result,
            });
          } else {
            this.tableStatus = PAGE_STATUS.ERROR;
          }
        },
        (error) => {
          this.Paddle?.Spinner.hide();
          notify(error.message);
        }
      );
    } else {
      this.changeSubscriptionPlan(planName);
    }
  };

  //upgrade subscription plan
  changeSubscriptionPlan = (planName) => {
    this.closeModal();
    this.Paddle = window.Paddle;
    this.Paddle.Spinner.show();
    this.billingPlanStore.changeSubscriptionPlan(
      planName,
      (response) => {
        console.log('model - changeSubscriptionPlan');
        console.log(response);
        this.Paddle.Spinner.hide();
        if (response.result === true) {
          notify('Update subscription success');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          notify(response, 'error');
        }
      },
      (response) => {
        this.Paddle.Spinner.hide();
        notify(response.message, 'error');
      }
    );
  };

  //cancel plan
  cancelPlan = () => {
    this.Paddle = window.Paddle;
    this.Paddle.Spinner.show();
    this.billingPlanStore.cancelSubscription(
      (response) => {
        this.Paddle.Spinner.hide();
        if (response === true) {
          notify('Cancel subscription success');
          this.hideChangePlanTable = false;
          this.subscriptionDetail.paddle_status = 'deleted';
        } else {
          notify(response, 'error');
        }
      },
      (response) => {
        this.Paddle.Spinner.hide();
        notify(response.message, 'error');
      }
    );
  };

  //get upload history quotas
  getUploadHistoryQuotas = () => {
    let data = this.billingPlanStore.getMemberUploadHistoryQuotas(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    return data;
  };
}

export default BillingPlanListViewModel;
