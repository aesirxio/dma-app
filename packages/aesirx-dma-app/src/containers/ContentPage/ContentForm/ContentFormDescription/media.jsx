/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState, useContext, lazy } from 'react';
import { observer } from 'mobx-react';

import { CONTENT_DESCRIPTION_MODE, CONTENT_FIELD_KEY } from '../../../../constants/ContentModule';
import ContentUtils from '../../ContentUtils/ContentUtils';
import MediaDataRender from '../MediaDataRender';
import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';
import DamComponent from 'components/DamComponent';
import { useTranslation } from 'react-i18next';
const ContentFormDescriptionMedia = observer(({ formPropsData, channel = null }) => {
  const context = useContext(ContentViewModelContext);
  const channelMasterData = context.getFormViewModel().channelMasterData;
  const channelData = ChannelUtils.getChannelByFilter(channelMasterData, 'removed', 'not');

  // let canva = [];
  let dam = [];
  let mode = CONTENT_DESCRIPTION_MODE.BASIC;

  // Advance
  if (channel) {
    // canva = formPropsData[CONTENT_FIELD_KEY.CANVA][channel.id] ?? [];
    dam = formPropsData[CONTENT_FIELD_KEY.DAM][channel.id] ?? [];
    mode = CONTENT_DESCRIPTION_MODE.ADVANCE;
  } else {
    // const canvaObj = formPropsData[CONTENT_FIELD_KEY.CANVA];
    // canva = canvaObj[Object.keys(canvaObj)[0]] ?? [];
  }

  const [damAssets, setDamAssets] = useState(dam);
  const [show, setShow] = useState(false);

  const handleDam = (data) => {
    setDamAssets([...damAssets, ...data]);
  };

  useEffect(() => {
    if (mode === CONTENT_DESCRIPTION_MODE.BASIC) {
      ContentUtils.setDataForChannels(CONTENT_FIELD_KEY.DAM, damAssets, mode, formPropsData);
    } else {
      ContentUtils.setDataForChannels(CONTENT_FIELD_KEY.DAM, damAssets, mode, formPropsData, [
        channel.id,
      ]);
    }
  }, [damAssets, channel, formPropsData, mode, channelData]);

  const deleteDamItem = (id) => {
    setDamAssets(damAssets.filter((item) => item.id !== id));
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const mediaChannel = ContentUtils.hasMediaChannel(channelData);
  const { t } = useTranslation();
  return (
    <div className="px-3 py-2 bg-accordion-button wr_description_image_asset rounded-bottom-2">
      <div className="d-flex flex-wrap justify-content-start">
        {mediaChannel.dam && (
          <>
            <div className="mx-2 mt-1 mb-1">
              <DamComponent field={{ changed: handleDam }}>
                <button
                  className="wr_btn_dam border-0 bg-blue-2 rounded-3 py-2 px-3 text-nowrap btn"
                  type="button"
                >
                  <span className="text-white fs-sm fw-medium py-1 ms-2 ">
                    {t('txt_digital_asset_management')}
                  </span>
                </button>
              </DamComponent>
            </div>
          </>
        )}
        {mediaChannel.video && (
          <div className="mx-2 mt-1 mb-1">
            <DamComponent field={{ changed: handleDam }} allowType={['video']}>
              <button
                className="wr_btn_dam border-0 bg-blue-2 rounded-2 px-3 py-2 text-nowrap btn "
                type="button"
              >
                <span className="text-white fs-sm fw-medium  ms-2">{t('txt_video')}</span>
              </button>
            </DamComponent>
          </div>
        )}
      </div>
      <MediaDataRender
        damData={damAssets}
        deleteDamItem={deleteDamItem}
        channelData={channelData}
      />
    </div>
  );
});

export default ContentFormDescriptionMedia;
