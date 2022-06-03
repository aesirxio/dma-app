/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withProjectTableSelectionModalViewModel } from "./ProjectTableSelectionModalViewModelContextProvider";
import {
  PROJECT_COLUMN_INDICATOR,
  PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR,
} from "../../constants/ProjectModule";
import PAGE_STATUS from "../../constants/PageStatus";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";

const ModalComponent = lazy(() => import("../../components/Modal"));

const ProjectTableSelectionModal = observer(
  class ProjectTableSelectionModal extends Component {
    projectTableSelectionModalViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      this.projectTableSelectionModalViewModel = viewModel ? viewModel : null;
    }

    componentDidMount() {
      this.projectTableSelectionModalViewModel.loadDataIntoUI();
    }

    selectProjectItemHandler = (e, row) => {
      this.projectTableSelectionModalViewModel.setSelectionData(row);
      this.projectTableSelectionModalViewModel.closeModal();
    };

    render() {
      const {
        tableStatus,
        projectsMasterData,
        show,
      } = this.projectTableSelectionModalViewModel;

      if (!show) return null;

      const tableRowHeader = [
        {
          Header: "Name",
          accessor: PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div className="d-flex">
              <span
                className="ms-2 text-black opacity-75"
                onClick={(e) => this.selectProjectItemHandler(e, row.original)}
              >
                {row.original[PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.NAME]}
              </span>
            </div>
          ),
        },
        {
          Header: "Project ID",
          accessor: PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.ID,
        },
        // {
        //   Header: "Start date",
        //   accessor: PROJECT_COLUMN_INDICATOR.START_DATE,
        // },
        // {
        //   Header: "End date",
        //   accessor: PROJECT_COLUMN_INDICATOR.END_DATE,
        // },
      ];

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <ModalComponent
          show={show}
          onHide={this.projectTableSelectionModalViewModel.closeModal}
          header={"Choose A Project"}
          dialogClassName="modal-lg modal_content_general"
          body={
            <Table
              rowData={projectsMasterData}
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

export default withProjectTableSelectionModalViewModel(
  ProjectTableSelectionModal
);
