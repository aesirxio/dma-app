import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';

import ListChannelComponent from '../../../../components/ChannelComponent/list';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';

const ContentFormPublishChannel = observer(({ formPropsData }) => {
  const context = useContext(ContentViewModelContext);
  const viewModel = context.getFormViewModel();

  const channelsData = viewModel.channelMasterData;

  const data = ChannelUtils.getChannelByFilter(channelsData, 'removed', 'not');

  if (data && data.length === 0) {
    return null;
  }

  console.log('ContentFormPublishChannel render', formPropsData);

  return <ListChannelComponent channelsData={data} />;
});

export default ContentFormPublishChannel;
