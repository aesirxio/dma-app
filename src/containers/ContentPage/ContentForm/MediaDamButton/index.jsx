/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { lazy } from 'react';

import Iframe from 'react-iframe';
import { AUTHORIZATION_KEY, AXIOS_CONFIGS, GENERAL_CONFIG, Storage } from 'aesirx-dma-lib';
import { io } from 'socket.io-client';
import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';

const ModalComponent = lazy(() => import('../../../../components/Modal'));

class MediaDamButton extends React.Component {
  modalSelectionDAMSession = null;
  roomID = null;
  urlDam = '';

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
    this.onWebSocketCallbackSuccess.bind(this);
  }

  componentDidMount() {
    this.modalSelectionDAMSession = Math.floor(Date.now() / 1000);
    const type = this.props.video ? 'VIDEO_' : 'IMAGE_';
    this.modalSelectionDAMSession = type + this.modalSelectionDAMSession;

    this.roomID = 'DAM_BTN_WS_CLIENT_'.concat(this.modalSelectionDAMSession);
    this.socket = io(GENERAL_CONFIG.WEBSOCKET_ENDPOINT, {
      autoConnect: false,
    });

    if (!this.socket.connected) {
      this.socket.connect();
    }

    this.socket.on('connect', () => {
      this.socket.emit('join room', this.roomID);
      this.socket.on('response assets', this.onWebSocketCallbackSuccess);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket.close();
  }

  onWebSocketCallbackSuccess = (roomId, data) => {
    if (roomId === this.roomID && data) {
      this.closeModal();
      this.props.changed(data);
    }
  };

  handleClick = () => {
    this.urlDam = AXIOS_CONFIGS.BASE_ENDPOINT_URL.concat(
      '/administrator/index.php?option=com_aesir_dam&view=aesirx_dam'
    )
      .concat('&token=')
      .concat(Storage.getItem(AUTHORIZATION_KEY.TOKEN_USER))
      .concat('&modalSelectionDAMSession=')
      .concat(this.modalSelectionDAMSession);

    if (this.props.video) {
      this.urlDam += '&file_type=mp4';
    }

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
            {this.props.video ? 'Video' : 'Digital Asset Management'}
          </span>
        </button>
        <ModalComponent
          header={'Digital Assets'}
          body={
            <Iframe
              url={this.urlDam}
              width="100%"
              height="100%"
              id="ifram_digital_assets"
              className="myClassname ifram_digital_assets"
              display="initial"
              position="relative"
            />
          }
          show={this.state.showModal}
          onHide={this.closeModal}
          dialogClassName="modal-fullscreen modal_digital_assets "
        />
      </>
    );
  }
}

MediaDamButton.defaultProps = {
  video: false,
};

export default MediaDamButton;
