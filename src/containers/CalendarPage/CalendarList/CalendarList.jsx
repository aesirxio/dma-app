/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { Link } from 'react-router-dom';
import { Spinner } from 'aesirx-uikit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import BigCalendarFull from '../../../components/BigCalendarFull';
import { withContentViewModel } from '../../ContentPage/ContentViewModels/ContentViewModelContextProvider';
import { linkPush } from 'routes/routes';
import ComponentViewList from '../../../components/ComponentViewList';
import { withTranslation } from 'react-i18next';

const CalendarList = observer(
  class CalendarList extends ComponentViewList {
    componentDidMount() {
      this.listViewModel.initCalendarData();
      this.filterFormViewModel.initData();
    }

    render() {
      const { tableStatus, contents, showView, showDate, searchContents } = this.listViewModel;
      const { t } = this.props;

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div className="wrapper_calendar wrapper_calendar_full py-4 px-3 overflow-y-auto">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="fs-2 mb-0 text-gray-5 fw-medium">{t('txt_title_calendar')}</h2>
            {/*TODO Add an action and remove d-none*/}
            <span className={`cursor-pointer btn btn-success`}>
              <Link
                to={linkPush('/content/create')}
                className="text-white d-flex align-items-center"
              >
                <i>
                  <FontAwesomeIcon className="p-2" icon={faCalendar} />
                </i>
                <span className="ps-2">{t('txt_title_new_calendar')}</span>
              </Link>
            </span>
          </div>
          <BigCalendarFull
            showView={showView}
            showDate={showDate}
            onFilter={searchContents}
            events={contents}
            listViewModel={this.listViewModel}
            filterFormViewModel={this.filterFormViewModel}
          />
        </div>
      );
    }
  }
);

export default withTranslation()(withContentViewModel(CalendarList));
