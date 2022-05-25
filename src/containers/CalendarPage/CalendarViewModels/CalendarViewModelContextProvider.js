import React from "react";
const CalendarViewModelContext = React.createContext();

export const CalendarViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <CalendarViewModelContext.Provider value={viewModel}>
      {children}
    </CalendarViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useCalendarViewModel = () =>
  React.useContext(CalendarViewModelContext);

/* HOC to inject store to any functional or class component */
export const withCalendarViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useCalendarViewModel()} />;
};
