/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import { withPersonaTableSelectionModalViewModel } from './PersonaTableSelectionModalViewModelContextProvider';
import {
  PERSONA_COLUMN_INDICATOR,
  PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR,
} from '../../constants/PersonaModule';
import PAGE_STATUS from '../../constants/PageStatus';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';

const ModalComponent = lazy(() => import('../../components/Modal'));

const PersonaTableSelectionModal = observer(
  class PersonaTableSelectionModal extends Component {
    personaTableSelectionModalViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log('personaTableSelectionModalViewModel - Debug View Model');
      console.log(viewModel);
      this.personaTableSelectionModalViewModel = viewModel ? viewModel : null;
    }

    componentDidMount() {
      this.personaTableSelectionModalViewModel.loadDataIntoUI();
    }

    selectPersonaItemHandler = (e, row) => {
      this.personaTableSelectionModalViewModel.setSelectionData(row);
      this.personaTableSelectionModalViewModel.closeModal();
    };

    render() {
      const { tableStatus, personasMasterData, show } = this.personaTableSelectionModalViewModel;
      console.log('before - this.personaTableSelectionModalViewModel');
      console.log(this.personaTableSelectionModalViewModel);
      if (!show) return null;

      console.log('[PersonaTableSelectionModal] - re-render .........');

      console.log(personasMasterData);

      const tableRowHeader = [
        {
          Header: 'Name',
          accessor: PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div className="d-flex">
              <span
                className="ms-2 text-black opacity-75"
                onClick={(e) => this.selectPersonaItemHandler(e, row.original)}
              >
                {row.original[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.NAME]}
              </span>
            </div>
          ),
        },
        {
          Header: 'PERSONA ID',
          accessor: PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.ID,
        },
      ];

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <ModalComponent
          show={show}
          onHide={this.personaTableSelectionModalViewModel.closeModal}
          header={'Choose personas'}
          dialogClassName="modal-lg modal_content_general"
          body={
            <Table
              rowData={personasMasterData}
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

export default withPersonaTableSelectionModalViewModel(PersonaTableSelectionModal);
