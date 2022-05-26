/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from "react";
const InvesterContactViewModelContext = React.createContext();

export const InvesterContactViewModelContextProvider = ({
  children,
  viewModel,
}) => {
  return (
    <InvesterContactViewModelContext.Provider value={viewModel}>
      {children}
    </InvesterContactViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useInvesterContactViewModel = () =>
  React.useContext(InvesterContactViewModelContext);

/* HOC to inject store to any functional or class component */
export const withInvesterContactViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useInvesterContactViewModel()} />;
};
