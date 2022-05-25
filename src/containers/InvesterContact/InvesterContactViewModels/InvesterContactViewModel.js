import InvesterContactListViewModel from "./InvesterContactListViewModel";
import InvesterContactFormViewModel from "./InvesterContactFormViewModel";

class InvesterContactViewModel {
  InvesterContactListViewModel = null;
  InvesterContactFormViewModel = null;

  constructor(investerContactStore) {
    if (investerContactStore) {
      console.log("InvesterContactViewModel - Abstract");
      this.InvesterContactListViewModel = new InvesterContactListViewModel(
        investerContactStore
      );

      this.InvesterContactFormViewModel = new InvesterContactFormViewModel(
        investerContactStore
      );
    }
  }

  getInvesterContactListViewModel = () => this.InvesterContactListViewModel;
  getInvesterContactFormViewModel = () => this.InvesterContactFormViewModel;
}

export default InvesterContactViewModel;
