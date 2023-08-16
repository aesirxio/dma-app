/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import { withChannelsViewModel } from '../ChannelsViewModels/ChannelsViewModelContextProvider';

import {
  CHANNEL_CMS_MEDIUM,
  CHANNEL_CMS_JOOMLA,
  CHANNEL_TELEGRAM,
  CHANNEL_CMS_TWRITEFREELY,
} from '../../../constants/ChannelModule';
import LoginChannelCMSForm from './LoginChannelCMSForm';
import LoginChannelCMSMedium from './LoginChannelCMSMedium';
import LoginChannelCMSFormJoomla from './LoginChannelCMSFormJoomla';
import LoginChannelFormTelegram from './LoginChannelFormTelegram';
import LoginChannelFormWriteFreely from './LoginChannelFormWriteFreely';

const ModalComponent = lazy(() => import('../../../components/Modal'));

const LoginChannelCMSFormModal = observer(
  class LoginChannelCMSFormModal extends Component {
    loginCMSChannelFormModalViewModel = null;

    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      const { viewModel } = props;

      this.loginCMSChannelFormModalViewModel = viewModel
        ? viewModel.loginCMSChannelFormModalViewModel
        : null;
    }

    saveCMSHandler = (channelUniqueName) => {
      if (this.isFormValid()) {
        this.loginCMSChannelFormModalViewModel.saveCMSHandler(channelUniqueName);
      }
    };

    handleCloseModal = () => {
      this.loginCMSChannelFormModalViewModel.closeModal();
      this.validator.hideMessages();
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
      const { show, channelType } = this.loginCMSChannelFormModalViewModel;

      if (!show) {
        return null;
      }

      let header = `Add your ${channelType.name} details`;
      let buttonTitle = 'Save';

      let eventName = channelType.id;

      return (
        <ModalComponent
          show={show}
          onHide={this.handleCloseModal}
          header={header}
          body={
            eventName === CHANNEL_CMS_MEDIUM ? (
              <LoginChannelCMSMedium
                viewModel={this.loginCMSChannelFormModalViewModel}
                validator={this.validator}
              />
            ) : eventName === CHANNEL_CMS_JOOMLA ? (
              <LoginChannelCMSFormJoomla
                viewModel={this.loginCMSChannelFormModalViewModel}
                validator={this.validator}
              />
            ) : eventName === CHANNEL_TELEGRAM ? (
              <LoginChannelFormTelegram
                viewModel={this.loginCMSChannelFormModalViewModel}
                validator={this.validator}
              />
            ) : eventName === CHANNEL_CMS_TWRITEFREELY ? (
              <LoginChannelFormWriteFreely
                viewModel={this.loginCMSChannelFormModalViewModel}
                validator={this.validator}
              />
            ) : (
              <LoginChannelCMSForm
                viewModel={this.loginCMSChannelFormModalViewModel}
                validator={this.validator}
              />
            )
          }
          footer={
            <Button
              onClick={() => this.saveCMSHandler(eventName)}
              className="btn btn-success w-100"
            >
              <span>{buttonTitle}</span>
              <i className="ms-1">
                <FontAwesomeIcon icon={faChevronRight} />
              </i>
            </Button>
          }
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withChannelsViewModel(LoginChannelCMSFormModal);
