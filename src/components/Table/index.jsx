/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState } from 'react';
import { Collapse, Dropdown } from 'react-bootstrap';
import {
  useTable,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useExpanded,
  usePagination,
} from 'react-table';
import { useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faColumns } from '@fortawesome/free-solid-svg-icons/faColumns';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import styles from './index.module.scss';
import './index.scss';
import { withTranslation } from 'react-i18next';
import GlobalFilter from './GlobalFilter';
import SubRowAsync from './RowSubComponent';
import ComponentDatepicker from '../ComponentDatepicker';
import ComponentFilter from '../ComponentFilter';
import PaginationComponent from './PaginationComponent';
import ComponentNoData from '../ComponentNoData';
import { useTranslation } from 'react-i18next';
import CampaignsDelete from 'containers/CampaignsPage/CampaignsForm/CampaignsDelete';
import ComponentButtonDelete from 'components/ComponentButtonDelete/ComponentButtonDelete';

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
const Table = ({
  rowData,
  tableRowHeader,
  onSelect,
  isThumb,
  dataList,
  dataThumb,
  thumbColumnsNumber,
  searchText = 'Search...',
  isFilter,
  noSelection = false,
  isList = true,
  pageSize = 5,
  noDropDownColumns = false,
  pagination,
  listViewModel,
  searchFunction,
  dataFormFilter,
  hasSubRow,
  isSearch = true,
  _handleList,
  classNameTable,
  idKey,
  view,
}) => {
  const [getState, setState] = useState({
    isName: 'list',
    // isFilter: Object.keys(dataFilter.titleFilter).length > 0 ? true : false,
    isFilter: false,
    indexPagination: 0,
    dataFilter: null,
  });

  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input className="form-check-input p-0" type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  });

  const columns = useMemo(() => tableRowHeader, [tableRowHeader]);

  const data = useMemo(() => rowData, [rowData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    prepareRow,
    page,
    visibleColumns,
    preGlobalFilteredRows,
    allColumns,

    state,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      onSelect,
      initialState: {
        hiddenColumns: dataFilter.columns,
        pageIndex: getState.indexPagination,
        pageSize: pageSize,
      },
      autoResetHiddenColumns: false,
    },
    useFilters,
    useGlobalFilter,
    (hooks) => {
      !noSelection &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div className="wrapper_checkbox">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
    },
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    const selectedIds = Object.keys(selectedRowIds);
    if (selectedIds.length > 0) {
      var selectedRowsData = selectedIds
        .map((x) => data[x])
        .filter(function (x) {
          return x != null;
        });
      onSelect(selectedRowsData);
    } else {
      onSelect([]);
    }
  }, [selectedRowIds, onSelect, data]);

  useEffect(() => {
    if (view !== dataFilter.page) {
      state.hiddenColumns = [];
      setFilter(null, 6);
      setFilter(view, 5);
      setState({ isFilter: false });
    }
  }, [view]);

  useEffect(() => {
    if (setFilter) {
      setFilter(state.hiddenColumns, 2);
    }
    return () => {};
  }, [state.hiddenColumns]);

  const setGlobalFilter = (dataFilter) => {
    if (searchFunction !== undefined) {
      const finalDataFilter = {
        ...getState.dataFilter,
        ...dataFilter,
      };
      setState({
        ...getState,
        dataFilter: finalDataFilter,
      });

      searchFunction(finalDataFilter || undefined);
    }
  };

  const renderRowSubComponent = React.useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
        listViewModel={listViewModel ? listViewModel : null}
        idKey={idKey}
      />
    ),
    [listViewModel, idKey]
  );

  const handleFilter = () => {
    setState({
      ...getState,
      isFilter: !getState.isFilter,
    });
  };

  const { t } = useTranslation('common');
  return (
    <>
      <div className={`mb-4 ${classNameTable}`}>
        <div className="bg-white rounded-3 d-flex align-items-center justify-content-between">
          <div className="wrapper_search_global d-flex align-items-center">
            {isSearch ? (
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
                searchText={searchText}
                listViewModel={listViewModel}
                filter={dataFilter}
                setFilter={setFilter}
              />
            ) : null}
            <div className="px-2 border-end-1">
              <ComponentButtonDelete />
            </div>
            {!noDropDownColumns && (
              <div className="px-2 border-end-1">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="white"
                    id="actions"
                    className={`btn_toggle ${styles.btn_toggle} text-blue-0`}
                  >
                    <i>
                      <FontAwesomeIcon icon={faColumns} />
                    </i>
                    <span className="ps-2 pe-5 opacity-75">{t('txt_columns')}</span>
                    <i className="text-green">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="pt-3 px-2 border-0 shadow">
                    {allColumns.map(
                      (column) =>
                        column.id !== 'selection' &&
                        column.Header !== '' && (
                          <div key={column.id} className="mb-2">
                            <label>
                              <input
                                type="checkbox"
                                {...column.getToggleHiddenProps()}
                                className="form-check-input p-0"
                              />
                              <span className="ps-2">{column.Header}</span>
                            </label>
                          </div>
                        )
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            {isFilter && (
              <>
                <div className="px-2 border-end-1 w-330">
                  <ComponentDatepicker
                    isDown={true}
                    listViewModel={listViewModel}
                    setGlobalFilter={setGlobalFilter}
                    filter={dataFilter}
                    setFilter={setFilter}
                  />
                </div>
                <div className="rounded-0">
                  <button
                    className={`btn text-blue-0 ${getState.isFilter ? 'bg-blue-3' : ''}`}
                    onClick={handleFilter}
                  >
                    <i>
                      <FontAwesomeIcon icon={faFilter} />
                    </i>
                    <span className="ps-2 pe-5 opacity-75">{t('txt_filter')}</span>
                    <i className="text-green">
                      <FontAwesomeIcon icon={getState.isFilter ? faChevronUp : faChevronDown} />
                    </i>
                  </button>
                </div>
              </>
            )}
          </div>
          {isThumb && (
            <div className="d-flex align-items-center">
              <button
                type="button"
                className={`btn text-blue-0 rounded-0 px-4 shadow-none ${
                  isList ? 'bg-blue-3' : ''
                }`}
                onClick={() => _handleList('list')}
              >
                <i>
                  <FontAwesomeIcon icon={faList} />
                </i>
                <span className="ms-2 opacity-75">{t('txt_list')}</span>
              </button>
              <button
                type="button"
                className={`btn text-blue-0 rounded-0 px-4 shadow-none ${
                  !isList ? 'bg-blue-3' : ''
                }`}
                onClick={() => _handleList('thumb')}
              >
                <i>
                  <FontAwesomeIcon icon={faTh} />
                </i>
                <span className="ms-2 opacity-75">{t('txt_thumb')}</span>
              </button>
            </div>
          )}
        </div>
        {isFilter && (
          <>
            <Collapse in={getState.isFilter}>
              <div>
                <div
                  className={`py-2 px-1 bg-blue-3 rounded-2 ${
                    getState.isFilter ? 'z-2 position-relative' : ''
                  }`}
                >
                  {dataFormFilter && (
                    <ComponentFilter
                      dataFormFilter={dataFormFilter}
                      setGlobalFilter={setGlobalFilter}
                      filter={dataFilter}
                      setFilter={setFilter}
                    />
                  )}
                </div>
              </div>
            </Collapse>
            {getState.isFilter && (
              <div
                className="filter-backdrop position-fixed top-0 start-0 end-0 bottom-0 z-1"
                onClick={() => setState({ isFilter: false })}
              ></div>
            )}
          </>
        )}
      </div>
      {isList ? (
        <div className="bg-white p-3 rounded-3">
          <table {...getTableProps()} className={`w-100 mb-4 ${classNameTable}`}>
            <thead>
              {headerGroups.map((headerGroup) => {
                let newHeaderGroup = '';

                dataList
                  ? (newHeaderGroup = headerGroup.headers.filter(
                      (item) => !dataList.some((other) => item.id === other)
                    ))
                  : (newHeaderGroup = headerGroup.headers);

                return (
                  <tr {...headerGroup.getHeaderGroupProps()} className="bg-blue">
                    {newHeaderGroup.map((column) => {
                      return (
                        <th
                          {...column.getHeaderProps()}
                          className="fw-normal px-2 py-3 flex-1 bg-blue"
                        >
                          {column.render('Header')}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.length > 0 &&
                page.map((row) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  let newRowCells = '';

                  dataList
                    ? (newRowCells = row.cells.filter(
                        (item) => !dataList.some((other) => item.column.id === other)
                      ))
                    : (newRowCells = row.cells);

                  return (
                    <React.Fragment key={row.getRowProps().key}>
                      <tr
                        {...row.getRowProps()}
                        className="border-bottom-1 cursor-pointer"
                        //onClick={(e) => handerEdit(e, row.original)}
                      >
                        {newRowCells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="fw-normal px-2 py-3">
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                      {hasSubRow === false
                        ? null
                        : row.isExpanded &&
                          renderRowSubComponent({
                            row,
                            rowProps,
                            visibleColumns,
                          })}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
          {page.length === 0 ? (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title={t('txt_title_no_matching_results')}
              text={t('txt_text_no_matching_results')}
              width="w-50"
            />
          ) : (
            <div className="pagination d-flex align-items-center justify-content-between">
              {pagination && pagination.totalPages > 1 && (
                <>
                  <PaginationComponent
                    pagination={pagination}
                    pageSize={pageSize}
                    listViewModel={listViewModel}
                    isList={isList}
                  />
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div {...getTableBodyProps()} className="row">
          {page.map((row) => {
            prepareRow(row);
            let newRowCells = row.cells;
            if (dataThumb && dataThumb.length > 0) {
              newRowCells = row.cells.filter(
                (item) => !dataThumb.some((other) => item.column.id === other)
              );
            }

            return (
              newRowCells.length > 0 && (
                <div
                  {...row.getRowProps()}
                  className={`col_thumb cursor-pointer ${styles.col_thumb} col-${
                    !thumbColumnsNumber ? '3' : thumbColumnsNumber
                  } mb-4`}
                  //onClick={(e) => handerEdit(e, row.original)}
                  key={Math.random(40, 200)}
                >
                  <div
                    className="item_thumb bg-white shadow-sm h-100 p-3 rounded-2"
                    key={Math.random(40, 200)}
                  >
                    {newRowCells.map((cell) => {
                      return (
                        <div
                          {...cell.getCellProps()}
                          className={`ct_cell ${styles.ct_cell} d-block`}
                          key={Math.random(40, 200)}
                        >
                          {cell.render('Cell')}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            );
          })}
          {page.length === 0 ? (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title={t('txt_title_no_matching_results')}
              text={t('txt_text_no_matching_results')}
              width="w-50"
            />
          ) : (
            <div className="pagination d-flex align-items-center justify-content-between">
              {pagination && pagination.totalPages > 1 && (
                <>
                  <PaginationComponent
                    pagination={pagination}
                    pageSize={pageSize}
                    listViewModel={listViewModel}
                    isList={isList}
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

export default withTranslation('common')(Table);
