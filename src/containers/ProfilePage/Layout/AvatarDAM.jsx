/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation, useTranslation } from 'react-i18next';

const AvatarDAM = ({ children }) => {
  const { t } = useTranslation('common');
  return (
    <div className="col-3">
      <label className="form-label mb-3" htmlFor="name">
        <span className="text-blue-0">{t('txt_profile_picture')}</span>
      </label>
      <div className="border-da-1 mb-3">{children}</div>
    </div>
  );
};

export default withTranslation('common')(AvatarDAM);
