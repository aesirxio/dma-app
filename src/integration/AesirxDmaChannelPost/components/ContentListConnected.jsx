import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { ContentViewModelContext } from 'containers/ContentPage/ContentViewModels/ContentViewModelContextProvider';

import ChannelUtils from 'containers/ChannelsPage/ChannelUtils/ChannelUtils';
import ContentListItem from './ContentListItem';
import { useTranslation } from 'react-i18next';

const ContentListConnected = observer((props) => {
  const { t } = useTranslation('common');
  const context = useContext(ContentViewModelContext);
  const viewModel = context.getFormViewModel();

  const channelsData = viewModel.channelMasterData;

  const data = ChannelUtils.getChannelByFilter(channelsData, 'removed', 'not');

  if (data && data.length === 0) {
    return null;
  }

  return (
    <>
      {data &&
        data.map((channelCategory, index) => (
          <React.Fragment key={index}>
            <div className="mb-4">
              <div className="d-flex w-100 mb-2">
                <h6 className="text-blue mb-0 w-100">{t(channelCategory.name)}</h6>
              </div>

              <div className="d-flex d-flex flex-column flex-wrap">
                {channelCategory.list.map((channelData, i) => (
                  <ContentListItem {...props} channelData={channelData} key={i} />
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  );
});

export default ContentListConnected;
