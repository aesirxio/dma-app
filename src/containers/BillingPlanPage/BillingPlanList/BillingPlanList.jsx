import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withBillingPlanViewModel } from '../BillingPlanViewModel/BillingPlanViewModelContextProvider';

import Spinner from '../../../components/Spinner';
import ComponentBillingPlan from '../../../components/ComponentBillingPlan';
import ComponentPlanPayment from '../../../components/ComponentPlanPayment';
import BillingPlanInvoices from '../BillingPlanInvoices';
const ModalComponent = lazy(() => import('../../../components/Modal'));

const BillingPlanList = observer(
  class BillingPlanList extends Component {
    billingPlanListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      console.log('BillingPlanList - Debug View Model', viewModel);

      this.billingPlanListViewModel = viewModel ? viewModel.getBillingPlanListViewModel() : null;
    }

    componentDidMount() {
      console.log('init data');
      this.billingPlanListViewModel.initializeDataMemberSubscriptionDetail();
    }

    handleSelectSubscriptionPlan = (planName) => {
      this.billingPlanListViewModel.getPayLinkModel(planName);
    };

    handleChangeSubscription = (planName) => {
      console.log('handleChangeSubscription');
      this.billingPlanListViewModel.changeSubscriptionPlan(planName);
    };

    openModalChangeSubscription = () => {
      this.billingPlanListViewModel.openModal();
    };

    handleCancelPlan = () => {
      this.billingPlanListViewModel.cancelPlan();
    };

    render() {
      const { tableStatus, isDisable, show, subscriptionDetail, invoices } =
        this.billingPlanListViewModel;

      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      let planName = subscriptionDetail?.plan_name.toLowerCase()
        ? subscriptionDetail.plan_name.toLowerCase()
        : 'free';

      return (
        <div>
          {subscriptionDetail != null && subscriptionDetail.paddle_status === 'active' && (
            <div className="mb-4">
              <div className="py-3 bg-white d-inline-block">
                <ComponentPlanPayment
                  subscriptionDetail={subscriptionDetail}
                  handleChangePlan={this.openModalChangeSubscription}
                  handleCancelPlan={this.handleCancelPlan}
                />
              </div>
            </div>
          )}

          {(subscriptionDetail == null ||
            (subscriptionDetail != null && subscriptionDetail.paddle_status === 'deleted')) && (
            <div className="mb-4">
              <ComponentBillingPlan
                handleSelectSubscriptionPlan={this.handleSelectSubscriptionPlan}
                isDisable={isDisable ? isDisable : null}
                planName={planName}
              />
            </div>
          )}

          <ModalComponent
            show={show}
            onHide={this.billingPlanListViewModel.closeModal}
            dialogClassName="modal-fullscreen modal_billing_plan"
            body={
              <ComponentBillingPlan
                handleSelectSubscriptionPlan={this.handleChangeSubscription}
                isDisable={isDisable ? isDisable : null}
                planName={planName}
              />
            }
            key={Math.random(40, 200)}
          />
          <BillingPlanInvoices invoices={invoices} />
        </div>
      );
    }
  }
);

export default withBillingPlanViewModel(BillingPlanList);
