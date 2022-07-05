/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ComponentImage from '../ComponentImage';
import styles from './index.module.scss';
import { withTranslation } from 'react-i18next';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { icon, text, className, onClick, image, disabled } = this.props;

    if (className !== undefined && styles[className] !== undefined) {
      className = styles[className];
    }
    const { t } = this.props;
    return (
      <button
        type="button"
        className={`d-flex justify-content-center btn ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {icon && (
          <i className="pe-1">
            <FontAwesomeIcon icon={icon} />
          </i>
        )}
        {image && <ComponentImage alt={text} src={image} className="pe-1" />}

        <span className="text_btn text-nowrap">{t(text)}</span>
      </button>
    );
  }
}

export default withTranslation('common')(Button);
