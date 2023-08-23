/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { withInvesterContactViewModel } from '../InvesterContactViewModels/InvesterContactViewModelContextProvider';

const InvesterContactList = observer(
  class InvesterContactList extends Component {
    investerContactListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;

      this.investerContactListViewModel = viewModel
        ? viewModel.getInvesterContactListViewModel()
        : null;
    }

    render() {
      return <div className="position-fixed end-0 bottom-0 me-4 mb-3 z-index-100"></div>;
    }
  }
);

export default withInvesterContactViewModel(InvesterContactList);
