/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { observer } from 'mobx-react';
import ComponentImage from 'components/ComponentImage';
import ComponentTooltip from 'components/ComponentTooltip';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import { useContentViewModel } from 'containers/ContentPage/ContentViewModels/ContentViewModelContextProvider';
import { CONTENT_POST_TYPE } from 'constants/ContentModule';
const ContentListItem = observer(({ channelData }) => {
  const logoSocial = channelData.img ? channelData.img : `/assets/images/${channelData.id}.png`;

  const channels = [...channelData?.pages];
  const { t } = useTranslation();
  const { contentFormViewModel } = useContentViewModel();

  return (
    <>
      {channels.map((channel, index) => (
        <div className={`d-flex align-items-center`} key={index}>
          <ComponentTooltip
            className="position-relative m-2 cursor-pointer rounded-2 border border-3 "
            title={channel.name}
          >
            {logoSocial && (
              <ComponentImage
                alt={channel.name}
                src={logoSocial}
                className="position-absolute bottom-0 end-0 w-20"
              />
            )}

            <ComponentImage
              alt={channel.name}
              src={channel.avatar ? channel.avatar : logoSocial}
              className="img-avatar rounded"
            />
          </ComponentTooltip>
          <span>{channel.name}</span>
          <div className="d-flex ms-auto">
            <Button
              className="btn btn-secondary me-1"
              text={t('txt_save_as_draft')}
              onClick={() => {
                contentFormViewModel.saveIntegration(
                  CONTENT_POST_TYPE.DRAFT,
                  channelData.id,
                  channel.id
                );
              }}
            />
            <Button
              className="btn btn-success ms-auto"
              text={t('txt_save')}
              onClick={() => {
                contentFormViewModel.saveIntegration(
                  CONTENT_POST_TYPE.POST,
                  channelData.id,
                  channel.id
                );
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
});

export default ContentListItem;
