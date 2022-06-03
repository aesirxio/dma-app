/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
const CampaignTableSelectionModalViewModelContext = React.createContext();

export const CampaignTableSelectionModalViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <CampaignTableSelectionModalViewModelContext.Provider value={viewModel}>
      {children}
    </CampaignTableSelectionModalViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useCampaignTableSelectionModalViewModel = () =>
  React.useContext(CampaignTableSelectionModalViewModelContext);

/* HOC to inject store to any functional or class component */
export const withCampaignTableSelectionModalViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useCampaignTableSelectionModalViewModel()} />;
};
