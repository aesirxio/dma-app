/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from "react";
const ProjectViewModelContext = React.createContext();

export const ProjectViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ProjectViewModelContext.Provider value={viewModel}>
      {children}
    </ProjectViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProjectViewModel = () =>
  React.useContext(ProjectViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProjectViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useProjectViewModel()} />;
};
