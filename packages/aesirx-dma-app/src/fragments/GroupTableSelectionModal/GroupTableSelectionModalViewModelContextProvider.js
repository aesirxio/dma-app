/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
const GroupTableSelectionModalViewModelContext = React.createContext();

export const GroupTableSelectionModalViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <GroupTableSelectionModalViewModelContext.Provider value={viewModel}>
      {children}
    </GroupTableSelectionModalViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useGroupTableSelectionModalViewModel = () =>
  React.useContext(GroupTableSelectionModalViewModelContext);

/* HOC to inject store to any functional or class component */
export const withGroupTableSelectionModalViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useGroupTableSelectionModalViewModel()} />;
};
