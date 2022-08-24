/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

import './index.scss';

import vi from 'date-fns/locale/vi';
import de from 'date-fns/locale/de';
import uk from 'date-fns/locale/uk';
import es from 'date-fns/locale/es';
registerLocale('vi', vi);
registerLocale('de', de);
registerLocale('uk', uk);
registerLocale('es', es);

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
      selectDate: props?.filter?.datetime?.selectDate ?? '0',
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
    const selectDate = endDateToFilter.diff(startDateToFilter, 'days') + 1;

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
    const { t } = this.props;
    return (
      <div ref={this.pickerRef} className="rounded-3 shadow overflow-hidden">
        <div className={className}>
          <div className="position-relative border-0">{children}</div>
        </div>
        {startDate && (
          <div className="d-flex align-items-center justify-content-end border-top-1 p-3">
            <p className="fs-14 color-bule-0 opacity-75 mb-0">
              {startDate ? moment(startDate).format('LL') : ''} -{' '}
              {endDate ? moment(endDate).format('LL') : ''}
            </p>
            <span
              style={{ cursor: 'pointer' }}
              className="btn btn-success ms-3"
              onClick={this.handleApply}
            >
              {t('txt_apply')}
            </span>
          </div>
        )}
      </div>
    );
  };

  render() {
    let { startDate, endDate, selectDate, isOpen } = this.state;
    let { isDown } = this.props;
    const { t, i18n } = this.props;

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
          value={selectDate + ' ' + t('txt_days')}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          calendarContainer={this.MyContainer}
          popperPlacement="bottom-end"
          open={isOpen}
          onBlur={this.handleOnBlur}
          disabled={true}
          locale={i18n.language}
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

export default withTranslation('common')(ComponentDatepicker);
