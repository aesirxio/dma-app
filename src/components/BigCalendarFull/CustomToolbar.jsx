/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import ComponentSVG from 'components/ComponentSVG';
import { linkPush } from 'routes/routes';
const CustomToolbar = (handleFilterCalendar, t) => {
  return class BaseToolbar extends Toolbar {
    render() {
      let currentView = 'month';
      switch (this.props.view) {
        case 'month':
          currentView = 'txt_month';
          break;
        case 'day':
          currentView = 'txt_days';
          break;
        case 'week':
          currentView = 'txt_week';
          break;
        case 'agenda':
          currentView = 'txt_agenda';
          break;
        default:
          break;
      }
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
            <label className="label-date fs-4 text-blue-5">{this.props.label}</label>
            <button
              className="btn-next mx-2 fs-12 border-0 text-green bg-transparent"
              onClick={() => this.navigate('NEXT')}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div>
            <div className="position-relative d-flex align-items-center">
              <div className="d-flex justify-content-end mx-2">
                <Link
                  to={linkPush('/content/create')}
                  className="btn btn-success d-flex align-items-center justify-content-center"
                >
                  <i className="me-2">
                    <FontAwesomeIcon icon={faPlus} />
                  </i>
                  <span>{t('txt_create_new_post')}</span>
                </Link>
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-custom-components"
                  className="text-gray-5 bg-transparent"
                >
                  {t(currentView)}
                 
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow calendar-menu-item border-0 p-3">
                  <div className="rbc-btn-group w-100 d-block">
                    <Dropdown.Item
                      className="border-0 p-2 d-block w-100 color-blue-0 p-0 text-start mb-1 text-gray-5"
                      onClick={() => this.props.onView('day')}
                    >
                      {t('txt_days')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="border-0 p-2 d-block w-100 color-blue-0 p-0 text-start mb-1 text-gray-5"
                      onClick={() => this.props.onView('week')}
                    >
                      {t('txt_week')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="border-0 p-2 d-block w-100 color-blue-0 p-0 text-start text-gray-5"
                      onClick={() => this.props.onView('month')}
                    >
                      {t('txt_month')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="border-0  p-2 d-block w-100 color-blue-0 p-0 text-start text-gray-5"
                      onClick={() => this.props.onView('agenda')}
                    >
                      {t('txt_agenda')}
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
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
