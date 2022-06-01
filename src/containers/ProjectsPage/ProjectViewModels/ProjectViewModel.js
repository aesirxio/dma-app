/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import ProjectFormModalViewModel from "./ProjectFormModalViewModel";
import ProjectListViewModel from "./ProjectsListViewModel";
//
class ProjectViewModel {
  projectListViewModel = null;
  projectFormModalViewModel = null;

  constructor(projectStore) {
    if (projectStore) {
      this.projectFormModalViewModel = new ProjectFormModalViewModel(projectStore);
      this.projectListViewModel = new ProjectListViewModel(projectStore);

      // Inject dependencies together among ViewModels 
      this.projectFormModalViewModel.setProjectListViewModel(this.projectListViewModel);
    }
  }

  getListViewModel = () => this.projectListViewModel;

  getFormModalViewModel = () => this.projectFormModalViewModel;
}

export default ProjectViewModel;

