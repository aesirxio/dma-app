/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component, lazy } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import { withContentViewModel } from '../ContentViewModels/ContentViewModelContextProvider';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { CHANNEL_ADS_GOOGLE } from '../../../constants/ChannelModule';

const ContentActionBar = observer(
  class ContentActionBar extends Component {
    contentFormViewModel = null;
    contentsListViewModel = null;
    channelsListViewModel = null;
    contentConnectedChannelsByOrganisationViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      console.log('ContentActionBar - Debug View Model');
      console.log(viewModel);
      this.contentFormViewModel = viewModel ? viewModel.getFormViewModel() : null;

      this.contentsListViewModel = viewModel ? viewModel.getListViewModel() : null;

      console.log('ContentActionBar - After binding class');
      console.log(this.contentFormViewModel);
    }

    createContentHandler = (event) => {
      this.contentFormViewModel.openModal();
    };

    handerDeleteContent = () => {
      this.contentsListViewModel.deleteContents();
    };

    render() {
      console.log('[ContentActionBar] - re-render .........');

      return (
        <div className="d-flex justify-content-end">
          {/*  TODO Move to filter block */}
          <Dropdown className="me-3">
            <Dropdown.Toggle variant="info" id="actions">
              Choose an action
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item onClick={this.handerDeleteContent}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Link to="/content/create" className="btn btn-success">
            <i className="me-2">
              <FontAwesomeIcon icon={faPlus} />
            </i>
            <span>Create post</span>
          </Link>
        </div>
      );
    }
  }
);

export default withContentViewModel(ContentActionBar);
