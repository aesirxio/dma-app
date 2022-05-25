import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withChannelsViewModel } from '../ChannelsViewModels/ChannelsViewModelContextProvider';
import Spinner from '../../../components/Spinner';
import { Tab, Tabs } from 'react-bootstrap';
import ChannelType from './ChannelType';
import ChannelCallbackNotify from '../../../websocket/ChannelCallbackNotify';
import './index.scss';
import Upgrade from '../../../components/Upgrade';
const ModalComponent = lazy(() => import('../../../components/Modal'));

const ChannelsList = observer(
  class ChannelsList extends Component {
    channelsListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;

      this.channelsListViewModel = viewModel ? viewModel.getChannelsListViewModel() : null;

      console.log('ChannelsList - Debug View Model', this.channelsListViewModel);

      ChannelCallbackNotify.__init(this.channelsListViewModel);
    }

    componentDidMount() {
      this.channelsListViewModel.init();
    }

    componentWillUnmount() {
      this.channelsListViewModel.reset();
    }

    render() {
      const { tableStatus, channelsData } = this.channelsListViewModel;

      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      console.log('ChannelsList - render', channelsData);

      return (
        <div className="py-4 px-3">
          <h2 className="text-blue-0 mb-4">Connect a Channel</h2>
          <div className="wrapper_tabs">
            <Tabs defaultActiveKey="0" id="connectContent-tab" className="bg-white border-0">
              {channelsData.map((channelCategory, index) => (
                <Tab key={index} eventKey={index} title={channelCategory.name}>
                  <ChannelType channelCategory={channelCategory} channelTypeIndex={index} />
                </Tab>
              ))}
            </Tabs>
          </div>
          <ModalComponent
            show={this.channelsListViewModel.showUpgrade}
            onHide={this.channelsListViewModel.closeModalUpgrade}
            header={'Please upgrade account'}
            body={<Upgrade></Upgrade>}
            key={Math.random(40, 200)}
          />
        </div>
      );
    }
  }
);

export default withChannelsViewModel(ChannelsList);
