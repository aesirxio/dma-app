/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useContext, useState } from 'react';

import { observer } from 'mobx-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { ChannelsViewModelContext } from '../ChannelsViewModels/ChannelsViewModelContextProvider';

const ChannelTypeConnectButton = observer(({ channelCategory, channelType }) => {
  const context = useContext(ChannelsViewModelContext);

  const [connecting, setConnecting] = useState(false);

  console.log('ChannelTypeConnectButton render', channelCategory, channelType, context);

  const handleOnClick = async () => {
    if (channelCategory.id === 'cms' || channelType.id === 'medium') {
      context.getChannelsListLoginViewModel().openModal(channelType);
    } else {
      setConnecting(true);
      await context.getChannelsListViewModel().connectChannel(channelType.id);
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
