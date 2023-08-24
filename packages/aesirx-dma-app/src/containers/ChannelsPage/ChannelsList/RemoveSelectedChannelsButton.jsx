/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { observer } from 'mobx-react';

import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

const RemoveSelectedChannelsButton = observer(({ selectedChannels, bulkRemoveChannel }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-wrap flex-md-nowrap justify-content-end align-content-center">
      <button
        className="cursor-pointer d-flex align-items-center bg-white justify-content-center btn btn-outline-secondary border border-danger py-2 w-145px"
        onClick={() => bulkRemoveChannel(selectedChannels)}
      >
        <span className="px-2 text-danger  fw-medium d-none d-md-block fs-14 ">
          {t('txt_bulk_disconnect')}
        </span>
      </button>
    </div>
  );
});

export default withTranslation()(RemoveSelectedChannelsButton);
