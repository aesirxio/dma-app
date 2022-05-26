/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component } from 'react';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-dma-lib';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import styles from '../index.module.scss';
import '../index.scss';

import Complete from '../../../components/Complete';
import Projects from '../../../components/Projects';
import AssignedToMe from '../../../components/AssignedToMe';
import Campaigns from '../../../components/Campaigns';
import BigCalendar from '../../../components/BigCalendar';
import UpcomingPosts from '../../../components/UpcomingPosts';
import BigCalendarFull from '../../../components/BigCalendarFull';
import Spinner from '../../../components/Spinner';
import UpgradeAlert from '../../../components/UpgradeAlert';
import Feature from '../../../components/Feature';
import Inspiration from '../../../components/Inspiration';
import ComponentUtilDashboard from '../../../components/ComponentUtilDasboard';
import ComponentNoData from '../../../components/ComponentNoData';
import { CAMPAIGNS_FIELD_KEY } from '../../../constants/CampaignsModule';
import { PROJECT_COLUMN_INDICATOR } from '../../../constants/ProjectModule';
import { CONTENT_FIELD_KEY } from '../../../constants/ContentModule';
import moment from 'moment';
import { observer } from 'mobx-react';
import { withHomeViewModel } from '../HomeViewModels/HomeViewModelContextProvider';
import PAGE_STATUS from '../../../constants/PageStatus';
const HomeList = observer(
  class HomeList extends Component {
    projectListViewModel = null;
    campaignsListViewModel = null;
    contentsListViewModel = null;
    contentsFilterFormViewModel = null;
    calendarListViewModel = null;
    homeListViewModel = null;
    constructor(props) {
      super(props);

      this.state = {
        isFull: true,
        isFullcalendar: false,
        isSbarRight: false,
        getTime: new Date().getHours(),
      };

      const { viewModel } = props;

      this.viewModel = viewModel ? viewModel : null;
      console.log('HomeList - Debug View Model');
      console.log(this.viewModel);

      this.projectListViewModel = this.viewModel ? this.viewModel.getProjectListViewModel() : null;

      this.campaignsListViewModel = this.viewModel
        ? this.viewModel.getCampaignsListViewModel()
        : null;

      this.contentsListViewModel = this.viewModel
        ? this.viewModel.getContentsListViewModel()
        : null;
      this.contentsFilterFormViewModel = this.viewModel
        ? this.viewModel.getContentsFilterFormViewModel()
        : null;
      // this.calendarListViewModel = this.viewModel
      //   ? this.viewModel.getCalendarListViewModel()
      //   : null;
      this.homeListViewModel = this.viewModel ? this.viewModel.getHomeListViewModel() : null;
    }

    componentDidMount() {
      this.projectListViewModel.resetObservableProperties();
      this.campaignsListViewModel.resetObservableProperties();
      this.contentsListViewModel.resetObservableProperties();
      this.projectListViewModel.initializeData();
      this.campaignsListViewModel.initializeData();
      // this.contentsListViewModel.initializeData();
      this.contentsListViewModel.initCalendarData();
      this.contentsFilterFormViewModel.initData();

      // this.calendarListViewModel.initializeData();
      this.homeListViewModel.initializeData();
    }

    handleCollapFull = () => {
      let { isFull } = this.state;

      this.setState({
        isFull: !isFull,
      });
    };

    handleFullCalender = () => {
      document.body.classList.add('full_calender');
      this.setState({
        isFullcalendar: true,
      });
    };

    newSchedule = () => {
      return (
        <span
          style={{ cursor: 'pointer' }}
          className={`wrapper_new_schedule ${styles.wrapper_new_schedule} cursor-pointer btn btn-success`}
        >
          <i>
            <FontAwesomeIcon icon={faPlus} />
          </i>
          <span className="ps-2">New Schedule</span>
        </span>
      );
    };

    handleMenuRight = () => {
      document.body.classList.toggle('show_menu_right');
      this.setState({
        isSbarRight: !this.state.isSbarRight,
      });
    };

    render() {
      let { isFull, isFullcalendar, isSbarRight, getTime } = this.state;
      const { projects } = this.projectListViewModel;
      const { campaigns } = this.campaignsListViewModel;
      // const { contents } = this.contentsListViewModel;
      const { tableStatus, contents, onFilter, showView, showDate, searchContents } =
        this.contentsListViewModel;
      const { status, inspiration } = this.homeListViewModel;
      let getHello = 'evening';

      if (getTime < 12) {
        getHello = 'morning';
      } else if (getTime < 18) {
        getHello = 'afternoon';
      } else {
        getHello = 'evening';
      }

      return (
        <div className="h-100 position-relative">
          <span
            style={{ cursor: 'pointer' }}
            className={`
                item_hambuger_icon
                d-none
                position-absolute
                text-green
                bg-blue-1
                rounded-circle
                align-items-center
                justify-content-center
                fs-12
                cursor-pointer
                mt-1
                left-auto
                top-0
                z-index-100
              `}
            onClick={this.handleMenuRight}
          >
            <FontAwesomeIcon icon={!isSbarRight ? faChevronLeft : faChevronRight} />
          </span>
          {isFull ? (
            <div className="d-flex flex-wrap">
              <UpgradeAlert className="pe-400" />

              <div className="py-4 px-3 pe-400 w-100">
                {/* <div className="py-4 px-3 w-100"> */}
                <div className="pe-md-3">
                  <h2 className="mb-3 fw-normal text-blue-0">
                    Good {getHello},{' '}
                    <strong className="fw-bold">
                      {Storage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME) ?? 'My Friends'}
                    </strong>
                  </h2>
                  <div className="mb-3 row g-4">
                    <div className="col-md-4">
                      <ComponentNoData
                        icons="/assets/images/document-text-outline.svg"
                        title="Create your content"
                        text="Publish meaningful content to your target audience"
                        linlText="Create Post"
                        isBtn={true}
                        link="/content/create"
                        className="d-flex justify-content-lg-between flex-column bg-white shadow rounded-1 py-4 text-start px-3 h-100"
                        iconBg="icon-post"
                      />
                    </div>
                    <div className="col-md-4">
                      <ComponentNoData
                        icons="/assets/images/file.svg"
                        title="Create your propject"
                        text="Tracking content performance and conduct a plan to improve the result"
                        linlText="Create Project"
                        isBtn={true}
                        link="/projects"
                        className="d-flex justify-content-lg-between flex-column bg-white shadow rounded-1 py-4 text-start px-3 h-100 "
                        iconBg="icon-project"
                      />
                    </div>
                    <div className="col-md-4">
                      <ComponentNoData
                        icons="/assets/images/megaphone-outline.svg"
                        title="Create your campaigns"
                        text="Manage all campaigns in one place. Easy to see the result on a dynamic dashboard"
                        linlText="Create Campains"
                        isBtn={true}
                        link="/campaigns"
                        className="d-flex justify-content-lg-between flex-column bg-white shadow rounded-1 py-4 text-start px-3 h-100"
                        iconBg="icon-campain"
                      />
                    </div>
                  </div>
                  {/* <div className="mb-3">
                    <Complete />
                  </div> */}
                  <div className="mb-3">
                    <ComponentUtilDashboard />
                  </div>
                </div>
                {/* <div className="mb-3">
                  <Complete />
                </div> */}
                <div className="mb-3">
                  <ComponentUtilDashboard />
                </div>
                <div className="mb-3">
                  <Projects
                    projects={projects}
                    PROJECT_COLUMN_INDICATOR={PROJECT_COLUMN_INDICATOR}
                  />
                </div>
                {/* <div className="mb-3">
                  <AssignedToMe />
                </div> */}
                <div className="mb-3">
                  <Campaigns campaigns={campaigns} CAMPAIGNS_FIELD_KEY={CAMPAIGNS_FIELD_KEY} />
                </div>
                <div className="mb-3">
                  <Feature campaigns={campaigns} CAMPAIGNS_FIELD_KEY={CAMPAIGNS_FIELD_KEY} />
                </div>
                <div className="mb-3">
                  {status === PAGE_STATUS.LOADING ? null : (
                    <Inspiration inspiration={inspiration ?? []} />
                  )}
                </div>
              </div>
              <div
                className={`sdbar_right h-100 position-fixed end-0 top-0 bottom-0 pd-t-80 w-400`}
              >
                <button
                  className={`
                      item_collap
                      d-flex
                      position-absolute
                      top-50
                      start-0
                      translate-middle
                      text-green
                      bg-blue-1
                      rounded-circle
                      align-items-center
                      justify-content-center
                      fs-12
                      cursor-pointer
                      border-0
                    `}
                  onClick={this.handleCollapFull}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="small-calendar w-100 bg-white h-100 overflow-hidden overflow-y-auto">
                  {tableStatus === PAGE_STATUS.LOADING ? (
                    <Spinner />
                  ) : (
                    <>
                      <BigCalendar
                        onFilter={searchContents}
                        events={contents}
                        listViewModel={this.contentsListViewModel}
                        filterFormViewModel={this.contentsFilterFormViewModel}
                      />
                      <UpcomingPosts contents={contents} CONTENT_FIELD_KEY={CONTENT_FIELD_KEY} />
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="position-relative d-flex bg-white h-100">
              <button
                className={`
                    item_collap
                    item_collap_fixed
                    ${styles.item_collap_fixed}
                    d-flex
                    position-fixed
                    text-green
                    bg-blue-1
                    rounded-circle
                    align-items-center
                    justify-content-center
                    fs-12
                    cursor-pointer
                    z-index-100
                    border-0
                  `}
                onClick={this.handleCollapFull}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <div className="wrapper_calendar wrapper_calendar_full w-100 py-4 px-3">
                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <h2 className="fw-normal text-blue-0">Schedule</h2>
                  {/* {isFullcalendar && this.newSchedule()} */}
                  {this.newSchedule()}
                </div>
                {tableStatus === PAGE_STATUS.LOADING ? (
                  <Spinner />
                ) : (
                  <>
                    <BigCalendarFull
                      showView={showView}
                      showDate={showDate}
                      onFilter={searchContents}
                      events={contents}
                      listViewModel={this.contentsListViewModel}
                      filterFormViewModel={this.contentsFilterFormViewModel}
                    />
                  </>
                )}
              </div>
              {/* {!isFullcalendar && (
                <div
                  className={`sdbar_right h-100 position-fixed end-0 top-0 bottom-0 pd-t-80 w-400 `}
                >
                  <div className="w-100 bg-white h-100 overflow-hidden overflow-y-auto">
                    <div className="p-4 d-flex justify-content-end">
                      {!isFullcalendar && this.newSchedule()}
                    </div>
                    <UpcomingPosts
                      isClose={true}
                      handleFullCalender={this.handleFullCalender}
                      contents={list}
                      CONTENT_FIELD_KEY={CONTENT_FIELD_KEY}
                    />
                  </div>
                </div>
              )} */}
            </div>
          )}
        </div>
      );
    }
  }
);

export default withHomeViewModel(HomeList);
