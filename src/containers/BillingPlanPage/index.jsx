import React, { lazy } from "react";

import { Route } from "react-router-dom";
import BillingPlanStore from "./BillingPlanStore/BillingPlanStore";
import BillingPlanViewModel from "./BillingPlanViewModel/BillingPlanViewModel";
import { BillingPlanViewModelContextProvider } from "./BillingPlanViewModel/BillingPlanViewModelContextProvider";
import BillingPlanList from "./BillingPlanList/BillingPlanList";
import GlobalStore from '../../store/Store';
import ChannelsStore from '../ChannelsPage/ChannelsStore/ChannelsStore';

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;
const channelsStore = new ChannelsStore({
  globalStore: globalStore
});
const billingPlanStore = new BillingPlanStore();
const billingPlanViewModel = new BillingPlanViewModel(billingPlanStore, channelsStore);

function BillingPlanPage({ match }) {
  return (
    <BillingPlanViewModelContextProvider viewModel={billingPlanViewModel}>
      <div className="py-4 px-3">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="text-blue-0">Billing & Plan</h2>
        </div>
        <BillingPlanList />
      </div>
    </BillingPlanViewModelContextProvider>
  );
}

export default BillingPlanPage;
