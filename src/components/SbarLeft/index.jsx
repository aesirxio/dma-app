/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';

import './index.scss';
import Menu from '../Menu';
import Menu2 from '../Menu2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
class SbarLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { settingPage } = this.props;
    const { t } = this.props;
    return (
      <aside
        className={`sidebar w-260  mt-0 position-relative bg-dark mh-100 overflow-hidden overflow-y-auto d-flex flex-column justify-content-between z-index-100`}
      >
        {!settingPage ? (
          <>
            <Menu />
          </>
        ) : (
          <Menu2 />
        )}
        <div className="position-absolute bottom-0 me-3 border-top w-100 py-1">
          <div className="wr_help_center ps-3 pe-3">
            <span className="item_help d-flex align-items-center text-blue-0 cursor-pointer d-none">
              <FontAwesomeIcon icon={faQuestionCircle} />
              <span className="text white-spacing-nowrap ps-2">{t('txt_help_center')}</span>
            </span>
          </div>
        </div>
      </aside>
    );
  }
}

export default withTranslation('common')(SbarLeft);
