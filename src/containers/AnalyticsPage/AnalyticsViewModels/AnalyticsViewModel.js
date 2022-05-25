import AnalyticsListViewModel from "./AnalyticsListViewModel";

class AnalyticsViewModel {
  AnalyticsListViewModel = null;

  constructor(analyticsStore) {
    if (analyticsStore) {
      console.log("AnalyticsViewModel - Abstract");
      this.AnalyticsListViewModel = new AnalyticsListViewModel(analyticsStore);
    }
  }

  getAnalyticsListViewModel = () => this.AnalyticsListViewModel;
}

export default AnalyticsViewModel;
