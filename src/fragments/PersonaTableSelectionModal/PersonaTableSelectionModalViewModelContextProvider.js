/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
const PersonaTableSelectionModalViewModelContext = React.createContext();

export const PersonaTableSelectionModalViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <PersonaTableSelectionModalViewModelContext.Provider value={viewModel}>
      {children}
    </PersonaTableSelectionModalViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const usePersonaTableSelectionModalViewModel = () =>
  React.useContext(PersonaTableSelectionModalViewModelContext);

/* HOC to inject store to any functional or class component */
export const withPersonaTableSelectionModalViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={usePersonaTableSelectionModalViewModel()} />;
};
