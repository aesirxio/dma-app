/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import { withWizardViewModel } from '../../WizardViewModels/WizardViewModelContextProvider';

import PAGE_STATUS from '../../../../constants/PageStatus';
import Spinner from '../../../../components/Spinner';
import ButtonNormal from '../../../../components/ButtonNormal';
import { withTranslation } from 'react-i18next';
const ProjectForm = lazy(() => import('../../../ProjectsPage/ProjectForm/ProjectForm'));

const ProjectFormWizard = observer(
  class ProjectFormWizard extends Component {
    projectFormModalViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      this.projectFormModalViewModel = viewModel ? viewModel.getFormModalViewModel() : null;
    }

    isFormValid = () => {
      if (this.validator.allValid()) {
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
      const { tableStatus } = this.projectFormModalViewModel;
      const { t } = this.props;
      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div className="bg-white d-flex flex-column m-4 p-4">
          <div className="w-40 m-auto">
            <h3 className="fw-medium text-blue-0 mb-3 fs-2">{t('txt_create_a_new_project')}</h3>
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

export default withTranslation()(withWizardViewModel(ProjectFormWizard));
