/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import { withGroupViewModel } from '../GroupListViewModels/GroupViewModelContextProvider';
import { Button } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import PAGE_STATUS from '../../../constants/PageStatus';
import { Spinner } from 'aesirx-uikit';
import { ModalComponent } from 'aesirx-uikit';

const GroupListForm = lazy(() => import('./GroupListForm'));

const GroupListFormModal = observer(
  class GroupListFormModal extends Component {
    GroupFormModalViewModal = null;

    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
      };
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      const { viewModel } = props;
      this.GroupFormModalViewModal = viewModel ? viewModel.getFormModalViewModel() : null;
    }

    saveGroupHandler = () => {
      if (this.isFormValid()) {
        this.setState({ isLoading: true });
        this.GroupFormModalViewModal.saveOnModal(() => {
          this.setState({ isLoading: false });
        });
      }
    };

    isFormValid = () => {
      if (this.validator.allValid()) {
        return true;
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        return false;
      }
    };

    render() {
      const { show, editMode, formStatus } = this.GroupFormModalViewModal;
      const { t } = this.props;

      if (!show) {
        return null;
      }

      if (formStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <ModalComponent
          show={show}
          onHide={this.GroupFormModalViewModal.closeModal}
          header={editMode === false || editMode == null ? t('create_group') : t('edit_group')}
          body={<GroupListForm viewModel={this.GroupFormModalViewModal} />}
          footer={
            <Button
              disabled={this.state.isLoading}
              onClick={this.saveGroupHandler}
              className="btn btn-success w-100"
            >
              {this.state.isLoading ? (
                <div className="ps-2 btn_loading">
                  <div
                    className="spinner-border"
                    style={{ width: '1.7rem', height: '1.7rem' }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <span>
                    {editMode === false || editMode == null ? t('create_group') : t('save_group')}
                  </span>
                  <i className="ms-1">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </i>
                </>
              )}
            </Button>
          }
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withTranslation()(withGroupViewModel(GroupListFormModal));
