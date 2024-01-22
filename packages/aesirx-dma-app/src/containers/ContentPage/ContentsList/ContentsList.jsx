/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import PAGE_STATUS from '../../../constants/PageStatus';
import { CONTENT_FIELD_KEY, CONTENT_STATUS } from '../../../constants/ContentModule';
import Table from '../../../components/Table';

import { observer } from 'mobx-react';
import { withContentViewModel } from '../ContentViewModels/ContentViewModelContextProvider';

import { Spinner } from 'aesirx-uikit';
import { withTranslation } from 'react-i18next';
import ComponentNoData from '../../../components/ComponentNoData';

import ComponentViewList from '../../../components/ComponentViewList';
import { Image as ComponentImage } from 'aesirx-uikit';
import ContentUtils from '../ContentUtils/ContentUtils';
import ButtonShareLink from 'components/ButtonShareLink';
import { historyPush } from 'routes/routes';
const ModalComponent = lazy(() => import('../../../components/Modal'));

const ContentsList = observer(
  class ContentsList extends ComponentViewList {
    key = CONTENT_FIELD_KEY.ID;
    view = 'content';

    constructor(props) {
      super(props);
      this.state = {
        show: false,
      };
    }

    handerEdit = (data) => {
      historyPush(`/content-edit/${data[CONTENT_FIELD_KEY.ID]}`);
    };

    getDataFormFilter = () => {
      return [
        {
          name: 'txt_campaign_name',
          option: this.filterFormViewModel.campaignMasterData,
          isMulti: true,
        },
      ];
    };

    handleShow = () => {
      this.setState({
        show: true,
      });
    };
    handleClose = () => {
      this.setState({
        show: false,
      });
    };

    render() {
      const { tableStatus, contents = [], pagination } = this.listViewModel;
      const { t } = this.props;
      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      const shortenString = (str, first, last) => {
        return str?.substring(0, first) + '...' + str?.substring(str.length - last);
      };

      const dataFormFilter = this.getDataFormFilter();

      const tableRowHeader = [
        {
          Header: '',
          accessor: CONTENT_FIELD_KEY.STATUS,
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
          Header: t('txt_title'),
          accessor: CONTENT_FIELD_KEY.NAME,
          Cell: ({ row }) => (
            <div className="d-flex">
              <span className="cursor-pointer">{row.original[CONTENT_FIELD_KEY.NAME]}</span>
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
                    const defaultLogo = `/assets/images/${channel.alias}.png`;
                    if (
                      row.original[CONTENT_FIELD_KEY.ENTITY] === 'category' ||
                      !channel?.options?.length
                    ) {
                      return (
                        <ComponentImage
                          className="img-avatar me-2"
                          src={defaultLogo}
                          width={45}
                          height={45}
                          alt={channel.alias}
                          key={channel.alias}
                        />
                      );
                    } else {
                      return channel.options.map((option, i) => (
                        <React.Fragment key={i}>
                          <div className="position-relative">
                            <ComponentImage
                              alt={option.name}
                              src={defaultLogo}
                              className="position-absolute bottom-0 end-0 w-20"
                            />
                            <ComponentImage
                              className="img-avatar rounded"
                              src={option.avatar ? option.avatar : defaultLogo}
                              width={45}
                              height={45}
                              alt={option.label}
                            />
                          </div>
                          <span className="ms-2 text-body text-capitalize">{option.label}</span>
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
          accessor: CONTENT_FIELD_KEY.EDIT,
          Cell: ({ row }) =>
            row.original[CONTENT_FIELD_KEY.ENTITY] === 'category' &&
            row.original[CONTENT_FIELD_KEY.STATUS] !== 'posted' ? (
              <button
                className={`badged-table-cell align-middle btn btn-success border-0 py-2 px-4 `}
                onClick={() => this.handerEdit(row.original)}
              >
                {t('txt_edit')}
              </button>
            ) : null,
        },
        {
          Header: t('txt_transaction'),
          accessor: CONTENT_FIELD_KEY.TRANSACTION,
          Cell: ({ value }) => <div>{value}</div>,
        },
        {
          Header: t('txt_link_post'),
          accessor: CONTENT_FIELD_KEY.LINK_POST,
          Cell: ({ row }) => {
            const data = ContentUtils.getPageDetail(
              row.original[CONTENT_FIELD_KEY.CHANNELS],
              this.listViewModel.channelMasterData
            );

            if (data) {
              return (
                <div>
                  {data.map((channel) => {
                    const link = `${row.original.link_post?.value}?utm_source=${
                      channel.alias
                    }&utm_medium=cpc&utm_campaign=${
                      row.original[CONTENT_FIELD_KEY.CAMPAIGN].value
                    }`;
                    const shortened = shortenString(link, 43, 0);
                    if (row.original.link_post?.value) {
                      return (
                        <div className="me-2 mt-1 mb-1">
                          <button
                            className="px-1 py-1 fs-12 lh-base font-opensans fw-bold btn btn-success cursor-copy"
                            type="button"
                            onClick={this.handleShow}
                          >
                            <i className="text-white p-2">
                              <FontAwesomeIcon icon={faArrowUpFromBracket} />
                            </i>
                          </button>
                          <ModalComponent
                            dialogClassName="share-link"
                            show={this.state.show}
                            onHide={this.handleClose}
                            header={<h3 className="fw-bold title-share-link">Share Link</h3>}
                            body={
                              <div>
                                <p className="mb-0">Anyone with the URL can see the shared post.</p>
                                <div className="d-flex justify-content-start align-items-center pb-5 pt-3">
                                  <div className="border p-1">
                                    {' '}
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                      {shortened}
                                    </a>
                                  </div>
                                  <ButtonShareLink content={link} />
                                </div>
                              </div>
                            }
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              );
            }
          },
        },
        {
          Header: t('txt_status'),
          accessor: CONTENT_FIELD_KEY.STATUS,
          className: 'status',
          Cell: ({ value }) => (
            <span className={`badge bg-${value} mw-100 h-35 d-table-cell align-middle`}>
              {CONTENT_STATUS[value]}
            </span>
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
              searchText={t('search_your_post')}
              classNameTable={'wr_content_list'}
              idKey={this.key}
              view={this.view}
            />
          ) : (
            <ComponentNoData
              icons="/assets/images/ic_upcoming.svg"
              title={t('create_your_1st_project')}
              width="w-50"
            />
          )}
        </>
      );
    }
  }
);

export default withTranslation()(withContentViewModel(ContentsList));
