import React, { Component } from 'react';
import history from '../../../routes/history';

import PAGE_STATUS from '../../../constants/PageStatus';
import { CAMPAIGNS_FIELD_KEY } from '../../../constants/CampaignsModule';
import Table from '../../../components/Table';
import ComponentChart from '../../../components/Chart';
import ListSocial from '../../../components/ListSocial';
import CampaignsTotalNumber from '../../../components/CampaignsTotalNumber';

import { observer } from 'mobx-react';
import { withCampaignsViewModel } from '../CampaignsViewModels/CampaignsViewModelContextProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import Spinner from '../../../components/Spinner';

import getStatus from '../../../utils/status';
import CampaignsActionBar from '../CampaignsForm/CampaignsActionBar';
import ComponentNoData from '../../../components/ComponentNoData';
import ComponentViewList from '../../../components/ComponentViewList';
const CampaignsList = observer(
  class CampaignsList extends ComponentViewList {
    key = CAMPAIGNS_FIELD_KEY.ID;
    view="campaigns";
    getDataFormFilter = () => {
      return [
        {
          name: 'projects',
          option: this.filterFormViewModel.dropdownlistProjectValues,
          isMulti: true,
        },
      ];
    };

    handleExpanded = (e, row) => {
      console.log('rowrowrowrowrowrowrowrowrow', row);
      this.listViewModel.getContentByIdCampaign(row[this.key]);
    };
    render() {
      console.log('[Quick Edit Product] - re-render .........');
      const { tableStatus, campaigns, pagination } = this.listViewModel;

      const tableRowHeader = [
        {
          Header: '',
          accessor: CAMPAIGNS_FIELD_KEY.NAME,
          id: 'expander',
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              <i className="text-danger icon_expander">
                <FontAwesomeIcon icon={row.isExpanded ? faMinus : faPlus} />
              </i>
            </div>
          ),
        },
        {
          Header: 'Campaign Name',
          accessor: CAMPAIGNS_FIELD_KEY.NAME,
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              <span
                className="ms-2 fw-bold text-black opacity-75"
                onClick={(e) => this.handleEdit(e, row.original, pagination.page)}
              >
                {row.values.expander}
              </span>
            </div>
          ),
          SubCell: ({ row }) => <span>{row.original.name}</span>,
        },
        {
          Header: 'Status',
          accessor: CAMPAIGNS_FIELD_KEY.STATUS,
          className: 'status',
          Cell: ({ value }) => {
            console.log('value value sub', value);
            return (
              <span className={`badge ${value.className} mw-100 h-35 d-table-cell align-middle`}>
                {value.text}
              </span>
            );
          },
          SubCell: ({ row }) => (
            <span
              className={`badge ${
                getStatus(row.original.status).className
              }  mw-100 h-35 d-table-cell align-middle`}
            >
              {getStatus(row.original.status).text}
            </span>
          ),
        },
        {
          Header: 'Start date',
          accessor: CAMPAIGNS_FIELD_KEY.START_DATE,
        },
        {
          Header: 'End date',
          accessor: CAMPAIGNS_FIELD_KEY.END_DATE,
        },
        // {
        //   Header: 'Number of post that need to do',
        //   accessor: CAMPAIGNS_FIELD_KEY.NEED_TO_DO,
        // },
        // {
        //   Header: 'Number of the schedude post',
        //   accessor: CAMPAIGNS_FIELD_KEY.SCHEDUDE_POST,
        // },
        // {
        //   Header: 'Number of the published content',
        //   accessor: CAMPAIGNS_FIELD_KEY.PUBLISHED_CONTENT,
        // },
        // {
        //   Header: 'Percentage campaign complete (%)',
        //   accessor: CAMPAIGNS_FIELD_KEY.PROGRESS,
        // },
      ];

      console.log('Row Data is tableRowHeader');
      console.log(this.tableRowHeader);
      const dataFormFilter = this.getDataFormFilter();

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
            <h2 className="text-blue-0">List Campaigns</h2>
            <CampaignsActionBar />
          </div>
          {campaigns ? (
            tableStatus === PAGE_STATUS.LOADING ? (
              <Spinner />
            ) : (
              <div>
                <Table
                  rowData={campaigns}
                  tableRowHeader={tableRowHeader}
                  onEdit={this.handerEdit}
                  onSelect={this.handleSelect}
                  isFilter={true}
                  pagination={pagination}
                  pageSize={this.listViewModel.pageSize}
                  listViewModel={this.listViewModel}
                  searchFunction={this.listViewModel.searchCampaign}
                  dataFormFilter={dataFormFilter}
                  searchText="Search your Campaign"
                  idKey={this.key}
                />
              </div>
            )
          ) : (
            <ComponentNoData
              icons="/assets/images/ic_campaigns.svg"
              title="Create your 1st campaigns"
              width="w-50"
            />
          )}
        </>
      );
    }
  }
);

export default withCampaignsViewModel(CampaignsList);
