/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import parse from 'html-react-parser';
import { ContentViewModelContext } from '../../../ContentViewModels/ContentViewModelContextProvider';
import ContentFacebookAdsCreativeModel from '../../../ContentModel/ContentFacebookAdsCreativeModel';
import ChannelUtils from '../../../../ChannelsPage/ChannelUtils/ChannelUtils';
import '../index.scss';

const Preview = observer((props) => {
  const contentContext = useContext(ContentViewModelContext);
  const viewModel = contentContext.getFormViewModel();

  let dataAdCreative = ContentFacebookAdsCreativeModel.convertSubmittedDataToAPIService(
    props.previewData
  );

  const channelMasterData = viewModel.channelMasterData;
  const channelData = ChannelUtils.getChannelByFilter(channelMasterData, 'removed', 'not');

  useEffect(() => {}, []);

  const checkDatePreview = () => {
    if (
      props.previewData.ad_name &&
      props.previewData.call_action &&
      props.previewData.headline &&
      props.previewData.link &&
      props.previewData.text
    ) {
      return false;
    }
  };

  const getFbadPageId = () => {
    return channelData
      .find((group) => group.id === 'advertising')
      .list.find((item) => item.id === 'fbad').pages[0].id;
  };

  const handlePreview = () => {
    viewModel.setFacebookAdPreviewFromFacebookData(dataAdCreative, getFbadPageId());
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Preview</h4>
        <button
          className={`btn btn-success px-4 mw-80 d-flex align-items-center`}
          onClick={handlePreview}
          disabled={checkDatePreview() ?? true}
        >
          Generate preview
          {viewModel.isLoading && (
            <div className="ps-2 btn_loading">
              <div
                className="spinner-border"
                style={{ width: '1.7rem', height: '1.7rem' }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </button>
      </div>
      <div className="mt-3 wr_preview_ads">
        {viewModel.getDataPreviewFromFacebook
          ? parse(`
          ${viewModel.getDataPreviewFromFacebook?.facebook_ad_preview}
        `)
          : ''}
      </div>
    </>
  );
});

export default Preview;
