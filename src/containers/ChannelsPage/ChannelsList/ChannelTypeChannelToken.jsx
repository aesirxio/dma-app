/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from 'react';
import { observer } from 'mobx-react';
import { CHANNEL_FIELD_KEY } from '../../../constants/ChannelModule';
import { formatUnix } from '../../../utils/date';
import ChannelUtils from '../ChannelUtils/ChannelUtils';

const ChannelTypeChannelToken = observer(({ channel }) => {
  if (!channel[CHANNEL_FIELD_KEY.EXPIRED_TOKEN_TIME]) {
    return null;
  }

  const status = ChannelUtils.checkTokenExpired(channel[CHANNEL_FIELD_KEY.EXPIRED_TOKEN_TIME]);

  console.log('ChannelTypeChannelToken render', channel);

  return (
    <div className="text-md-nowrap text-end pb-1 fs-sm">
      {status
        ? `Token will expire at: ${formatUnix(channel[CHANNEL_FIELD_KEY.EXPIRED_TOKEN_TIME], true)}`
        : 'Token has expired. Please Reconnect'}
    </div>
  );
});

export default ChannelTypeChannelToken;
