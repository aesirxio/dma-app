/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { format } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

import './index.scss';

class ComponentDatepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      isOpen: false,
      selectDate: '0 days',
    };

    this.wrapperRef = React.createRef();
    this.handleShowPicker = this.handleShowPicker.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.wrapperRef.current.contains(event.target)) {
      this.setState({
        isOpen: false,
      });
    }
  }

  handleShowPicker = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    })
    );
  };

  onChange = (dates) => {
    const [start, end] = dates;

    this.setState({
      startDate: start,
      endDate: end,
    });
  };

  handleOnBlur = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleApply = (e) => {
    e.stopPropagation();
    let { startDate, endDate } = this.state;

    if (endDate === null) {
      endDate = startDate;
    }

    let startDateToFilter = new Date(startDate);
    startDateToFilter.setDate(startDate.getDate() - 1);

    let endDateToFilter = new Date(endDate);
    endDateToFilter.setDate(endDate.getDate() + 1);

    let { setGlobalFilter } = this.props;

    setGlobalFilter &&
      setGlobalFilter({
        startDate: format(new Date(startDateToFilter), 'yyyy-MM-dd'),
        endDate: format(new Date(endDateToFilter), 'yyyy-MM-dd'),
      });

    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(startDate - endDate);
    let dayCount = Math.round(differenceMs / ONE_DAY + 1);

    this.setState({
      selectDate: dayCount + ' days',
      isOpen: false,
    });
  };

  MyContainer = ({ className, children }) => {
    let { startDate, endDate } = this.state;

    return (
      <div className="p-3 bg-white rounded-3 shadow">
        <div className={className}>
          <div className="position-relative border-0">{children}</div>
        </div>
        {startDate && (
          <div className="d-flex align-items-center justify-content-end border-top-1 pt-3">
            <p className="fs-14 color-bule-0 opacity-75 mb-0">
              {startDate ? moment(startDate).format('LL') : ''} -{' '}
              {endDate ? moment(endDate).format('LL') : ''}
            </p>
            <span
              style={{ cursor: 'pointer' }}
              className="btn btn-success ms-3"
              onClick={this.handleApply}
            >
              Apply
            </span>
          </div>
        )}
      </div>
    );
  };

  render() {
    let { startDate, endDate, selectDate, isOpen } = this.state;
    let { isDown } = this.props;

    return (
      <div
        ref={this.wrapperRef}
        className="wrapper_datepicker d-flex align-items-center px-2 cursor-pointer"
        onClick={this.handleShowPicker}
      >
        <i className="text-blue-0">
          <FontAwesomeIcon icon={faCalendarDay} />
        </i>
        <DatePicker
          onChange={this.onChange}
          className="border-0 w-100 rounded-2 h-100 ps-2 bg-transparent cursor-pointer"
          monthsShown={2}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          calendarContainer={this.MyContainer}
          popperPlacement="bottom-end"
          placeholderText={selectDate}
          open={isOpen}
          onBlur={this.handleOnBlur}
          disabled={true}
        />
        {isDown && (
          <i className="text-green">
            <FontAwesomeIcon icon={faChevronDown} />
          </i>
        )}
      </div>
    );
  }
}

export default ComponentDatepicker;
