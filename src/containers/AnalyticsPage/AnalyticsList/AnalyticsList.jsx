import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withAnalyticViewModel } from '../AnalyticsViewModels/AnalyticsViewModelContextProvider';

import Spinner from '../../../components/Spinner';
import ComponentViewAnalytics from '../../../components/ComponentViewAnalytics';
import ComponentTopPosts from '../../../components/ComponentTopPosts';
import ComponentTopChannels from '../../../components/ComponentTopChannels';
import ComponentChart from '../../../components/Chart';

const dataPosts = [
  {
    key: '1',
    text: 'Post 1 - Event announcement',
    number: '1.230',
  },
  {
    key: '2',
    text: 'Post 2 - Remind event',
    number: '3.458',
  },
  {
    key: '3',
    text: 'Post 3 - Event happen',
    number: '1.100',
  },
  {
    key: '4',
    text: 'Post 4 - Thank you for joining the event',
    number: '1.230',
  },
  {
    key: '5',
    text: 'Post 5 - Event announcement',
    number: '1.230',
  },
  {
    key: '6',
    text: 'Post 6 - Remind event',
    number: '1.230',
  },
];

const dataProject = [
  {
    key: '1',
    icon: '/assets/images/icon-pepsi.png',
    text: 'Marketing Vietnam Suntory PepsiCo',
  },
  {
    key: '2',
    icon: '/assets/images/icon-nikon.png',
    text: 'Marketing Vietnam Nikon',
  },
  {
    key: '3',
    icon: '/assets/images/icon-adidas.png',
    text: 'Marketing Vietnam Adidas',
  },
  {
    key: '4',
    icon: '/assets/images/icon-levis.png',
    text: "Marketing Vietnam Levi's",
  },
  {
    key: '5',
    icon: '/assets/images/icon-gap.png',
    text: "Shop Gap for Casual Women's Men's",
  },
  {
    key: '6',
    icon: '/assets/images/icon-gap.png',
    text: 'Marketing Vietnam McDonalds',
  },
];

const dataCampaigns = [
  {
    key: '1',
    text: 'Marketing Vietnam Suntory PepsiCo',
  },
  {
    key: '2',
    text: 'Marketing Vietnam Nikon',
  },
  {
    key: '3',
    text: 'Marketing Vietnam Adidas',
  },
  {
    key: '4',
    text: "Marketing Vietnam Levi's",
  },
  {
    key: '5',
    text: "Shop Gap for Casual Women's Men's",
  },
  {
    key: '6',
    text: 'Marketing Vietnam McDonalds',
  },
];

const dataPersonas = [
  {
    key: '1',
    text: 'Marketing Vietnam Suntory PepsiCo',
  },
  {
    key: '2',
    text: 'Marketing Vietnam Nikon',
  },
  {
    key: '3',
    text: 'Marketing Vietnam Adidas',
  },
  {
    key: '4',
    text: "Marketing Vietnam Levi's",
  },
  {
    key: '5',
    text: "Shop Gap for Casual Women's Men's",
  },
  {
    key: '6',
    text: 'Marketing Vietnam McDonalds',
  },
];

const dataChannels = [
  {
    key: '1',
    icon: '/assets/images/icon-pepsi.png',
    text: 'Food Network',
    status: 'Active',
    posts: 50,
    page_likes: 1.984,
    page_views: 200.984,
  },
  {
    key: '2',
    icon: '/assets/images/icon-pepsi.png',
    text: 'BuzzFeed Food',
    status: 'Active',
    posts: 50,
    page_likes: 1.984,
    page_views: 200.984,
  },
  {
    key: '3',
    icon: '/assets/images/icon-pepsi.png',
    text: '12 Tomatoes',
    status: 'Active',
    posts: 50,
    page_likes: 1.984,
    page_views: 200.984,
  },
  {
    key: '4',
    icon: '/assets/images/icon-pepsi.png',
    text: 'Katy Perry',
    status: 'Active',
    posts: 50,
    page_likes: 1.984,
    page_views: 200.984,
  },
];

const AnalyticsList = observer(
  class AnalyticsList extends Component {
    analyticsListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      console.log('AnalyticsList - Debug View Model');
      console.log(viewModel);

      this.analyticsListViewModel = viewModel ? viewModel.getAnalyticsListViewModel() : null;
    }

    render() {
      const { tableStatus } = this.analyticsListViewModel;

      return tableStatus === PAGE_STATUS.READY ? (
        <Spinner />
      ) : (
        <div className="py-4 px-3 d-none">
          <div className="row mb-4">
            <div className="col-6">
              <ComponentViewAnalytics
                title={'All Projects'}
                number={100}
                data={dataProject}
                name="Project Name"
                isStatus={true}
              />
            </div>
            <div className="col-6">
              <ComponentViewAnalytics
                title={'Total Campaigns'}
                number={1.52}
                data={dataCampaigns}
                name="Campaign Name"
                isStatus={true}
              />
            </div>
          </div>
          <div className="bg-white p-3 rounded-2 mb-4">
            <div className="row">
              <div className="col-7">
                <div className="mb-3">
                  <h4 className="mb-3">Top Posts</h4>
                  <ComponentChart />
                </div>
              </div>
              <div className="col-5">
                <ComponentTopPosts data={dataPosts} />
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="row">
              <div className="col-8 p-3 bg-white">
                <ComponentTopChannels data={dataChannels} />
              </div>
              <div className="col-4">
                <ComponentViewAnalytics
                  titleLg={'Top Personas'}
                  data={dataPersonas}
                  name="Persona name"
                  isStatus={false}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default withAnalyticViewModel(AnalyticsList);
