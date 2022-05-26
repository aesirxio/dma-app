/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withCampaignTableSelectionModalViewModel } from "./CampaignTableSelectionModalViewModelContextProvider";
import { CAMPAIGNS_FIELD_KEY } from "../../constants/CampaignsModule";
import PAGE_STATUS from "../../constants/PageStatus";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";

const ModalComponent = lazy(() => import("../../components/Modal"));

const CampaignTableSelectionModal = observer(
  class CampaignTableSelectionModal extends Component {
    CampaignTableSelectionModalViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("CampaignTableSelectionModalViewModel - Debug View Model");
      console.log(viewModel);

      this.CampaignTableSelectionModalViewModel = viewModel ? viewModel : null;

      console.log("this.CampaignTableSelectionModalViewModel");
      console.log(this.CampaignTableSelectionModalViewModel);
    }

    componentDidMount() {
      this.CampaignTableSelectionModalViewModel.loadDataIntoUI();
    }

    selectCampaignItemHandler = (e, row) => {
      this.CampaignTableSelectionModalViewModel.setSelectionData(row);
      this.CampaignTableSelectionModalViewModel.closeModal();
    };

    render() {
      const {
        tableStatus,
        CampaignsMasterData,
        show,
      } = this.CampaignTableSelectionModalViewModel;

      if (!show) return null;

      console.log("[CampaignTableSelectionModal] - re-render .........");

      console.log(CampaignsMasterData);
      console.log(this.CampaignTableSelectionModalViewModel);

      const tableRowHeader = [
        {
          Header: "Campaign Name",
          accessor: CAMPAIGNS_FIELD_KEY.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div className="d-flex">
              <span
                className="ms-2 text-black opacity-75"
                onClick={(e) => this.selectCampaignItemHandler(e, row.original)}
              >
                {row.original[CAMPAIGNS_FIELD_KEY.NAME]}
              </span>
            </div>
          ),
        },
        {
          Header: "Campaign ID",
          accessor: CAMPAIGNS_FIELD_KEY.ID,
        },
        {
          Header: "Start date",
          accessor: CAMPAIGNS_FIELD_KEY.START_DATE,
        },
        {
          Header: "End date",
          accessor: CAMPAIGNS_FIELD_KEY.END_DATE,
        },
        // {
        //   Header: "Status",
        //   accessor: CAMPAIGNS_FIELD_KEY.STATUS,
        //   className: "status",
        //   Cell: ({ value }) => {
        //     return (
        //       <span
        //         className={`badge ${value.className} mw-100 h-35 d-table-cell align-middle`}
        //       >
        //         {value.text}
        //       </span>
        //     );
        //   },
        // },
      ];

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <ModalComponent
          show={show}
          onHide={this.CampaignTableSelectionModalViewModel.closeModal}
          header={"Choose campaigns"}
          dialogClassName="modal-lg modal_content_general"
          body={
            <Table
              rowData={CampaignsMasterData}
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

export default withCampaignTableSelectionModalViewModel(
  CampaignTableSelectionModal
);
