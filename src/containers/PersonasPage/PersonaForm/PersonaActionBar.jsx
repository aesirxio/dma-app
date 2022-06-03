/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';

import { withPersonaViewModel } from '../PersonaViewModels/PersonaViewModelContextProvider';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

class PersonaActionBar extends Component {
  personaFormViewModel = null;
  personasListViewModel = null;
  constructor(props) {
    super(props);
    const { viewModel } = props;
    this.personaFormViewModel = viewModel ? viewModel.getPersonaFormViewModel() : null;

    this.personasListViewModel = viewModel ? viewModel.getPersonaListViewModel() : null;

  }

  handerDeletePersona = () => {
    this.personasListViewModel.deletePersonas();
  };

  render() {

    return (
      <div className="d-flex justify-content-end">
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="info" id="actions">
            Choose an action
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            <Dropdown.Item onClick={this.handerDeletePersona}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link to={'/personas/create'} className="btn btn-success">
          <i className="green me-2">
            <FontAwesomeIcon icon={faPlus} />
          </i>
          <span>Create a new persona</span>
        </Link>
      </div>
    );
  }
}
export default withPersonaViewModel(PersonaActionBar);
