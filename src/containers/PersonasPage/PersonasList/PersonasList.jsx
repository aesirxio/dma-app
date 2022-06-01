/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component } from 'react';

import history from '../../../routes/history';

import PAGE_STATUS from '../../../constants/PageStatus';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import Table from '../../../components/Table';
import Spinner from '../../../components/Spinner';

import { observer } from 'mobx-react';
import { withPersonaViewModel } from '../PersonaViewModels/PersonaViewModelContextProvider';
import ComponentNoData from '../../../components/ComponentNoData';

const PersonasList = observer(
  class PersonasList extends Component {
    personaListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      this.personaListViewModel = viewModel ? viewModel.getPersonaListViewModel() : null;

      this.personaFormModalViewModel = viewModel ? viewModel.getPersonaFormViewModel() : null;
    }

    componentDidMount() {
      this.personaListViewModel.initializeData();
    }

    handerEditPersona = (e, row) => {
      history.push(`/personas/edit/${row[PERSONA_FIELD_KEY.ID]}`);
    };

    handerSelectPersona = (data) => {
      this.personaListViewModel.personaIdsSelected = data
        .map((item) => {
          return item[PERSONA_FIELD_KEY.ID];
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    render() {
      const { tableStatus, personas, pagination } = this.personaListViewModel;


      const tableRowHeader = [
        {
          Header: 'Name',
          accessor: PERSONA_FIELD_KEY.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              <span
                className="text-black opacity-75"
                onClick={(e) => this.handerEditPersona(e, row.original)}
              >
                {row.original[PERSONA_FIELD_KEY.NAME]}
              </span>
            </div>
            // )
          ),
        },

        {
          Header: 'Created Date',
          accessor: PERSONA_FIELD_KEY.CREATED_DATE,
        },
        {
          Header: 'Updated Date',
          accessor: PERSONA_FIELD_KEY.UPDATED_DATE,
        },
      ];

      return (
        <>
          {personas ? (
            tableStatus === PAGE_STATUS.LOADING ? (
              <Spinner />
            ) : (
              <Table
                rowData={personas}
                tableRowHeader={tableRowHeader}
                onSelect={this.handerSelectPersona}
                pagination={pagination}
                pageSize={this.personaListViewModel.pageSize}
                listViewModel={this.personaListViewModel}
                searchFunction={this.personaListViewModel.searchPersonas}
                searchText="Search your personas"
              ></Table>
            )
          ) : (
            <ComponentNoData
              icons="/assets/images/ic_upcoming.svg"
              title="Create your 1st persona"
              width="w-50"
            />
          )}
        </>
      );
    }
  }
);

export default withPersonaViewModel(PersonasList);
