/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';

const SubmitButton = ({ validateInfoBeforeSending }) => {
  const { t } = useTranslation('common');
  return (
    <div>
      <div className="d-flex align-items-center row">
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              validateInfoBeforeSending();
            }}
            className="btn btn-success d-flex align-items-center ps-3 pe-3"
          >
            <i>
              <FontAwesomeIcon icon={faUserCog} />
            </i>
            <span className="flex-1 ps-2">{t('txt_update')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withTranslation('common')(SubmitButton);
