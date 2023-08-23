/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const ChannelsViewModelContext = React.createContext();

export const ChannelsViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ChannelsViewModelContext.Provider value={viewModel}>
      {children}
    </ChannelsViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useChannelsViewModel = () => React.useContext(ChannelsViewModelContext);

/* HOC to inject store to any functional or class component */
export const withChannelsViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useChannelsViewModel()} />;
};

const SelectedChannelsContext = React.createContext();

export const SelectedChannelsProvider = ({ children }) => {
  const [selectedChannels, setSelectedChannels] = React.useState([]);
  return (
    <SelectedChannelsContext.Provider value={{ selectedChannels, setSelectedChannels }}>
      {children}
    </SelectedChannelsContext.Provider>
  );
};

export const useSelectedChannels = () => {
  return React.useContext(SelectedChannelsContext);
};
