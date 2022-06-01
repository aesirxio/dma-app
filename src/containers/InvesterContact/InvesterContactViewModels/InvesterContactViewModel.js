/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import InvesterContactListViewModel from "./InvesterContactListViewModel";
import InvesterContactFormViewModel from "./InvesterContactFormViewModel";

class InvesterContactViewModel {
  InvesterContactListViewModel = null;
  InvesterContactFormViewModel = null;

  constructor(investerContactStore) {
    if (investerContactStore) {
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
