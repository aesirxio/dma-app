/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import ProjectsListViewModel from '../../ProjectsPage/ProjectViewModels/ProjectsListViewModel';
import CampaignsListViewModel from '../../CampaignsPage/CampaignsViewModels/CampaignsListViewModel';
import ContentsListViewModel from '../../ContentPage/ContentViewModels/ContentsListViewModel';
import ContentsFilterFormViewModel from '../../ContentPage/ContentViewModels/ContentsFilterFormViewModel';
import CalendarListViewModel from '../../CalendarPage/CalendarViewModels/CalendarListViewModel';
import HomeListViewModel from './HomeListViewModel';
class HomeViewModel {
  projectListViewModel = null;
  campaignsListViewModel = null;
  contentsListViewModel = null;
  contentsFilterFormViewModel = null;
  calendarListViewModel = null;
  homeListViewModel = null;
  constructor(homeStore, projectStore, campaignsStore, contentStore, calendarStore) {
    if (homeStore) {
      this.homeListViewModel = new HomeListViewModel(homeStore);
      this.projectListViewModel = new ProjectsListViewModel(projectStore);
      this.campaignsListViewModel = new CampaignsListViewModel(campaignsStore);
      this.contentsListViewModel = new ContentsListViewModel(contentStore);
      this.contentsFilterFormViewModel = new ContentsFilterFormViewModel(contentStore);
      this.calendarListViewModel = new CalendarListViewModel(calendarStore);
    }
  }

  getHomeListViewModel = () => this.homeListViewModel;
  getProjectListViewModel = () => this.projectListViewModel;
  getCampaignsListViewModel = () => this.campaignsListViewModel;
  getContentsListViewModel = () => this.contentsListViewModel;
  getContentsFilterFormViewModel = () => this.contentsFilterFormViewModel;
  getCalendarListViewModel = () => this.calendarListViewModel;
}

export default HomeViewModel;
