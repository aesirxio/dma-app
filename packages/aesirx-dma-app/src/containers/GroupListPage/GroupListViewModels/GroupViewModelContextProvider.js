/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
const GroupViewModelContext = React.createContext();

export const GroupViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <GroupViewModelContext.Provider value={viewModel}>{children}</GroupViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useGroupViewModel = () => React.useContext(GroupViewModelContext);

/* HOC to inject store to any functional or class component */
export const withGroupViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useGroupViewModel()} />;
};
