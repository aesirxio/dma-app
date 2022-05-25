import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import { notify } from "../../../components/Toast";

class AnalyticsListViewModel {
  analyticsStore = null;

  analytics = null;

  tableStatus = PAGE_STATUS.LOADING;

  constructor(analyticsStore) {
    makeAutoObservable(this);
    this.analyticsStore = analyticsStore;
  }
}

export default AnalyticsListViewModel;
