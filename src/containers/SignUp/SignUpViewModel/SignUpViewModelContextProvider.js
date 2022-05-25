import React from "react";
const SignUpViewModelContext = React.createContext();

export const SignUpViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <SignUpViewModelContext.Provider value={viewModel}>
      {children}
    </SignUpViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useSignUpViewModel = () =>
  React.useContext(SignUpViewModelContext);

/* HOC to inject store to any functional or class component */
export const withSignUpViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useSignUpViewModel()} />;
};
