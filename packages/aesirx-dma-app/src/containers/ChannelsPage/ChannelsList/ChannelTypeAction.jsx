/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

const ChannelTypeAction = observer(({ channelType, handleOnRemove }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleOnClick = async () => {
    setLoading(true);
    await handleOnRemove(channelType);
    setLoading(false);
  };

  return (
    <div className="d-flex flex-wrap flex-md-nowrap justify-content-end align-content-center">
      <button
        className="cursor-pointer d-flex align-items-center bg-white justify-content-center btn btn-outline-secondary border-danger py-2 w-145px"
        onClick={handleOnClick}
        disabled={loading}
      >
        {loading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <span className="text-danger fw-medium d-none d-md-block ">{t('txt_bulk_disconnect')}</span>
      </button>
    </div>
  );
});

export default ChannelTypeAction;
