/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';

import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';
import ContentFormPublishShedule from './shedule';

const ContentFormPublishAdvance = observer(({ formPropsData }) => {
  const context = useContext(ContentViewModelContext);
  const viewModel = context.getFormViewModel();
  const channelsData = viewModel.channelMasterData;

  const channelData = ChannelUtils.getChannelByFilter(channelsData, 'removed', 'not');

  if (channelData && channelData.length === 0) {
    return null;
  }

  return (
    <div className="">
      <div className="accordion" id="accordionContentFormDescriptionAdvance">
        {channelData.map((channelCategory, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseOne${index}`}
                aria-expanded="true"
                aria-controls={`collapseOne${index}`}
              >
                {channelCategory.name}
              </button>
            </h2>
            <div
              id={`collapseOne${index}`}
              className="accordion-collapse collapse show"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordionContentFormDescriptionAdvance"
            >
              <div className="accordion-body">
                <ContentFormPublishShedule
                  formPropsData={formPropsData}
                  channelCategory={channelCategory}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ContentFormPublishAdvance;
