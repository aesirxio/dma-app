/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState, useContext , lazy } from 'react';
import { observer } from 'mobx-react';

import { CONTENT_DESCRIPTION_MODE, CONTENT_FIELD_KEY } from '../../../../constants/ContentModule';
import ContentUtils from '../../ContentUtils/ContentUtils';
import MediaDataRender from '../MediaDataRender';
import CanvaButton from 'components/CanvaButton';
import ChatGPT from 'components/ChatGPT';
import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';
import DamComponent from 'components/DamComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import ComponentImage from 'components/ComponentImage';
const ModalComponent = lazy(() => import('components/Modal'));
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
  const [show, setShow] = useState(false);

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

  const onSetCanvaIndexToEdit = (index, id, designId) => {
    if (index === null) {
      setCanvaIndexToEdit(null);
      return;
    }
    setCanvaIndexToEdit({ index, id, designId });
  };

  const canvaEditItem = (index, id, data) => {
    canvaAssets.splice(index, 1, { id: id, exportUrl: data.exportUrl, designId: data.designId });
    setCanvaIndexToEdit(null);
    setCanvaAssets([...canvaAssets]);
  };

  const canvaDeleteItem = (designId) => {
    setCanvaAssets(canvaAssets.filter((item) => item.designId !== designId));
  };

  const deleteDamItem = (id) => {
    setDamAssets(damAssets.filter((item) => item.id !== id));
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose= () =>{
    setShow(false);
  };


  const mediaChannel = ContentUtils.hasMediaChannel(channelData);
  const { t } = useTranslation('common');
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
              <DamComponent field={{ changed: handleDam }}>
                <button
                  className="wr_btn_dam border-0 bg-blue-2 rounded-2 px-3 text-nowrap canva-btn-size-m"
                  type="button"
                >
                  <i className="text-white">
                    <FontAwesomeIcon icon={faImage} />
                  </i>
                  <span className="text-white ms-2">{t('txt_digital_asset_management')}</span>
                </button>
              </DamComponent>
            </div>
            <div className="me-2 mt-1 mb-1">
            <button
                  className="wr_btn_dam border-0 rounded-2 px-2 text-nowrap canva-btn-size-m chatgpt-btn"
                  type="button"
                  onClick={handleShow}
                >
                  <div className="p-1 d-flex align-items-center">
                        <ComponentImage
                          src="/assets/images/chatgpt-icon.svg"
                          alt=""
                          className="img-chatgpt "
                          width="30"
                          height="30"
                        />
                        <span className="text-white fw-medium ">ChatGPT</span>
                  </div>
                </button>
              <ModalComponent
               show={show}
               onHide={handleClose}
               header={
                 <h3 className='fw-bold'>ChatGPT</h3>
               }
              body={
                <ChatGPT/>
              }
              />
            </div>
          </>
        )}
        {mediaChannel.video && (
          <div className="me-2 mt-1 mb-1">
            <DamComponent field={{ changed: handleDam }} allowType={['video']}>
              <button
                className="wr_btn_dam border-0 bg-blue-2 rounded-2 px-3 text-nowrap canva-btn-size-m"
                type="button"
              >
                <i className="text-white">
                  <FontAwesomeIcon icon={faImage} />
                </i>
                <span className="text-white ms-2">{t('txt_video')}</span>
              </button>
            </DamComponent>
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
