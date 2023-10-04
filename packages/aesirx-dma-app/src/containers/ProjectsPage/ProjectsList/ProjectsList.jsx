/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import PAGE_STATUS from '../../../constants/PageStatus';

import Table from '../../../components/Table';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withProjectViewModel } from '../ProjectViewModels/ProjectViewModelContextProvider';
import { PROJECT_COLUMN_INDICATOR } from '../../../constants/ProjectModule';

import { Spinner } from 'aesirx-uikit';
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
      const { t } = this.props;
      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      const tableRowHeader = [
        {
          Header: t('txt_project_name'),
          accessor: PROJECT_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()}>
              <span onClick={(e) => this.handleEdit(e, row.original)}>{row.original.name}</span>
            </div>
          ),
        },
        // {
        //   Header: "Logo",
        //   accessor: PROJECT_COLUMN_INDICATOR.LOGO,
        // },
        {
          Header: t('txt_short_description'),
          accessor: PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION,
        },
        {
          Header: t('start_date'),
          accessor: PROJECT_COLUMN_INDICATOR.START_DATE,
        },
        {
          Header: t('end_date'),
          accessor: PROJECT_COLUMN_INDICATOR.END_DATE,
        },
        {
          Header: t('txt_status'),
          accessor: PROJECT_COLUMN_INDICATOR.STATUS,
          Cell: ({ value }) => {
            if (value === 1) {
              return (
                <span
                  className={`badge ${t(
                    'txt_running'
                  )} bg-posted mw-100 h-35 d-inline align-middle`}
                >
                  {t('txt_running')}
                </span>
              );
            } else if (value === 2) {
              return (
                <span
                  className={`badge ${t(
                    'txt_schedule'
                  )} bg-schedule mw-100 h-35 d-inline align-middle`}
                >
                  {t('txt_schedule')}
                </span>
              );
            } else {
              return (
                <span
                  className={`badge ${t('txt_stop')} bg-failed mw-100 h-35 d-inline align-middle`}
                >
                  {t('txt_stop')}
                </span>
              );
            }
          },
        },
        // {
        //   Header: 'Lead',
        //   accessor: PROJECT_COLUMN_INDICATOR.LEAD,
        // },
        // {
        //   Header: 'Progress',
        //   accessor: PROJECT_COLUMN_INDICATOR.PROGRESS,
        // },
        // {
        //   Header: t('created_date'),
        //   accessor: PROJECT_COLUMN_INDICATOR.CREATED_DATE,
        // },
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
              searchText={t('search_your_project')}
              hasSubRow={false}
              _handleList={this._handleList}
              view={this.view}
            />
          ) : (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title={t('create_your_1st_project')}
              width="w-50"
            />
          )}
        </>
      );
    }
  }
);

export default withTranslation()(withProjectViewModel(ProjectsList));
