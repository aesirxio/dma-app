/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';
import ListChannelComponent from '../../../../components/ChannelComponent/list';
import { Button } from 'react-bootstrap';

import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';

const ModalComponent = lazy(() => import('../../../../components/Modal'));

const ChannelAdd = observer(() => {
  const context = useContext(ContentViewModelContext);
  const viewModel = context.getFormViewModel();
  const channelMasterData = viewModel.channelMasterData;

  const availableChannels = ChannelUtils.getChannelByFilter(channelMasterData, 'removed');

  const handleOnSelect = (channel) => {
    viewModel.setSelectedChannel(channel);
  };

  const showModal = () => {
    viewModel.setShowAddChannelModel(true);
  };

  return (
    availableChannels.length > 0 && (
      <>
        <span className="cursor-pointer text-green text-nowrap " onClick={showModal}>
          <i className={`me-2`}>
            <FontAwesomeIcon icon={faPlus} />
          </i>
          Add Channels
        </span>
        <ModalComponent
          show={viewModel.showAddChannelModel}
          onHide={() => viewModel.setShowAddChannelModel(false)}
          header={'Select Channels'}
          body={
            <ListChannelComponent
              channelsData={availableChannels}
              handleOnSelect={handleOnSelect}
            />
          }
          footer={
            <Button className="btn btn-success w-100" onClick={viewModel.saveSeletedChannel}>
              <span>Save</span>
            </Button>
          }
        />
      </>
    )
  );
});

export default ChannelAdd;
