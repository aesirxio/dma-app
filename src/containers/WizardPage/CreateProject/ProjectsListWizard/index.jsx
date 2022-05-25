import React, { Component } from 'react';

import PAGE_STATUS from '../../../../constants/PageStatus';
import history from '../../../../routes/history';

import Table from '../../../../components/Table';

import { observer } from 'mobx-react';
import { withWizardViewModel } from '../../WizardViewModels/WizardViewModelContextProvider';
import { PROJECT_COLUMN_INDICATOR } from '../../../../constants/ProjectModule';

import Spinner from '../../../../components/Spinner';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WizardSteps from '../../../../components/WizardSteps';

const ProjectsListWizard = observer(
  class ProjectsListWizard extends Component {
    projectListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log('ProjectList - Debug View Model');
      console.log(viewModel);
      this.projectListViewModel = viewModel ? viewModel.getListViewModel() : null;

      console.log('After binding class');
      console.log(this.projectListViewModel);
    }

    componentDidMount() {
      this.projectListViewModel.initializeData();
    }

    handerEditProject = ({ id }) => {
      if (id > 0) {
        history.push(`/wizard/project/${id}`);
        //this.props.goToStep(3);
      } else {
        history.push(`/wizard/createproject`);
      }
    };

    render() {
      console.log('[ProjectsList] - re-render .........');
      const { tableStatus, projects } = this.projectListViewModel;
      const createNew = {
        id: 0,
        name: (
          <div className="border-da-1 h-100 w-100 text-center position-absolute top-0 start-0 bottom-0 end-0 text-decoration-none d-flex align-items-center justify-content-center rounded-3">
            <div className="d-flex w-100 align-items-center justify-content-center">
              <FontAwesomeIcon icon={faPlus} className="text-green" />
              <span className="ps-2">New projects</span>
            </div>
          </div>
        ),
      };

      const tableRowHeader = [
        {
          Header: 'Project Name',
          accessor: PROJECT_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
        },
      ];

      console.log('Row Data is tableRowHeader');
      console.log(tableRowHeader);

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div className="bg-white d-flex flex-column m-4 px-4 py-5">
          <div className="wr_wizard_content w-75 mx-auto ">
            <Table
              rowData={[createNew, ...projects]}
              tableRowHeader={tableRowHeader}
              onEdit={this.handerEditProject}
              noSelection={true}
              noDropDownColumns={true}
              isList={false}
              thumbColumnsNumber={6}
            ></Table>
          </div>
        </div>
      );
    }
  }
);

export default withWizardViewModel(ProjectsListWizard);
