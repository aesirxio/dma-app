/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import history from '../../../routes/history';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import PAGE_STATUS from '../../../constants/PageStatus';
import { CONTENT_FIELD_KEY, CONTENT_STATUS } from '../../../constants/ContentModule';

import Table from '../../../components/Table';

import { observer } from 'mobx-react';
import { withContentViewModel } from '../ContentViewModels/ContentViewModelContextProvider';

import Spinner from '../../../components/Spinner';
import { withTranslation } from 'react-i18next';
import ComponentNoData from '../../../components/ComponentNoData';

import ComponentViewList from '../../../components/ComponentViewList';
import ComponentImage from '../../../components/ComponentImage';
import ContentUtils from '../ContentUtils/ContentUtils';

const ContentsList = observer(
  class ContentsList extends ComponentViewList {
    key = CONTENT_FIELD_KEY.ID;
    view = 'content';

    handerEdit = (data) => {
      history.push(`/content-edit/${data[CONTENT_FIELD_KEY.ID]}`);
    };

    getDataFormFilter = () => {
      return [
        {
          name: 'campaigns',
          option: this.filterFormViewModel.campaignMasterData,
          isMulti: true,
        },
      ];
    };

    render() {
      const { tableStatus, contents = [], pagination } = this.listViewModel;
      const { t } = this.props;
      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      const dataFormFilter = this.getDataFormFilter();

      const tableRowHeader = [
        {
          Header: '',
          accessor: CONTENT_FIELD_KEY.STATUS,
          id: 'expander',
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              <i className="text-green icon_expander">
                <FontAwesomeIcon icon={row.isExpanded ? faMinus : faPlus} />
              </i>
            </div>
          ),
        },
        {
          Header: t('txt_title'),
          accessor: CONTENT_FIELD_KEY.NAME,
          Cell: ({ row }) => (
            <div className="d-flex">
              <span className="text-black opacity-75 cursor-pointer">
                {row.original[CONTENT_FIELD_KEY.NAME]}
              </span>
            </div>
          ),
        },
        {
          Header: t('txt_channels'),
          accessor: CONTENT_FIELD_KEY.CHANNELS,
          Cell: ({ row, value }) => {
            const data = ContentUtils.getPageDetail(value, this.listViewModel.channelMasterData);
            if (data) {
              return (
                <div className="d-flex align-items-center">
                  {data.map((channel) => {
                    const logoSocial = channel.image
                      ? channel.image
                      : `/assets/images/${channel.alias}.png`;

                    if (row.original[CONTENT_FIELD_KEY.ENTITY] === 'category') {
                      return (
                        <ComponentImage
                          className="img-avatar me-2"
                          src={logoSocial}
                          alt={channel.label}
                          key={channel.alias}
                        />
                      );
                    } else {
                      return channel.options.map((option, i) => (
                        <React.Fragment key={i}>
                          <div className="position-relative">
                            <ComponentImage
                              alt={option.name}
                              src={logoSocial}
                              className="position-absolute bottom-0 end-0 w-20"
                            />
                            <ComponentImage
                              className="img-avatar rounded"
                              src={option.avatar ? option.avatar : logoSocial}
                              alt={option.label}
                            />
                          </div>
                          <span className="ms-2 text-blue-0 text-capitalize">{option.label}</span>
                        </React.Fragment>
                      ));
                    }
                  })}
                </div>
              );
            }
          },
        },
        {
          Header: t('txt_date'),
          accessor: CONTENT_FIELD_KEY.DATE,
          Cell: ({ value }) => <div>{value}</div>,
        },
        {
          Header: '',
          accessor: CONTENT_FIELD_KEY.STATUS,
          className: 'status',
          Cell: ({ value }) => (
            <span className={`badge bg-${value} mw-100 h-35 d-table-cell align-middle`}>
              {CONTENT_STATUS[value]}
            </span>
          ),
        },
        {
          Header: '',
          accessor: CONTENT_FIELD_KEY.EDIT,
          Cell: ({ row }) =>
            row.original[CONTENT_FIELD_KEY.ENTITY] === 'category' && (
              <button
                className={`badge mw-100 h-35 d-table-cell align-middle btn btn-success border-0`}
                onClick={() => this.handerEdit(row.original)}
              >
                {t('txt_edit')}
              </button>
            ),
        },
      ];

      return (
        <>
          {contents ? (
            <Table
              rowData={contents}
              tableRowHeader={tableRowHeader}
              onSelect={this.handleSelect}
              isFilter={true}
              pagination={pagination}
              pageSize={this.listViewModel.pageSize}
              listViewModel={this.listViewModel}
              searchFunction={this.listViewModel.searchContents}
              dataFormFilter={dataFormFilter}
              searchText="Search your posts"
              classNameTable={'wr_content_list'}
              idKey={this.key}
            />
          ) : (
            <ComponentNoData
              icons="/assets/images/ic_upcoming.svg"
              title="Create your 1st content"
              width="w-50"
            />
          )}
        </>
      );
    }
  }
);

export default withTranslation('common')(withContentViewModel(ContentsList));
