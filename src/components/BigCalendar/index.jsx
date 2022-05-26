/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { CONTENT_FIELD_KEY } from '../../constants/ContentModule';
import ContentUtils from '../../containers/ContentPage/ContentUtils/ContentUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Helper from '../../utils/helper';
import './index.scss';

const localizer = momentLocalizer(moment);

class BigCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  CustomToolbar = (toolbar) => {
    const goToBack = () => {
      let mDate = toolbar.date;
      let newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
      toolbar.onNavigate('prev', newDate);
    };

    const goToNext = () => {
      let mDate = toolbar.date;
      let newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
      toolbar.onNavigate('next', newDate);
    };

    const label = () => {
      const date = moment(toolbar.date);
      return (
        <p className="mb-0">
          <span>
            {' '}
            {date.format('MMMM')}, {date.format('YYYY')}
          </span>
        </p>
      );
    };

    return (
      <div className="toolbar-container d-flex justify-content-between align-items-center mb-3">
        <label className="label-date fs-4 text-blue-0 fw-bold">{label()}</label>
        <div className="back-next-buttons d-flex">
          <button
            className="btn-back rounded-1 border-1 fs-12 text-green bg-transparent"
            onClick={goToBack}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="btn-next ms-2 rounded-1 border-1 fs-12 text-green bg-transparent"
            onClick={goToNext}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    );
  };

  Event = ({ event }) => {
    let divClass = 'wrapper_des_event d-inline-block shadow rounded-circle ';
    let spanClass = 'fw-bold text-wrap opacity-75 ';
    const channelName = event?.channel[0]?.alias ?? 'facebook';

    divClass += channelName + '_calendar_background';
    spanClass += channelName + '_calendar_text';

    const popover = (
      <Popover id="popover-basic" className="bg-white z-index-100 rounded-2">
        <Popover.Title className="bg-blue-3 py-2 px-3 rounded-top d-flex justify-content-between align-items-center">
          <span className={spanClass}>{event.title}</span>
        </Popover.Title>
        {/*<Popover.Content className="py-2 px-3">*/}
        {/*  <p className="mb-0 mb-3">{event.text}</p>*/}
        {/*  /!* <div>*/}
        {/*    <a href={void 0} className="btn btn-success w-100">*/}
        {/*      <i>*/}
        {/*        <FontAwesomeIcon icon={faPlus} />*/}
        {/*      </i>*/}
        {/*      <span className="ms-2">Make a plan</span>*/}
        {/*    </a>*/}
        {/*  </div> *!/*/}
        {/*</Popover.Content>*/}
      </Popover>
    );

    return (
      //trigger="click" placement="right" rootClose={true} overlay={popover}
      <div className={divClass}>
        {/* <span
            style={{ cursor: 'pointer' }}
            className="text-decoration-none d-inline-block"
          ></span> */}
      </div>
    );
  };

  convert(str) {
    const date = new Date(str);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  handleSelect(slotInfo) {
    const date = this.convert(slotInfo.start);
    const events = [
      ...this.props.events.filter((_event) => {
        return this.convert(_event.start) === date;
      }),
    ];
  }
  render() {
    let events = this.props?.events
      ? this.props?.events.map((content, index) => {
          return {
            id: content[CONTENT_FIELD_KEY.ID],
            headline: content[CONTENT_FIELD_KEY.NAME],
            title: content[CONTENT_FIELD_KEY.NAME],
            allDay: true,
            start: moment(content[CONTENT_FIELD_KEY.DATE], 'DD/MM/YYYY').toDate(),
            end: moment(content[CONTENT_FIELD_KEY.DATE], 'DD/MM/YYYY').toDate(),
            channel: ContentUtils.getPageDetail(
              content[CONTENT_FIELD_KEY.CHANNELS],
              this.props?.listViewModel?.channelMasterData
            ),
          };
        })
      : [];
    events = events.concat(this.props.listViewModel.plaining);

    return (
      <div className="wrapper_calendar sbar_calendar p-4 border-bottom-1 w-100">
        <Calendar
          localizer={localizer}
          events={events ?? []}
          startAccessor="start"
          selectable
          views={['month']}
          defaultView="month"
          onSelectSlot={this.handleSelect}
          endAccessor="end"
          style={{ height: 320 }}
          components={{ toolbar: this.CustomToolbar, event: this.Event }}
        />
      </div>
    );
  }
}

export default BigCalendar;
