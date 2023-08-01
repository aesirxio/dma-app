/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { CONTENT_FIELD_KEY } from '../../constants/ContentModule';
import ContentUtils from '../../containers/ContentPage/ContentUtils/ContentUtils';
import './index.scss';
import FilterCalendar from '../FilterCalendar';
import CustomToolbar from './CustomToolbar';
import CustomHeader from './CustomHeader';

import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import { withTranslation } from 'react-i18next';

import 'moment/locale/vi';
import 'moment/locale/es';
import 'moment/locale/uk';
import 'moment/locale/de';
import 'moment/locale/th';
import 'moment/locale/hr';
import 'moment/locale/fr';
import { historyPush } from 'routes/routes';
const localizer = momentLocalizer(moment);

class BigCalendarFull extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textBtnGroup: 'Month',
      textDayGroup: 'Today',
      isFilterCalendar: false,
      selectedTimeSlot: null,
    };
  }
  eventPropGetter = (event) => {
    return {
      style: { backgroundColor: event.background },
    };
  };
  handleNewSchedule = () => {
    // Check if there is a selected time slot.
    if (this.state.selectedTimeSlot) {
      // Navigate to the new schedule page and pass the selected time slot as a parameter.
      const { start, end } = this.state.selectedTimeSlot;
      const startTime = moment(start).format('YYYY-MM-DDTHH:mm:ss');
      const endTime = moment(end).format('YYYY-MM-DDTHH:mm:ss');
      historyPush(`content-edit/new?start=${startTime}&end=${endTime}`);
    }
  };

  Event = ({ event }) => {
    let divClass = 'wrapper_des_event d-inline-block w-100 shadow label-rounded ';
    let spanClass = 'fw-semibold wrapper_des_event_title text-wrap opacity-75 ';
    const colors = ['orange', 'blue', 'green', 'red'];

    // Get the index of the event to select the color from the array
    const colorIndex = event.id % colors.length;

    // Get the selected color from the colors array
    const backgroundColor = colors[colorIndex];
    divClass += backgroundColor + '_calendar_background ';
    spanClass += backgroundColor + '_calendar_text';

    const navigateEditPost = () => {
      historyPush(`content-edit/${event.id}`);
    };
    moment.locale('en');
    const time = moment(event.start).format('h:mm A');
    return (
      <div
        title={time + ' | ' + event.title}
        onClick={event.type === 'planing' ? '' : navigateEditPost}
      >
        <div className={divClass}>
          <div
            style={{ cursor: 'pointer' }}
            className={spanClass + ' w-100 text-decoration-none d-inline-block'}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className="wrapper_des_event_time mb-1">{time}</p>
              <FontAwesomeIcon width={16} height={16} icon={faCircleExclamation} />
            </div>
            <p className="mb-1">{event.title}</p>
          </div>
        </div>
      </div>
    );
  };

  handleFilterCalendar = () => {
    this.setState({
      isFilterCalendar: true,
    });
  };

  handleCloseFilterCalendar = () => {
    this.setState({
      isFilterCalendar: false,
    });
  };

  render() {
    const { t, i18n } = this.props;
    let events = this.props?.events
      ? this.props?.events.map((content) => {
          const date = moment(content[CONTENT_FIELD_KEY.DATE], 'DD/MM/YYYY HH:mm');

          return {
            id: content[CONTENT_FIELD_KEY.ID],
            title: content[CONTENT_FIELD_KEY.NAME],
            allDay: false,
            start: date.toDate(),
            end: date.toDate(),
            CHANNEL_TYPE: 'channel_type',
            channel: ContentUtils.getPageDetail(
              content[CONTENT_FIELD_KEY.CHANNELS],
              this.props?.listViewModel?.channelMasterData
            ),
          };
        })
      : [];
    events = events.concat(this.props.listViewModel.plaining);

    return (
      <div className="wr_calendar h-100 ">
        <div className="wr_calendar--left">
          <Calendar
            culture={i18n.language || 'en'}
            popup
            localizer={localizer} // Use the updated localizer
            events={events}
            defaultDate={this.props.showDate}
            defaultView={'week'}
            showMultiDayTimes
            components={{
              toolbar: CustomToolbar(this.handleFilterCalendar, t),
              event: this.Event,
              header: CustomHeader,
            }}
            eventPropGetter={this.eventPropGetter}
            messages={{
              noEventsInRange: t('txt_nopost_agenda'),
              showMore: function (e) {
                return `+${e}  ${t('txt_more')}`;
              },
            }}
          />
        </div>
        {this.state.selectedTimeSlot && (
          <button onClick={this.handleNewSchedule}>Create New Schedule</button>
        )}
        <CSSTransition in={this.state.isFilterCalendar} timeout={300} classNames="filter_calendar">
          <FilterCalendar
            show={this.state.isFilterCalendar}
            handleCloseFilterCalendar={this.handleCloseFilterCalendar}
            {...this.props}
          />
        </CSSTransition>
      </div>
    );
  }
}

export default withTranslation()(BigCalendarFull);
