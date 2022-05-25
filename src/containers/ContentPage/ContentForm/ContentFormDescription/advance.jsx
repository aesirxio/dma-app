import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Accordion } from 'bootstrap';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';
import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';

import ContentFormDescriptionAdvanceChannel from './channel';

const ContentFormDescriptionAdvance = observer(({ formPropsData, onBlurDescription }) => {
  const context = useContext(ContentViewModelContext);

  const channelMasterData = context.getFormViewModel().channelMasterData;
  const channelData = ChannelUtils.getChannelByFilter(channelMasterData, 'removed', 'not');

  console.log('ContentFormDescriptionAdvance render', channelData);
  return (
    <div className="accordion" id="accordionContentFormDescriptionAdvance">
      {channelData.map((channelType, index) => (
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
              {channelType.name}
            </button>
          </h2>
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
