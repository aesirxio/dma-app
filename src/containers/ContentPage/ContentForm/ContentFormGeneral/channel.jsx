/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';
import ChannelAdd from './ChannelAdd';
import ListChannelComponent from '../../../../components/ChannelComponent/list';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';

const ContentFormGeneralChannel = observer(() => {
  const context = useContext(ContentViewModelContext);
  const viewModel = context.getFormViewModel();

  const channelsData = viewModel.channelMasterData;

  if (channelsData && channelsData.length === 0) {
    return null;
  }

  const data = ChannelUtils.getChannelByFilter(channelsData, 'removed', 'not');

  return (
    <div className=" d-flex flex-wrap">
      <div className="d-flex align-items-center justify-content-between mb-3 w-100">
        <p className="text-blue-0 mb-0 w-100">Connected Channels</p>
        <ChannelAdd />
      </div>
      <div className="rounded-2 px-3 py-4 h-100  bg-blue-3 w-100">
        <ListChannelComponent channelsData={data} removeChannel={true} />
      </div>
    </div>
  );
});

export default ContentFormGeneralChannel;
