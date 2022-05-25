import React from "react";
const BillingPlanViewModelContext = React.createContext();

export const BillingPlanViewModelContextProvider = ({
  children,
  viewModel,
}) => {
  return (
    <BillingPlanViewModelContext.Provider value={viewModel}>
      {children}
    </BillingPlanViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useBillingPlanViewModel = () =>
  React.useContext(BillingPlanViewModelContext);

/* HOC to inject store to any functional or class component */
export const withBillingPlanViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useBillingPlanViewModel()} />;
};
