/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import { withProjectViewModel } from '../ProjectViewModels/ProjectViewModelContextProvider';
import { Button } from 'react-bootstrap';
import PAGE_STATUS from '../../../constants/PageStatus';
import SimpleReactValidator from 'simple-react-validator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

const ModalComponent = lazy(() => import('../../../components/Modal'));
const ProjectForm = lazy(() => import('./ProjectForm'));

const ProjectFormModal = observer(
  class ProjectFormModal extends Component {
    projectFormModalViewModel = null;
    projectListViewModel = null;
    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      const { viewModel } = props;
      console.log('ProjectFormModal - Debug View Model');
      console.log(viewModel);
      this.projectFormModalViewModel = viewModel ? viewModel.getFormModalViewModel() : null;

      console.log('ProjectFormModal - After binding class');
      console.log(this.projectFormModalViewModel);
    }

    saveProjectHandler = () => {
      if (this.isFormValid()) {
        this.projectFormModalViewModel.saveOnModal();
      }
    };

    cancelSavingHandler = () => {
      this.projectFormModalViewModel.closeModal();
    };

    isFormValid = () => {
      console.log('isFormValid');
      if (this.validator.allValid()) {
        console.log('[is Form Valid]');
        return true;
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        return false;
      }
    };

    render() {
      console.log('project form model modal');
      console.log(this.projectFormModalViewModel);

      const { show, editMode } = this.projectFormModalViewModel;

      if (!show) {
        return null;
      }

      console.log('[ProjectFormModal] - re-render .........');

      return (
        <ModalComponent
          show={show}
          onHide={this.projectFormModalViewModel.closeModal}
          header={editMode === false || editMode == null ? 'Create a new project' : 'Edit project'}
          body={
            <ProjectForm viewModel={this.projectFormModalViewModel} validator={this.validator} />
          }
          footer={
            <Button onClick={this.saveProjectHandler} className="btn btn-success w-100">
              <span>
                {editMode === false || editMode == null ? 'Create project' : 'Save project'}
              </span>
              <i className="ms-1">
                <FontAwesomeIcon icon={faChevronRight} />
              </i>
            </Button>
          }
          // key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withProjectViewModel(ProjectFormModal);
