import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import { withWizardViewModel } from '../../WizardViewModels/WizardViewModelContextProvider';

import PAGE_STATUS from '../../../../constants/PageStatus';
import Spinner from '../../../../components/Spinner';
import ButtonNormal from '../../../../components/ButtonNormal';
import WizardSteps from '../../../../components/WizardSteps';
import history from '../../../../routes/history';

const ProjectForm = lazy(() => import('../../../ProjectsPage/ProjectForm/ProjectForm'));

const ProjectFormWizard = observer(
  class ProjectFormWizard extends Component {
    projectFormModalViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log('ProjectFormWizard - Debug View Model');
      console.log(viewModel);
      this.projectFormModalViewModel = viewModel ? viewModel.getFormModalViewModel() : null;

      console.log('After binding class');
      console.log(this.projectFormModalViewModel);
    }

    isFormValid = () => {
      console.log('isFormValid');
      console.log(this.formPropsData);
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

    next = () => {
      if (this.projectFormModalViewModel.projectFormComponent.isFormValid()) {
        this.projectFormModalViewModel.saveOnModal();
      }
    };

    render() {
      console.log('[ProjectFormWizard] - re-render .........');

      const { tableStatus } = this.projectFormModalViewModel;

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div className="bg-white d-flex flex-column m-4 p-4">
          <div className="w-40 m-auto">
            <h3 className="fw-medium text-blue-0 mb-3 fs-2">Create a new project</h3>
            <ProjectForm viewModel={this.projectFormModalViewModel} />
            <div className="d-flex justify-content-end">
              <ButtonNormal
                className="btn btn-success"
                text="Next"
                onClick={this.next}
              ></ButtonNormal>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default withWizardViewModel(ProjectFormWizard);
