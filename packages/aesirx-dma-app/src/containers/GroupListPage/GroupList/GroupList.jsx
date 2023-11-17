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
    view = 'categories';

    handleExpanded = (e, row) => {
      this.listViewModel.getContentByIdGroup(row[this.key]);
    };
    render() {
      const { tableStatus, group, pagination } = this.listViewModel;
      const { t } = this.props;
      const tableRowHeader = [
        {
          Header: t('txt_group_name'),
          accessor: GROUP_FIELD_KEY.NAME,
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              <span
                className="ms-2 fs-14 fw-normal"
                onClick={(e) => this.handleEdit(e, row.original, pagination.page)}
              >
                {row.values.expander}
              </span>
            </div>
          ),
          SubCell: ({ row }) => (
            <span className="fs-14 fw-normal ms-3">|— {row.values['campaigns-name']}</span>
          ),
        },
        {
          Header: t('channel'),
          accessor: GROUP_FIELD_KEY.START_DATE,
        },
        {
          Header: t('creat_date'),
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
                searchText={t('search_your_groups')}
                idKey={this.key}
                view={this.view}
              />
            </div>
          ) : (
            <ComponentNoData
              // icons="/assets/images/ic_campaigns.svg"
              title={t('create_your_1st_groups')}
              width="w-50"
            />
          )}
        </>
      );
    }
  }
);

export default withTranslation()(withGroupViewModel(GroupList));
