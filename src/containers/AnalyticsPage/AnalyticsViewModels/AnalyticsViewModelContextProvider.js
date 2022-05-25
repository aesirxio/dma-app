import React from "react";
const AnalyticViewModelContext = React.createContext();

export const AnalyticsViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <AnalyticViewModelContext.Provider value={viewModel}>
      {children}
    </AnalyticViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useAnalyticViewModel = () =>
  React.useContext(AnalyticViewModelContext);

/* HOC to inject store to any functional or class component */
export const withAnalyticViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useAnalyticViewModel()} />;
};
