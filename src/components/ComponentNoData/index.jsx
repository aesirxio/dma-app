/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { Link } from 'react-router-dom';
import './index.scss';
import ComponentImage from '../ComponentImage';

class ComponentNoData extends Component {
  render() {
    let { icons, text, title, link, linlText, isBtn, width, className, iconColor, iconBg } =
      this.props;
    return (
      <div
        className={
          className
            ? className
            : 'text-center h-100 d-flex flex-column justify-content-center align-items-center'
        }
      >
        <p
          style={{ width: '48px', height: '48px' }}
          className={`mb-2 d-inline-block position-relative rounded-circle ${iconBg}`}
        >
          <ComponentImage
            className={`position-absolute top-50 start-50 translate-middle ${iconColor}`}
            src={icons}
            alt={icons}
          />
        </p>
        <h5 className="mb-2">{title}</h5>
        <p className={`mb-2 fs-14 text-black-50 w-100 mx-auto ${width}`}>{text}</p>
        {isBtn && (
          <Link
            to={{ pathname: link, state: { openModal: true } }}
            className="btn btn-success d-inline-block w-fit"
          >
            <i className="text-white me-2">
              <FontAwesomeIcon icon={faPlus} />
            </i>
            {linlText}
          </Link>
        )}
      </div>
    );
  }
}

export default ComponentNoData;
