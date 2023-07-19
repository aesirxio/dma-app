/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import ComponentSVG from 'components/ComponentSVG';

const CustomToolbar = (handleFilterCalendar, t) => {
  return class BaseToolbar extends Toolbar {
    render() {
      return (
        <div className="toolbar-container d-flex justify-content-between align-items-center mb-3">
          <div className="back-next-buttons">
            <button
              className="cursor-pointer bg-transparent btn btn-outline-secondary btn_today text-gray-5"
              onClick={() => this.navigate('TODAY')}
            >
              {t('txt_today')}
            </button>
          </div>
          <div className="d-flex align-items-center">
            <button
              className="btn-back mx-2 fs-12 border-0 text-green bg-transparent"
              onClick={() => this.navigate('PREV')}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <label className="label-date fs-4 text-blue-5 fw-semibold">{this.props.label}</label>
            <button
              className="btn-next mx-2 fs-12 border-0 text-green bg-transparent"
              onClick={() => this.navigate('NEXT')}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div>
            <div className="position-relative d-flex align-items-center">
              <div className="ms-2">
                <button
                  className="cursor-pointer w-110 d-flex align-items-center bg-white justify-content-center btn btn-outline-secondary text-gray-5"
                  onClick={handleFilterCalendar}
                >
                  <i className="icon-filter text-gray-5">
                    <ComponentSVG url="assets/images/filter.svg" />
                  </i>
                  <span className="ms-2">{t('txt_filter')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    navigate = (action) => {
      this.props.onNavigate(action);
    };
  };
};

export default CustomToolbar;
