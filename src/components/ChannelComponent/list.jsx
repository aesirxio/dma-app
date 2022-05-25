import React from 'react';
import ChannelChannelComponent from './channel';
import { observer } from 'mobx-react';

const ListChannelComponent = observer(({ channelsData, ...props }) => {
  return (
    <div className="w-100">
      {channelsData.map((channelCategory, index) => (
        <React.Fragment key={index}>
          <div className="mb-4">
            <div className="d-flex w-100 mb-2">
              <h6 className="text-blue mb-0 w-100">{channelCategory.name}</h6>
            </div>

            <div className="d-flex d-flex align-items-center flex-wrap">
              {channelCategory.list.map((channelData, i) => (
                <ChannelChannelComponent {...props} channelData={channelData} key={i} />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
});

export default ListChannelComponent;
