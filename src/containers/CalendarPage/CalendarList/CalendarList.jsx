/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';

import Spinner from '../../../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import BigCalendarFull from '../../../components/BigCalendarFull';
import { withContentViewModel } from '../../ContentPage/ContentViewModels/ContentViewModelContextProvider';

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
            <h2 className="fs-2 mb-0 text-gray-5 fw-bold">{t('txt_title_calendar')}</h2>
            {/*TODO Add an action and remove d-none*/}
            <span className={`cursor-pointer btn btn-success d-none`}>
              <i>
                <FontAwesomeIcon icon={faPlus} />
              </i>
              <span className="ps-2">{t('txt_title_new_calendar')}</span>
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

export default withTranslation('common')(withContentViewModel(CalendarList));
