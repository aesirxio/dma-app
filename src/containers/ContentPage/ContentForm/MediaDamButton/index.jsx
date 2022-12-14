/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';

import './index.scss';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { AesirXDam } from 'aesirx-dam-app';
const ModalComponent = lazy(() => import('../../../../components/Modal'));

class MediaDamButton extends React.Component {
  modalSelectionDAMSession = null;

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  handleClick = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <>
        <button
          className="wr_btn_dam border-0 bg-blue-2 rounded-2 px-3 text-nowrap canva-btn-size-m"
          onClick={this.handleClick}
          type="button"
        >
          <i className="text-white">
            <FontAwesomeIcon icon={faImage} />
          </i>
          <span className="text-white ms-2">
            {this.props.video ? t('txt_video') : t('txt_digital_asset_management')}
          </span>
        </button>
        <ModalComponent
          body={
            <AesirXDam
              onSelect={(data) => {
                this.props.changed(data);
                this.closeModal();
              }}
            />
          }
          show={this.state.showModal}
          onHide={this.closeModal}
          dialogClassName="modal-fullscreen modal_digital_assets position-fixed start-0"
        />
      </>
    );
  }
}

MediaDamButton.defaultProps = {
  video: false,
};

export default withTranslation('common')(MediaDamButton);
