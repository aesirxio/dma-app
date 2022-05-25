import BillingPlanListViewModel from "./BillingPlanListViewModel";
import ChannelsListViewModel from "../../ChannelsPage/ChannelsViewModels/ChannelsListViewModel";

class BillingPlanViewModel {
  BillingPlanListViewModel = null;

  constructor(billingPlanStore, channelsStore) {
    if (billingPlanStore) {
      console.log("AnalyticsViewModel - Abstract");
      this.BillingPlanListViewModel = new BillingPlanListViewModel(
        billingPlanStore,
      );
    }
    if (channelsStore) {
      this.ChannelsListViewModel = new ChannelsListViewModel(
        channelsStore,
      )
    }
  }

  getBillingPlanListViewModel = () => this.BillingPlanListViewModel;
  getChannelsListViewModel = () => this.ChannelsListViewModel;
}

export default BillingPlanViewModel;
