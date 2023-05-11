/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withChannelsViewModel } from '../ChannelsViewModels/ChannelsViewModelContextProvider';
import { Spinner } from 'aesirx-uikit';
import { Tab, Tabs } from 'react-bootstrap';
import ChannelType from './ChannelType';
import './index.scss';
import Upgrade from '../../../components/Upgrade';
import { withTranslation } from 'react-i18next';
import { env } from 'aesirx-lib';
import { notifyHTML } from 'aesirx-uikit';
const ModalComponent = lazy(() => import('../../../components/Modal'));

const ChannelsList = observer(
  class ChannelsList extends Component {
    channelsListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.channelsListViewModel = viewModel ? viewModel.getChannelsListViewModel() : null;
    }

    componentDidMount() {
      this.channelsListViewModel.init();
      this.handleMessage(this.channelsListViewModel);
    }

    handleMessage(channelsListViewModel) {
      window.addEventListener(
        'message',
        (event) => {
          if (event.origin !== env.REACT_APP_ENDPOINT_URL) return;

          if (event.data.channelConnected?.length > 0) {
            let message = 'Connected successfully: <ul>';

            event.data.channelConnected.forEach((channel) => {
              message += `<li>${channel}</li>`;
            });

            notifyHTML(message + '</ul>');

            channelsListViewModel.setChannelsDataFromMessage(event.data?.channels);
          }
        },
        false
      );
    }

    componentWillUnmount() {
      this.channelsListViewModel.reset();
      window.removeEventListener('message', {});
    }

    render() {
      const { tableStatus, channelsData } = this.channelsListViewModel;
      const { t } = this.props;
      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <div className="py-4 px-3">
          <h2 className="text-blue-0 mb-4 text-blue-0">{t('txt_connect_a_channel')}</h2>
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
            header={t('txt_please_upgrade_account')}
            body={<Upgrade></Upgrade>}
            key={Math.random(40, 200)}
          />
        </div>
      );
    }
  }
);

export default withTranslation()(withChannelsViewModel(ChannelsList));
