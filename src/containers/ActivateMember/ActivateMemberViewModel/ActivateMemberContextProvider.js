import React from "react";
const ActivateMemberViewModelContext = React.createContext();

export const ActivateMemberViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ActivateMemberViewModelContext.Provider value={viewModel}>
      {children}
    </ActivateMemberViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useActivateMemberViewModel = () =>
  React.useContext(ActivateMemberViewModelContext);

/* HOC to inject store to any functional or class component */
export const withActivateMemberViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useActivateMemberViewModel()} />;
};
