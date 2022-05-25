import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import InvesterContactStore from "./InvesterContactStore/InvesterContactStore";
import InvesterContactViewModel from "./InvesterContactViewModels/InvesterContactViewModel";
import { InvesterContactViewModelContextProvider } from "./InvesterContactViewModels/InvesterContactViewModelContextProvider";
import InvesterContactList from "./InvesterContactList/InvesterContactList";
import InvesterContactFormModal from "./InvesterContactForm/InvesterContactFormModal";

const investerContactStore = new InvesterContactStore();
const investerContactViewModel = new InvesterContactViewModel(
  investerContactStore
);

class InvesterContact extends Component {
  // constructor(props) {
  //   super(props);
  // }

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
