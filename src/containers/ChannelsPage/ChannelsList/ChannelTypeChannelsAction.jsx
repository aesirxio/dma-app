/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useContext, useState } from 'react';

import { observer } from 'mobx-react';
import { CHANNEL_FIELD_KEY } from '../../../constants/ChannelModule';
import ChannelUtils from '../ChannelUtils/ChannelUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { ChannelsViewModelContext } from '../ChannelsViewModels/ChannelsViewModelContextProvider';

const ChannelTypeChannelsAction = observer(({ channelType, channel, removeChannel }) => {
  const context = useContext(ChannelsViewModelContext);

  const handleStatus = async (event) => {
    if (event.target.checked) {
      await context.getChannelsListViewModel().actions('reconnectChannel', channelType, channel);
    } else {
      await context.getChannelsListViewModel().actions('disconnectChannel', channelType, channel);
    }
  };

  const statusToken = ChannelUtils.checkTokenExpired(channel[CHANNEL_FIELD_KEY.EXPIRED_TOKEN_TIME]);

  console.log('ChannelTypeChannelsAction render', channel, statusToken);

  return (
    <div className="d-flex flex-wrap flex-md-nowrap justify-content-end align-content-center">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked={channel.connected}
          onChange={handleStatus}
        />
        <label className="form-check-label d-none d-md-block" htmlFor="flexCheckDefault">
          Enable
        </label>
      </div>

      <div
        className="d-flex flex-wrap flex-md-nowrap cursor-pointer ms-md-4"
        onClick={() => removeChannel(channel)}
      >
        <i className="me-2">
          <FontAwesomeIcon icon={faTrash} />
        </i>
        <label className="d-none d-md-block">Remove</label>
      </div>
    </div>
  );
});

export default ChannelTypeChannelsAction;
