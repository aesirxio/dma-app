import React from 'react';
export const ContentViewModelContext = React.createContext();

export const ContentViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ContentViewModelContext.Provider value={viewModel}>
      {children}
    </ContentViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useContentViewModel = () => React.useContext(ContentViewModelContext);

/* HOC to inject store to any functional or class component */
export const withContentViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useContentViewModel()} />;
};

export const AdsContext = React.createContext();
