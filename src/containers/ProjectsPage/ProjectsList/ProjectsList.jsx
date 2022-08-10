/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import PAGE_STATUS from '../../../constants/PageStatus';

import Table from '../../../components/Table';

import { observer } from 'mobx-react';
import { withProjectViewModel } from '../ProjectViewModels/ProjectViewModelContextProvider';
import { PROJECT_COLUMN_INDICATOR } from '../../../constants/ProjectModule';

import Spinner from '../../../components/Spinner';
import ComponentNoData from '../../../components/ComponentNoData';
import ComponentViewList from '../../../components/ComponentViewList';
const ProjectsList = observer(
  class ProjectsList extends ComponentViewList {
    view = 'project';
    key = PROJECT_COLUMN_INDICATOR.ID;
    handleEdit = (e, row) => {
      this.formModalViewModal.getProject(row.id);
    };

    _handleList = () => {
      this.listViewModel.isList = !this.listViewModel.isList;
    };

    render() {
      const { tableStatus, projects, pagination } = this.listViewModel;

      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      const tableRowHeader = [
        {
          Header: 'Project Name',
          accessor: PROJECT_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              <span className="opacity-75" onClick={(e) => this.handleEdit(e, row.original)}>
                {row.original.name}
              </span>
            </div>
          ),
        },
        // {
        //   Header: "Logo",
        //   accessor: PROJECT_COLUMN_INDICATOR.LOGO,
        // },
        {
          Header: 'Short Description',
          accessor: PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION,
        },
        {
          Header: 'Start Date',
          accessor: PROJECT_COLUMN_INDICATOR.START_DATE,
        },
        {
          Header: 'End Date',
          accessor: PROJECT_COLUMN_INDICATOR.END_DATE,
        },
        // {
        //   Header: 'Lead',
        //   accessor: PROJECT_COLUMN_INDICATOR.LEAD,
        // },
        // {
        //   Header: 'Progress',
        //   accessor: PROJECT_COLUMN_INDICATOR.PROGRESS,
        // },
        {
          Header: 'Created Date',
          accessor: PROJECT_COLUMN_INDICATOR.CREATED_DATE,
        },
      ];

      return (
        <>
          {projects ? (
            <Table
              rowData={projects}
              tableRowHeader={tableRowHeader}
              onEdit={this.handleEdit}
              onSelect={this.handleSelect}
              isThumb={true}
              isList={this.listViewModel.isList}
              pageSize={this.listViewModel.pageSize}
              dataThumb={[
                'selection',
                PROJECT_COLUMN_INDICATOR.START_DATE,
                PROJECT_COLUMN_INDICATOR.END_DATE,
              ]}
              pagination={pagination}
              listViewModel={this.listViewModel}
              searchFunction={this.listViewModel.searchProjects}
              searchText="Search your project"
              hasSubRow={false}
              _handleList={this._handleList}
            />
          ) : (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title="Create your 1st project"
              width="w-50"
            />
          )}
        </>
      );
    }
  }
);

export default withProjectViewModel(ProjectsList);
