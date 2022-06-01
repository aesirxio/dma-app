/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import PAGE_STATUS from '../../../constants/PageStatus';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import { withInvesterContactViewModel } from '../InvesterContactViewModels/InvesterContactViewModelContextProvider';

import InvesterContactForm from './InvesterContactForm';
import ModalComponent from '../../../components/Modal';

// const ModalComponent = lazy(() => import("../../../components/Modal"));
// const InvesterContactForm = lazy(() => import("./InvesterContactForm"));

const InvesterContactFormModal = observer(
  class InvesterContactFormModal extends Component {
    investerContactFormViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.investerContactFormViewModel = viewModel
        ? viewModel.getInvesterContactFormViewModel()
        : null;
    }

    handleInvesterContactModal = () => {
      this.investerContactFormViewModel.openModal();
    };

    handleSaveInvesterContact = () => {
      this.investerContactFormViewModel.saveInvesterContact();
    };

    render() {
      const { show } = this.investerContactFormViewModel;

      return (
        <>
          <div className="position-fixed end-0 bottom-0 me-4 mb-3 z-index-100">
            <span
              style={{ cursor: 'pointer' }}
              className="border-0 bg-white shadow-lg rounded-circle w-55 h-55 cursor-pointer d-flex align-items-center justify-content-center bg-green"
              onClick={this.investerContactFormViewModel.openModal}
            >
              <i className="text-white fs-4">
                <FontAwesomeIcon icon={faCommentAlt} />
              </i>
            </span>
          </div>
          <ModalComponent
            show={show}
            header={'Invester contact'}
            body={<InvesterContactForm viewModel={this.investerContactFormViewModel} />}
            onHide={this.investerContactFormViewModel.closeModal}
            footer={
              <Button onClick={this.handleSaveInvesterContact} className="btn btn-success w-100">
                <span>Submit</span>
                <i className="ms-1">
                  <FontAwesomeIcon icon={faChevronRight} />
                </i>
              </Button>
            }
          />
        </>
      );
    }
  }
);

export default withInvesterContactViewModel(InvesterContactFormModal);
