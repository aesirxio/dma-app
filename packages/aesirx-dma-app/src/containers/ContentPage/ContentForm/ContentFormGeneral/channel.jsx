/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { ContentViewModelContext } from '../../ContentViewModels/ContentViewModelContextProvider';
import ListChannelComponent from '../../../../components/ChannelComponent/list';
import { useTranslation, withTranslation } from 'react-i18next';

const ContentFormGeneralChannel = observer(() => {
  const context = useContext(ContentViewModelContext);
  const viewModel = context.getFormViewModel();

  const channelsData = viewModel.channelMasterData;

  if (channelsData && channelsData.length === 0) {
    return null;
  }

  const { t } = useTranslation();
  return (
    <div className=" d-flex flex-wrap">
      <div className="d-flex align-items-center justify-content-between mb-3 w-100">
        <p className="text-body mb-0 w-100">{t('txt_connected_channels')}</p>
      </div>
      <div className="rounded-2 px-3 py-4 h-100  bg-body w-100">
        <ListChannelComponent channelsData={channelsData} removeChannel={true} />
      </div>
    </div>
  );
});

export default withTranslation()(ContentFormGeneralChannel);
