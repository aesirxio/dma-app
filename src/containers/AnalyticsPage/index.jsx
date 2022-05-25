import React, { Component, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import AnalyticsStore from './AnalyticsStore/AnalyticsStore';
import AnalyticsViewModel from './AnalyticsViewModels/AnalyticsViewModel';
import { AnalyticsViewModelContextProvider } from './AnalyticsViewModels/AnalyticsViewModelContextProvider';
import AnalyticsList from './AnalyticsList/AnalyticsList';

const analyticsStore = new AnalyticsStore();
const analyticsViewModel = new AnalyticsViewModel(analyticsStore);

class AnalyticsPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <AnalyticsViewModelContextProvider viewModel={analyticsViewModel}>
        {/* <AnalyticsList /> */}
        <h3>Only Agency Mode</h3>
      </AnalyticsViewModelContextProvider>
    );
  }
}

export default AnalyticsPage;
