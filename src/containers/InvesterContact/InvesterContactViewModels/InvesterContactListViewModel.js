import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import { notify } from "../../../components/Toast";

class InvesterContactListViewModel {
  investerContactStore = null;

  investerContact = null;

  tableStatus = PAGE_STATUS.LOADING;

  constructor(investerContactStore) {
    makeAutoObservable(this);
    this.investerContactStore = investerContactStore;
  }
}

export default InvesterContactListViewModel;
