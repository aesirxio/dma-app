/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import Iframe from 'react-iframe';
import { AUTHORIZATION_KEY, AXIOS_CONFIGS, GENERAL_CONFIG, Storage } from 'aesirx-dma-lib';
import { io } from 'socket.io-client';
import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

const ModalComponent = lazy(() => import('../../components/Modal'));

const socket = io(GENERAL_CONFIG.WEBSOCKET_ENDPOINT, {
  autoConnect: false,
});

class VideoButton extends Component {
  modalSelectionDAMSession = null;
  roomID = null;
  constructor(props) {
    super(props);
    this.socket = socket;
    this.state = {
      showModal: false,
    };
    this.onWebSocketCallbackSuccess.bind(this);
  }

  componentDidMount() {
    this.modalSelectionDAMSession = Math.floor(Date.now() / 1000);
    this.roomID = 'DAM_BTN_WS_CLIENT_'.concat(this.modalSelectionDAMSession);
    // WS Client gets started a CONNETION
    this.socket.connect();

    this.socket.on('connect', () => {
      if (this.socket.connected) {
        // Send server a signal to join room by a predefined {roomID}
        this.socket.emit('join room', this.roomID);

        // WS Client listens on event of "response assets"
        this.socket.on('response assets', this.onWebSocketCallbackSuccess);
      }
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket.close();
  }

  onWebSocketCallbackSuccess = (roomId, data) => {
    if (roomId === this.roomID && data) {
      this.closeModal();
      this.socket.disconnect();
      this.socket.close();

      this.props.changed(data);
    }
  };

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
    const urlDam = AXIOS_CONFIGS.BASE_ENDPOINT_URL.concat(
      '/administrator/index.php?option=com_aesir_dam&view=aesirx_dam'
    )
      .concat('&token=')
      .concat(Storage.getItem(AUTHORIZATION_KEY.TOKEN_USER))
      .concat('&modalSelectionDAMSession=')
      .concat(this.modalSelectionDAMSession);

    let { dataVideo, checkTypeVideo } = this.props;

    return (
      <>
        <div className={`lg_btn_dam_assets ${dataVideo ? 'w-50' : ''}`}>
          <button
            className="wr_btn_dam border-0 ms-2 bg-blue-2 rounded-2 px-3"
            onClick={this.handleClick}
            type="button"
          >
            <i className="text-white">
              <FontAwesomeIcon icon={faVideo} />
            </i>
            <span className="text-white ms-2">Video</span>
          </button>
          {dataVideo && (
            <div>
              {dataVideo.map((value, key) => {
                return (
                  <video key={key} width="300" controls className="mt-3">
                    <source src={value.url} type="video/mp4" />
                  </video>
                );
              })}
            </div>
          )}
          {checkTypeVideo && <p className="mt-2 text-danger">Supported .mp4 only</p>}
        </div>
        <ModalComponent
          header={'Digital Assets'}
          body={
            <Iframe
              url={urlDam}
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

export default VideoButton;
