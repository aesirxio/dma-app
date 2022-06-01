/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import ProjectsList from './ProjectsList/ProjectsList';
import ProjectActionBar from './ProjectForm/ProjectActionBar';
import ProjectStore from './ProjectStore/ProjectStore';
import ProjectViewModel from './ProjectViewModels/ProjectViewModel';
import { ProjectViewModelContextProvider } from './ProjectViewModels/ProjectViewModelContextProvider';

const projectStore = new ProjectStore();
const projectViewModel = new ProjectViewModel(projectStore);

function Projects(props) {
  console.log('Debugging Route Projects');
  console.log(projectViewModel);
  return (
    <ProjectViewModelContextProvider viewModel={projectViewModel}>
      <div className="py-4 px-3 h-100">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="text-blue-0">Projects</h2>
          <ProjectActionBar {...props} />
        </div>
        <ProjectsList />
      </div>
    </ProjectViewModelContextProvider>
  );
}

export default Projects;
