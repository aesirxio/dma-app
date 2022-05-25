import React from 'react';

const VerifyEmailViewModelContext = React.createContext();

export const VerifyEmailViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <VerifyEmailViewModelContext.Provider value={viewModel}>
      {children}
    </VerifyEmailViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useVerifyEmailViewModel = () =>
  React.useContext(VerifyEmailViewModelContext);

/* HOC to inject store to any functional or class component */
export const withVerifyEmailViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useVerifyEmailViewModel()} />;
};
