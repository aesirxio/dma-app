/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';
import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';

import ContentFormDescriptionAdvanceChannel from './channel';

const ContentFormDescriptionAdvance = observer(({ formPropsData, onBlurDescription }) => {
  const context = useContext(ContentViewModelContext);

  const channelMasterData = context.getFormViewModel().channelMasterData;
  const channelData = ChannelUtils.getChannelByFilter(channelMasterData, 'removed', 'not');

  return (
    <div className="accordion" id="accordionContentFormDescriptionAdvance">
      {channelData.map((channelType, index) => (
        <div className="accordion-item bg-white border-1" key={index}>
          <div className="accordion-header" id={`heading${index}`}>
            <button
              className="accordion-button bg-blue-3 text-blue-0 shadow-none border-bottom-1 fw-bold px-3 py-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseOne${index}`}
              aria-expanded="true"
              aria-controls={`collapseOne${index}`}
            >
              {channelType.name}
            </button>
          </div>
          <div
            id={`collapseOne${index}`}
            className="accordion-collapse collapse show"
            aria-labelledby={`heading${index}`}
            data-bs-parent="#accordionContentFormDescriptionAdvance"
          >
            <div className="accordion-body">
              <ContentFormDescriptionAdvanceChannel
                formPropsData={formPropsData}
                channelType={channelType}
                onBlurDescription={onBlurDescription}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ContentFormDescriptionAdvance;
