/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext, useState } from 'react';

import { observer } from 'mobx-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { ChannelsViewModelContext } from '../ChannelsViewModels/ChannelsViewModelContextProvider';

import { notify } from '../../../components/Toast';

const ChannelTypeConnectButton = observer(({ channelCategory, channelType }) => {
  const context = useContext(ChannelsViewModelContext);
  const channelsListViewModel = context.getChannelsListViewModel();

  const [connecting, setConnecting] = useState(false);

  const handleOnClick = async () => {
    if (channelsListViewModel.memberProfile?.allow_create_item) {
      if (channelCategory.id === 'cms' || channelType.id === 'medium') {
        context.getChannelsListLoginViewModel().openModal(channelType);
      } else {
        setConnecting(true);
        await channelsListViewModel.connectChannel(channelType.id);
      }
    } else {
      notify('Please upgrade account at https://dma.aesirx.io');
    }
  };

  if (connecting) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <button
      className="btn btn-success d-flex justify-content-center align-items-center p-2"
      onClick={handleOnClick}
    >
      <i className="fs-5 me-2">
        <FontAwesomeIcon icon={faPlus} />
      </i>
      {connecting ? 'connecting' : 'Connect'}
    </button>
  );
});

export default ChannelTypeConnectButton;
