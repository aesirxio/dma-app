/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';

import { CONTENT_DESCRIPTION_MODE, CONTENT_FIELD_KEY } from '../../../../constants/ContentModule';
import ContentUtils from '../../ContentUtils/ContentUtils';
import MediaDataRender from '../MediaDataRender';
import MediaDamButton from '../MediaDamButton';

import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';
import CanvaButton from 'components/CanvaButton';

const ContentFormDescriptionMedia = observer(({ formPropsData, channel = null }) => {
  const context = useContext(ContentViewModelContext);
  const channelMasterData = context.getFormViewModel().channelMasterData;
  const channelData = ChannelUtils.getChannelByFilter(channelMasterData, 'removed', 'not');

  let canva = [];
  let dam = [];
  let mode = CONTENT_DESCRIPTION_MODE.BASIC;

  // Advance
  if (channel) {
    canva = formPropsData[CONTENT_FIELD_KEY.CANVA][channel.id] ?? [];
    dam = formPropsData[CONTENT_FIELD_KEY.DAM][channel.id] ?? [];
    mode = CONTENT_DESCRIPTION_MODE.ADVANCE;
  } else {
    const canvaObj = formPropsData[CONTENT_FIELD_KEY.CANVA];

    canva = canvaObj[Object.keys(canvaObj)[0]] ?? [];
  }

  const [canvaAssets, setCanvaAssets] = useState(canva);

  const [damAssets, setDamAssets] = useState(dam);

  const [canvaIndexToEdit, setCanvaIndexToEdit] = useState(null);

  const handleDam = (data) => {
    setDamAssets([...damAssets, ...data]);
  };

  const handleCanva = (exportUrl, designId) => {
    setCanvaAssets([
      ...canvaAssets,
      ...[
        {
          exportUrl: exportUrl,
          designId: designId,
        },
      ],
    ]);
  };

  useEffect(() => {
    if (mode === CONTENT_DESCRIPTION_MODE.BASIC) {
      ContentUtils.setDataForChannels(CONTENT_FIELD_KEY.CANVA, canvaAssets, mode, formPropsData);
    } else {
      ContentUtils.setDataForChannels(CONTENT_FIELD_KEY.CANVA, canvaAssets, mode, formPropsData, [
        channel.id,
      ]);
    }
  }, [canvaAssets, channel, formPropsData, mode]);

  useEffect(() => {
    if (mode === CONTENT_DESCRIPTION_MODE.BASIC) {
      ContentUtils.setDataForChannels(CONTENT_FIELD_KEY.DAM, damAssets, mode, formPropsData);
    } else {
      ContentUtils.setDataForChannels(CONTENT_FIELD_KEY.DAM, damAssets, mode, formPropsData, [
        channel.id,
      ]);
    }
  }, [damAssets, channel, formPropsData, mode, channelData]);

  const canvaEditItem = (index, id, data) => {
    canvaAssets.splice(index, 1, { id: id, exportUrl: data.exportUrl, designId: data.designId });
    setCanvaIndexToEdit(null);
    setCanvaAssets([...canvaAssets]);
  };

  const onSetCanvaIndexToEdit = (index, id, designId) => {
    if (index === null) {
      setCanvaIndexToEdit(null);
      return;
    }
    setCanvaIndexToEdit({ index, id, designId });
  };

  const canvaDeleteItem = (designId) => {
    setCanvaAssets(canvaAssets.filter((item) => item.designId !== designId));
  };

  const deleteDamItem = (id) => {
    setDamAssets(damAssets.filter((item) => item.id !== id));
  };

  const mediaChannel = ContentUtils.hasMediaChannel(channelData);

  return (
    <div className="px-3 py-2 bg-blue-3 wr_description_image_asset">
      <div className="d-flex flex-wrap justify-content-start">
        {mediaChannel.dam && (
          <>
            <div className="me-2 mt-1 mb-1">
              <CanvaButton
                data={canvaAssets}
                changed={handleCanva}
                canvaIndexToEdit={canvaIndexToEdit}
                canvaEditItem={canvaEditItem}
              />
            </div>
            <div className="me-2 mt-1 mb-1">
              <MediaDamButton changed={handleDam} />
            </div>
          </>
        )}
        {mediaChannel.video && (
          <div className="me-2 mt-1 mb-1">
            <MediaDamButton changed={handleDam} video={true} />
          </div>
        )}
      </div>
      <MediaDataRender
        canvaData={canvaAssets}
        damData={damAssets}
        deleteDamItem={deleteDamItem}
        canvaDeleteItem={canvaDeleteItem}
        onSetCanvaIndexToEdit={onSetCanvaIndexToEdit}
      />
    </div>
  );
});

export default ContentFormDescriptionMedia;
