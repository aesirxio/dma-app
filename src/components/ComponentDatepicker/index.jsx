/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

import './index.scss';

class ComponentDatepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props?.filter?.datetime?.startDate
        ? moment(props?.filter?.datetime?.startDate).toDate()
        : null,
      endDate: props?.filter?.datetime?.endDate
        ? moment(props?.filter?.datetime?.endDate).toDate()
        : null,
      isOpen: false,
      selectDate: props?.filter?.datetime?.selectDate ?? '0 days',
    };

    this.wrapperRef = React.createRef();
    this.pickerRef = React.createRef();
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

  handleShowPicker = (event) => {
    if (
      this.state.isOpen &&
      this.pickerRef.current &&
      !this.pickerRef.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    } else this.setState({ isOpen: true });
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

    const startDateToFilter = moment(startDate);
    const endDateToFilter = moment(endDate);
    const selectDate = endDateToFilter.diff(startDateToFilter, 'days') + 1 + ' days';

    let { setGlobalFilter } = this.props;

    setGlobalFilter &&
      setGlobalFilter({
        startDate: startDateToFilter.format('yyyy-MM-DD'),
        endDate: endDateToFilter.format('yyyy-MM-DD'),
      });

    this.props.setFilter(
      {
        startDate: startDateToFilter.toDate(),
        endDate: endDateToFilter.toDate(),
        selectDate,
      },
      4
    );
    this.setState({
      selectDate: selectDate,
      isOpen: false,
    });
  };

  MyContainer = ({ className, children }) => {
    let { startDate, endDate } = this.state;

    return (
      <div ref={this.pickerRef} className="p-3 bg-white rounded-3 shadow">
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
          className="border-0 w-100 rounded-2 h-100 ps-2 bg-transparent cursor-pointer text-blue-0"
          monthsShown={2}
          value={selectDate}
          selected={startDate}
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
