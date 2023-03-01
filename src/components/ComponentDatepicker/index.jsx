/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import ComponentSVG from 'components/ComponentSVG';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';
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
      placeholder: '',
      isDays: '',
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
    let { startDate} = this.state;
    const { t } = this.props;
    return (
      <div ref={this.pickerRef} className="rounded-3 shadow overflow-hidden">
        <div className={` bg-white ${className}`}>
          <div className="position-relative border-0">{children}</div>
        </div>
        {startDate && (
          <div className="d-flex align-items-center justify-content-end border-top-1 bg-white p-3">
            {/* <p className="fs-14 color-bule-0 opacity-75 mb-0">
              {startDate ? moment(startDate).format('LL') : ''} -{' '}
              {endDate ? moment(endDate).format('LL') : ''}
            </p> */}
            <span
              style={{ cursor: 'pointer' }}
              className="btn btn-success ms-4 fw-bold text-uppercase fs-14 lh-sm rounded-1 "
              onClick={this.handleApply}
            >
              {t('txt_apply')}
            </span>
          </div>
        )}
      </div>
    );
  };
  getDateDiff = (start, end) => {
    if (!start || !end) return 0;
    return moment(end).diff(moment(start), 'days') + 1;
  };
  getDateDiffString = (start, end) => {
    const { t } = this.props;
    let startDate = start ? moment(start).format('DD MMM, YYYY') : '';
    let endDate = end ? moment(end).format('DD MMM, YYYY') : '';
    let result = this.placeholder;
    if (start || end) {
      result =
        this.getDateDiff(start, end) == 1
          ? startDate !== moment().format('DD MMM, YYYY')
            ? startDate
            : t('txt_days')
          : startDate + ` ${endDate ? '-' : ''} ` + endDate;
    }
    return result;
  };

  render() {
    let { startDate, endDate, isOpen, isDays, placeholder } = this.state;
    let { isDown } = this.props;
    const { t, i18n } = this.props;

    return (
      <div
        ref={this.wrapperRef}
        className="wrapper_datepicker d-flex align-items-center px-2 cursor-pointer"
        onClick={this.handleShowPicker}
      >
        <DatePicker
          onChange={this.onChange}
          className="border-0 w-100 bg-white rounded-2 h-100 ps-2 bg-transparent cursor-pointer text-blue-0"
          monthsShown={2}
          value={
            !isDays
              ? this.getDateDiffString(startDate, endDate)
              : this.getDateDiff(startDate, endDate)
              ? `${this.getDateDiff(startDate, endDate)} ${t('txt_days')}`
              : placeholder
          }
          placeholderText={t('txt_all_dates')}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          calendarContainer={this.MyContainer}
          popperPlacement="bottom-end"
          open={isOpen}
          showPopperArrow={false}
          onBlur={this.handleOnBlur}
          disabled={true}
          locale={i18n.language}
        />
        {isDown && (
          <i className="text-green">
            <ComponentSVG url="/assets/images/calendar.svg" color="#00B96D" />
          </i>
        )}
      </div>
    );
  }
}

export default withTranslation('common')(ComponentDatepicker);
