import React from "react";
const ProjectTableSelectionModalViewModelContext = React.createContext();

export const ProjectTableSelectionModalViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ProjectTableSelectionModalViewModelContext.Provider value={viewModel}>
      {children}
    </ProjectTableSelectionModalViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProjectTableSelectionModalViewModel = () =>
  React.useContext(ProjectTableSelectionModalViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProjectTableSelectionModalViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useProjectTableSelectionModalViewModel()} />;
};
