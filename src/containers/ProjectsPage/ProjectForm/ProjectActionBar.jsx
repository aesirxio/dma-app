import React, { Component, lazy } from 'react';
import history from '../../../routes/history';

import ButtonNormal from '../../../components/ButtonNormal';

import { withProjectViewModel } from '../ProjectViewModels/ProjectViewModelContextProvider';
import { Dropdown } from 'react-bootstrap';
const ProjectFormModal = lazy(() => import('./ProjectFormModal'));

class ProjectActionBar extends Component {
  projectFormModalViewModel = null;
  projectsListViewModel = null;
  openModal = false;
  constructor(props) {
    super(props);
    const { viewModel } = props;
    console.log('ProjectActionBar - Debug View Model');
    console.log(viewModel);
    this.projectFormModalViewModel = viewModel ? viewModel.getFormModalViewModel() : null;

    this.projectsListViewModel = viewModel ? viewModel.getListViewModel() : null;

    console.log('ProjectActionBar - After binding class');
    console.log(this.projectFormModalViewModel);
    if (props.location.state) {
      this.openModal = props.location.state.openModal;

      history.replace(props.location.pathname, { openModal: false });
    }
  }

  componentDidMount() {
    if (this.openModal) {
      this.projectFormModalViewModel.openModal();
    }
  }

  createProjectHandler = (event) => {
    this.projectFormModalViewModel.openModal();
  };

  handerDeleteProject = () => {
    this.projectsListViewModel.deleteProjects();
  };

  render() {
    console.log('[ProjectActionBar] - re-render .........');

    return (
      <div className="d-flex justify-content-end">
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="info" id="actions">
            Choose an action
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            <Dropdown.Item onClick={this.handerDeleteProject}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonNormal
            onClick={this.createProjectHandler}
            iconStart={true}
            text=" Create project" />
        <ProjectFormModal />
      </div>
    );
  }
}
export default withProjectViewModel(ProjectActionBar);
