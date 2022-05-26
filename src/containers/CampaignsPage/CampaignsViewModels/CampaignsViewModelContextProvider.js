/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from "react";
const CampaignsViewModelContext = React.createContext();

export const CampaignsViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <CampaignsViewModelContext.Provider value={viewModel}>
      {children}
    </CampaignsViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useCampaignsViewModel = () =>
  React.useContext(CampaignsViewModelContext);

/* HOC to inject store to any functional or class component */
export const withCampaignsViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useCampaignsViewModel()} />;
};
