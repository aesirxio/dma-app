/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';

const CustomToolbar = (handleFilterCalendar) => {
  return class BaseToolbar extends Toolbar {
    render() {
      return (
        <div className="toolbar-container d-flex justify-content-between align-items-center mb-3">
          <div className="back-next-buttons d-flex align-items-center">
            <button
              className="cursor-pointer btn btn-outline-secondary btn_today"
              onClick={() => this.navigate('TODAY')}
            >
              Today
            </button>
            <button
              className="btn-back mx-2 fs-12 border-0 text-green bg-transparent"
              onClick={() => this.navigate('PREV')}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <label className="label-date fs-4 text-blue-0">{this.props.label}</label>
            <button
              className="btn-next mx-2 fs-12 border-0 text-green bg-transparent"
              onClick={() => this.navigate('NEXT')}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div>
            <div className="position-relative d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-custom-components">
                  {this.props.view}
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow border-0 p-3">
                  <div className="rbc-btn-group w-100 d-block">
                    <Dropdown.Item
                      className="border-0 bg-transparent d-block w-100 color-blue-0 p-0 text-start mb-1"
                      onClick={() => this.props.onView('day')}
                    >
                      day
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="border-0 bg-transparent d-block w-100 color-blue-0 p-0 text-start mb-1"
                      onClick={() => this.props.onView('week')}
                    >
                      week
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="border-0 bg-transparent d-block w-100 color-blue-0 p-0 text-start"
                      onClick={() => this.props.onView('month')}
                    >
                      month
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="border-0 bg-transparent d-block w-100 color-blue-0 p-0 text-start"
                      onClick={() => this.props.onView('agenda')}
                    >
                      agenda
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <div className="ms-2">
                <button
                  className="cursor-pointer w-98 d-flex align-items-center justify-content-center btn btn-outline-secondary"
                  onClick={handleFilterCalendar}
                >
                  <i>
                    <FontAwesomeIcon icon={faFilter} />
                  </i>
                  <span className="ms-2">Filter</span>
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
