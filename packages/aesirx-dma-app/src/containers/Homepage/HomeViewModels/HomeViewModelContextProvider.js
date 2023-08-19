/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
const HomeViewModelContext = React.createContext();

export const HomeViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <HomeViewModelContext.Provider value={viewModel}>{children}</HomeViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useHomeViewModel = () => React.useContext(HomeViewModelContext);

/* HOC to inject store to any functional or class component */
export const withHomeViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useHomeViewModel()} />;
};
