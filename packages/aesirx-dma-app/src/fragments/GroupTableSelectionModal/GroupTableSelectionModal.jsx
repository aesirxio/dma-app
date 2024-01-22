/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import { withGroupTableSelectionModalViewModel } from './GroupTableSelectionModalViewModelContextProvider';
import { GROUP_FIELD_KEY } from '../../constants/GroupModule';
import PAGE_STATUS from '../../constants/PageStatus';
import { Spinner } from 'aesirx-uikit';
import Table from '../../components/Table';

const ModalComponent = lazy(() => import('../../components/Modal'));

const GroupTableSelectionModal = observer(
  class GroupTableSelectionModal extends Component {
    groupTableSelectionModalViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      this.groupTableSelectionModalViewModel = viewModel ? viewModel : null;
    }

    componentDidMount() {
      this.groupTableSelectionModalViewModel.loadDataIntoUI();
    }

    selectGroupItemHandler = (e, row) => {
      this.groupTableSelectionModalViewModel.setSelectionData(row);
      this.groupTableSelectionModalViewModel.closeModal();
    };

    render() {
      const { tableStatus, groupsMasterData, show } = this.groupTableSelectionModalViewModel;

      if (!show) return null;

      const tableRowHeader = [
        {
          Header: 'Name',
          accessor: GROUP_FIELD_KEY.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div className="d-flex">
              <span
                className="ms-2 text-black opacity-75"
                G
                onClick={(e) => this.selectGroupItemHandler(e, row.original)}
              >
                {row.original[GROUP_FIELD_KEY.NAME]}
              </span>
            </div>
          ),
        },
        {
          Header: 'Group ID',
          accessor: GROUP_FIELD_KEY.ID,
        },
      ];

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <ModalComponent
          show={show}
          onHide={this.groupTableSelectionModalViewModel.closeModal}
          header={'Choose A Group'}
          dialogClassName="modal-lg modal_content_general"
          body={
            <Table
              rowData={groupsMasterData}
              tableRowHeader={tableRowHeader}
              noSelection={true}
              noColumns={true}
              noDropDownColumns={true}
            ></Table>
          }
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withGroupTableSelectionModalViewModel(GroupTableSelectionModal);
