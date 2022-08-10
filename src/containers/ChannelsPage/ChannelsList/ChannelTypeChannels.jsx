/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext, useState } from 'react';

import { observer } from 'mobx-react';

import ChannelTypeChannelsAction from './ChannelTypeChannelsAction';
import { ChannelsViewModelContext } from '../ChannelsViewModels/ChannelsViewModelContextProvider';

import Helper from '../../../utils/helper';
import ComponentImage from '../../../components/ComponentImage';
import ChannelTypeChannelToken from './ChannelTypeChannelToken';

const ChannelTypeChannels = observer(({ channelType }) => {
  const context = useContext(ChannelsViewModelContext);

  const [loading, setLoading] = useState(false);

  const pages = channelType.getPages();

  if (pages.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-2">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleRemoveChannel = async (channel) => {
    if (Helper.confirmDeleteItem()) {
      setLoading(true);
      await context.getChannelsListViewModel().actions('removeChannel', channelType, channel);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-1 mb-4 border-bottom"> </div>
      <div className="list_content ms-3 me-3">
        <div className="py-2 px-3 bg-blue d-flex rounded-2">
          <div className="col col-md-4">Name</div>
          <div className="col-2 d-none d-md-block">Type</div>
          <div className="col col-md-6 text-end">Action</div>
        </div>

        {pages.map((channel, index) => (
          <div
            className={`p-3 d-flex align-items-center ${index ? 'border-top-1' : ''}`}
            key={Math.random(40, 200)}
          >
            <div className="col col-md-4">
              <div className="d-flex align-items-center">
                {channel.avatar && (
                  <ComponentImage
                    className="img-avatar rounded"
                    src={channel.avatar}
                    alt={channel.name}
                  />
                )}
                <span className="ms-2">{channel.name}</span>
              </div>
            </div>
            <div className="col-2 d-none d-md-block">{channel.type}</div>
            <div className="col col-md-6 text-end">
              <ChannelTypeChannelToken channel={channel} />
              <ChannelTypeChannelsAction
                channelType={channelType}
                channel={channel}
                removeChannel={handleRemoveChannel}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

export default ChannelTypeChannels;
