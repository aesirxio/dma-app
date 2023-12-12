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
      const { tableStatus, group, itmes, pagination } = this.listViewModel;
      const { t } = this.props;
     console.log('group', group ,itmes);
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
            <span className="fs-14 fw-normal ms-3">|— {row.values['group-name']}</span>
          ),
        },
        {
          Header: t('channel'),
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
                data={group}
                columns={tableRowHeader}
                pagination={pagination}
                // isDesc={isDesc}
                onSort={this._handleSort}
                canSort={true}
                onSelectionItem={this.handleSelect}
              />
            </div>
          ) : (
            <ComponentNoData
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
