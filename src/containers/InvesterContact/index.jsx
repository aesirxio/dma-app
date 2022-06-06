/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from "react";
import InvesterContactStore from "./InvesterContactStore/InvesterContactStore";
import InvesterContactViewModel from "./InvesterContactViewModels/InvesterContactViewModel";
import { InvesterContactViewModelContextProvider } from "./InvesterContactViewModels/InvesterContactViewModelContextProvider";
import InvesterContactFormModal from "./InvesterContactForm/InvesterContactFormModal";

const investerContactStore = new InvesterContactStore();
const investerContactViewModel = new InvesterContactViewModel(
  investerContactStore
);

class InvesterContact extends Component {

  render() {
    return (
      <InvesterContactViewModelContextProvider
        viewModel={investerContactViewModel}
      >
        <InvesterContactFormModal />
      </InvesterContactViewModelContextProvider>
    );
  }
}

export default InvesterContact;
