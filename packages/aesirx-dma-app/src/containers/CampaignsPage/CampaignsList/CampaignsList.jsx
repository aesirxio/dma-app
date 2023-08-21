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
import { withCampaignsViewModel } from '../CampaignsViewModels/CampaignsViewModelContextProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import { Spinner } from 'aesirx-uikit';

import CampaignsActionBar from '../CampaignsForm/CampaignsActionBar';
import ComponentNoData from '../../../components/ComponentNoData';
import ComponentViewList from '../../../components/ComponentViewList';
import { withTranslation } from 'react-i18next';
const CampaignsList = observer(
  class CampaignsList extends ComponentViewList {
    key = CAMPAIGNS_FIELD_KEY.ID;
    view = 'campaigns';
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
          Header: '',
          accessor: CAMPAIGNS_FIELD_KEY.NAME,
          id: 'expander',
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              <i className="text-green icon_expander">
                <FontAwesomeIcon
                  className="border rounded  p-1 border-success"
                  icon={row.isExpanded ? faMinus : faPlus}
                />
              </i>
            </div>
          ),
        },
        {
          Header: t('txt_campaign_name'),
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
          Header: t('start_date'),
          accessor: CAMPAIGNS_FIELD_KEY.START_DATE,
        },
        {
          Header: t('end_date'),
          accessor: CAMPAIGNS_FIELD_KEY.END_DATE,
        },
        {
          Header: t('txt_status'),
          accessor: CAMPAIGNS_FIELD_KEY.PUBLISHED,
          className: 'status',
          Cell: ({ value }) => {
            if (value === 1) {
              return (
                <span
                  className={`badge ${t(
                    'txt_running'
                  )} bg-processing mw-100 h-35 d-inline align-middle`}
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
          SubCell: ({ row }) => {
            if (row.values['status'] === 1) {
              return (
                <span
                  className={`badge ${t(
                    'txt_running'
                  )} bg-processing mw-100 h-35 d-inline align-middle me-2`}
                >
                  {t('txt_running')}
                </span>
              );
            } else if (row.values['status'] === 2) {
              return (
                <span
                  className={`badge ${t(
                    'txt_schedule'
                  )} bg-schedule mw-100 h-35 d-inline align-middle me-2`}
                >
                  {t('txt_schedule')}
                </span>
              );
            } else {
              return (
                <span
                  className={`badge ${t(
                    'txt_stop'
                  )} bg-failed mw-100 h-35 d-inline align-middle me-2`}
                >
                  {t('txt_stop')}
                </span>
              );
            }
          },
        },
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
            <h2 className="px-3">{t('txt_list_campaigns')}</h2>
            <CampaignsActionBar />
          </div>
          {campaigns ? (
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
                searchText={t('search_your_campaign')}
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

export default withTranslation()(withCampaignsViewModel(CampaignsList));
