/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from "react";
const WizardViewModelContext = React.createContext();

export const WizardViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <WizardViewModelContext.Provider value={viewModel}>
      {children}
    </WizardViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useWizardViewModel = () =>
  React.useContext(WizardViewModelContext);

/* HOC to inject store to any functional or class component */
export const withWizardViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useWizardViewModel()} />;
};
