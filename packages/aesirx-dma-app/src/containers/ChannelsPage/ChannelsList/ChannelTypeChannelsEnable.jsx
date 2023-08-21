/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext } from 'react';

import { observer } from 'mobx-react';
import { ChannelsViewModelContext } from '../ChannelsViewModels/ChannelsViewModelContextProvider';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

const ChannelTypeChannelsEnable = observer(({ channelType, channel }) => {
  const context = useContext(ChannelsViewModelContext);
  const { t } = useTranslation();
  const handleStatus = async (event) => {
    if (event.target.checked) {
      await context.getChannelsListViewModel().actions('reconnectChannel', channelType, channel);
    } else {
      await context.getChannelsListViewModel().actions('disconnectChannel', channelType, channel);
    }
  };

  return (
    <div className="d-flex flex-wrap flex-md-nowrap justify-content-center align-content-center ms-2">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked={channel.connected}
          onChange={handleStatus}
        />
        <label className="form-check-label d-none d-md-block" htmlFor="flexCheckDefault"></label>
      </div>
    </div>
  );
});

export default withTranslation()(ChannelTypeChannelsEnable);
