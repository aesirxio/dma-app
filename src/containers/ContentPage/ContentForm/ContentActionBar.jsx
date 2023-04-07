/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withContentViewModel } from '../ContentViewModels/ContentViewModelContextProvider';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

const ContentActionBar = observer(
  class ContentActionBar extends Component {
    contentFormViewModel = null;
    channelsListViewModel = null;
    contentConnectedChannelsByOrganisationViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.contentFormViewModel = viewModel ? viewModel.getFormViewModel() : null;
    }

    createContentHandler = () => {
      this.contentFormViewModel.openModal();
    };

    render() {
      const { t } = this.props;
      return (
        <div className="d-flex justify-content-end">
          <Link
            to="/content/create"
            className="btn btn-success d-flex align-items-center justify-content-center"
          >
            <i className="me-2">
              <FontAwesomeIcon icon={faPlus} />
            </i>
            <span>{t('txt_create_post')}</span>
          </Link>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withContentViewModel(ContentActionBar));
