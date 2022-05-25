import React, { lazy } from 'react';

import { Route } from 'react-router-dom';
import BillingPlanStore from '../BillingPlanPage/BillingPlanStore/BillingPlanStore';
import BillingPlanViewModel from '../BillingPlanPage/BillingPlanViewModel/BillingPlanViewModel';
import { BillingPlanViewModelContextProvider } from '../BillingPlanPage/BillingPlanViewModel/BillingPlanViewModelContextProvider';
import BillingPlanQuotas from './BillingPlanList/BillingPlanQuotas';
import GlobalStore from '../../store/Store';
import ChannelsStore from '../ChannelsPage/ChannelsStore/ChannelsStore';

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;
const channelsStore = new ChannelsStore({
  globalStore: globalStore,
});
const billingPlanStore = new BillingPlanStore();
const billingPlanViewModel = new BillingPlanViewModel(billingPlanStore, channelsStore);

function BillingPlanPage({ match }) {
  return (
    <BillingPlanViewModelContextProvider viewModel={billingPlanViewModel}>
      <div className="py-4 px-3">
        <BillingPlanQuotas />
      </div>
    </BillingPlanViewModelContextProvider>
  );
}

export default BillingPlanPage;
