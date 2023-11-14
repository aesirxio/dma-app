/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import PAGE_STATUS from '../../../constants/PageStatus';
import { CAMPAIGNS_FIELD_KEY } from '../../../constants/CampaignsModule';
import Table from '../../../components/Table';
import ComponentChart from '../../../components/Chart';
import ListSocial from '../../../components/ListSocial';
import CampaignsTotalNumber from '../../../components/CampaignsTotalNumber';

import { observer } from 'mobx-react';
import { withCampaignsViewModel } from '../GroupListViewModels/CampaignsViewModelContextProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import { Spinner } from 'aesirx-uikit';

import GroupListActionBar from '../GroupListForm/GroupListActionBar';
import ComponentNoData from '../../../components/ComponentNoData';
import ComponentViewList from '../../../components/ComponentViewList';
import { withTranslation } from 'react-i18next';
const GroupList = observer(
  class GroupList extends ComponentViewList {
    key = CAMPAIGNS_FIELD_KEY.ID;
    view = 'group-list';
    getDataFormFilter = () => {
      return [
        {
          name: 'txt_title_projects',
          option: this.filterFormViewModel.dropdownlistProjectValues,
          isMulti: true,
        },
      ];
    };

    handleExpanded = (e, row) => {
      this.listViewModel.getContentByIdCampaign(row[this.key]);
    };
    render() {
      const { tableStatus, campaigns, pagination } = this.listViewModel;
      const { t } = this.props;
      const tableRowHeader = [
        {
          Header: t('txt_group_name'),
          accessor: CAMPAIGNS_FIELD_KEY.NAME,
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
          // accessor: CAMPAIGNS_FIELD_KEY.START_DATE,
        },
        {
          Header: t('creat_date'),
          // accessor: CAMPAIGNS_FIELD_KEY.START_DATE,
        },

        // {
        //   Header: t('end_date'),
        //   accessor: CAMPAIGNS_FIELD_KEY.END_DATE,
        // },
      ];

      const dataFormFilter = this.getDataFormFilter();
      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <>
          <div className="mb-4 d-none">
            <div className="row">
              <div className="col-lg-12 col-xl-6 mb-3 mb-xl-0">
                <ComponentChart titleChart={true} />
              </div>
              <div className="col-md-6 col-xl-3 ">
                <ListSocial />
              </div>
              <div className="col-md-6 col-xl-3">
                <CampaignsTotalNumber />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="px-3">{t('txt_group_management')}</h2>
            <GroupListActionBar />
          </div>
          {campaigns ? (
            <div>
              <Table
                rowData={campaigns}
                tableRowHeader={tableRowHeader}
                onEdit={this.handerEdit}
                onSelect={this.handleSelect}
                pagination={pagination}
                pageSize={this.listViewModel.pageSize}
                listViewModel={this.listViewModel}
                searchFunction={this.listViewModel.searchCampaign}
                searchText={t('search_your_group')}
                idKey={this.key}
                view={this.view}
              />
            </div>
          ) : (
            <ComponentNoData
              icons="/assets/images/ic_campaigns.svg"
              title={t('create_your_1st_campaigns')}
              width="w-50"
            />
          )}
        </>
      );
    }
  }
);

export default withTranslation()(withCampaignsViewModel(GroupList));
