/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import PAGE_STATUS from '../../../constants/PageStatus';

import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { withProjectViewModel } from '../ProjectViewModels/ProjectViewModelContextProvider';
import { PROJECT_COLUMN_INDICATOR } from '../../../constants/ProjectModule';

import { Spinner, Table, TableBar, Thumb } from 'aesirx-uikit';
import ComponentNoData from '../../../components/ComponentNoData';
import ComponentViewList from '../../../components/ComponentViewList';

let dataFilter = {
  searchText: '',
  columns: [],
  titleFilter: {},
  datetime: null,
  page: '',
};
let setFilter = (data, key) => {
  switch (key) {
    // keep searchText when render
    case 1:
      return (dataFilter.searchText = data);
    // keep columns hide when render
    case 2:
      return (dataFilter.columns = data);
    // keep title filter when render
    case 3:
      return (dataFilter.titleFilter = data);
    // keep datetime filter when render
    case 4:
      return (dataFilter.datetime = data);
    // keep page when render
    case 5:
      return (dataFilter.page = data);
    case 6:
      dataFilter.searchText = '';
      dataFilter.columns = [];
      dataFilter.titleFilter = {};
      dataFilter.datetime = null;
      dataFilter.page = '';
      break;
    default:
      return null;
  }
};

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

    _handleSort = async (data) => {
      this.handleSort(data);
    };

    __handleDelete = () => {
      this.listViewModel.deleteProjects();
    };

    render() {
      const { tableStatus, projects, pagination, isDesc, projectIdsSelected } = this.listViewModel;
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
                  )} bg-processing mw-100 h-35 d-inline align-middle`}
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
          <TableBar
            dataFilter={dataFilter}
            setFilter={setFilter}
            tableRowHeader={tableRowHeader}
            setGlobalFilters={this.setGlobalFilters}
            onAction={this._handleList}
            isList={this.listViewModel.isList}
            isSearch={true}
            isDateRange={true}
            isAction={true}
            onSearch={this.listViewModel.searchProjects}
            onDelete={this.__handleDelete}
            onSelection={this.listViewModel.selectItem}
            listDeleted={projectIdsSelected}
            setDateFilter={this.listViewModel.setDateFilter}
          />
          {projects ? (
            <>
              {this.listViewModel.isList ? (
                <Table
                  data={projects}
                  columns={tableRowHeader}
                  pagination={pagination}
                  isDesc={isDesc}
                  onSort={this._handleSort}
                  canSort={true}
                  onSelectionItem={this.onSelectionItem}
                />
              ) : (
                <Thumb data={projects} />
              )}
            </>
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
