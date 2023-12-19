/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import PAGE_STATUS from '../../../constants/PageStatus';
import { GROUP_FIELD_KEY } from '../../../constants/GroupModule';
import Table from '../../../components/Table';

import { observer } from 'mobx-react';
import { withGroupViewModel } from '../GroupListViewModels/GroupViewModelContextProvider';
import { Spinner } from 'aesirx-uikit';

import GroupListActionBar from '../GroupListForm/GroupListActionBar';
import ComponentNoData from '../../../components/ComponentNoData';
import ComponentViewList from '../../../components/ComponentViewList';
import { withTranslation } from 'react-i18next';
const GroupList = observer(
  class GroupList extends ComponentViewList {
    key = GROUP_FIELD_KEY.ID;
    view = 'group';
    handleEdit = (e, row) => {
      this.formModalViewModal.getGroup(row.id);
    };
    _handleSort = async (data) => {
      this.handleSort(data);
    };

    __handleDelete = () => {
      this.listViewModel.deleteGroup();
    };
    render() {
      const { tableStatus, group, pagination } = this.listViewModel;

      const { t } = this.props;
      const tableRowHeader = [
        {
          Header: t('txt_group_name'),
          accessor: GROUP_FIELD_KEY.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()}>
              <span onClick={(e) => this.handleEdit(e, row.original)}>{row.original.name}</span>
            </div>
          ),
        },
        {
          Header: t('start_date'),
          accessor: GROUP_FIELD_KEY.START_DATE,
        },
        {
          Header: t('end_date'),
          accessor: GROUP_FIELD_KEY.END_DATE,
        },
        {
          Header: t('txt_status'),
          accessor: GROUP_FIELD_KEY.STATUS,
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
      ];

      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="px-3">{t('txt_group_management')}</h2>
            <GroupListActionBar />
          </div>
          {group ? (
            <div>
              <Table
                rowData={group}
                tableRowHeader={tableRowHeader}
                onEdit={this.handerEdit}
                onSelect={this.handleSelect}
                isFilter={true}
                pagination={pagination}
                pageSize={this.listViewModel.pageSize}
                listViewModel={this.listViewModel}
                searchFunction={this.listViewModel.searchGroup}
                // dataFormFilter={dataFormFilter}
                searchText={t('search_your_group')}
                idKey={this.key}
                view={this.view}
              />
            </div>
          ) : (
            <ComponentNoData title={t('create_your_1st_groups')} width="w-50" />
          )}
        </>
      );
    }
  }
);

export default withTranslation()(withGroupViewModel(GroupList));
