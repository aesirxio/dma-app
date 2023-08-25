/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { observer } from 'mobx-react';

import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

const ChannelTypeChannelsAction = observer(({ channel, removeChannel }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-wrap flex-md-nowrap justify-content-end align-content-center">
      <button
        className="cursor-pointer d-flex align-items-center bg-white justify-content-center btn btn-outline-secondary border-1 py-2 px-2 me-3"
        onClick={() => {removeChannel(channel)}}
      >
        <span className="px-2 text-body fw-medium d-none d-md-block ">{t('txt_disconnect')}</span>
      </button>
    </div>
  );
});

export default withTranslation()(ChannelTypeChannelsAction);
