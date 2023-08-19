/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

const ChannelTypeChannelsAction = observer(({ channel, removeChannel }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-wrap flex-md-nowrap justify-content-end align-content-center">
      <div
        className="d-flex flex-wrap flex-md-nowrap cursor-pointer ms-md-4"
        onClick={() => removeChannel(channel)}
      >
        <i className="me-2">
          <FontAwesomeIcon icon={faTrash} />
        </i>
        <label className="d-none d-md-block">{t('txt_delete')}</label>
      </div>
    </div>
  );
});

export default withTranslation()(ChannelTypeChannelsAction);
