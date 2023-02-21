/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { withTranslation } from 'react-i18next';
import './index.scss';

class ButtonNormal extends React.Component {
  render() {
    let { iconStart, iconEnd, text, onClick, className, disabled } = this.props;
    const { t } = this.props;
    if (className === undefined) {
      className = 'btn-success';
    }

    return (
      <>
        <button type="button" className={`btn ${className}`} onClick={onClick} disabled={disabled}>
          {iconStart && (
            <i className="me-1">
              <FontAwesomeIcon icon={faPlus} />
            </i>
          )}
          {t(text)}

          {iconEnd && (
            <i className="ms-1">
              <FontAwesomeIcon icon={iconEnd} />
            </i>
          )}
        </button>
      </>
    );
  }
}

export default withTranslation('common')(ButtonNormal);
