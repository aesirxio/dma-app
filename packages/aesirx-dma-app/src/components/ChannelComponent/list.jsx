/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import ChannelChannelComponent from './channel';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';

const ListChannelComponent = observer(({ channelsData, ...props }) => {
  return (
    <div className="w-100">
      {channelsData.map((channelCategory, index) => (
        <React.Fragment key={index}>
          {channelCategory.list.map((channelData, i) => (
            <ChannelChannelComponent {...props} channelData={channelData} key={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
});

export default withTranslation()(ListChannelComponent);
