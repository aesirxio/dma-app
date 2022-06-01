/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import { WEBSOCKET_EVENT_SIGNATURES } from '../constants/WebSocketClient';
import { AUTHORIZATION_KEY, GENERAL_CONFIG, Storage } from 'aesirx-dma-lib';
import { io } from 'socket.io-client';
import { notifyHTML } from '../components/Toast';

class ChannelCallbackNotify {
  constructor(channelsListViewModel) {
    this.organisationId = Storage.getItem(AUTHORIZATION_KEY.ORGANISATION_ID, null);
    this.roomID = null;
    this.socket = null;
    this.channelsListViewModel = channelsListViewModel;
    this.classBindingHandler();

    this.isAuthenticated = Storage.getItem('auth', false);
    this.isValidWSClient = this.isAuthenticated && this.organisationId;
    if (this.isValidWSClient) {
      this.socketInitializationHandler();
    }

    // this.up();
  }

  socketInitializationHandler() {
    this.socket = io(GENERAL_CONFIG.WEBSOCKET_ENDPOINT, {
      autoConnect: false,
    });

    this.socket.on(
      WEBSOCKET_EVENT_SIGNATURES.CPN_ON_WEBSOCKET_ERROR,
      this.onSocketErrorHandler.bind(this)
    );
  }

  classBindingHandler = () => {
    this.up.bind(this);
    this.onReceivingAForwardedMessageFromServer.bind(this);
    this.closeWebSocketClientInstance.bind(this);
    this.onSocketErrorHandler.bind(this);
  };

  onReceivingAForwardedMessageFromServer(roomID, messageObject) {
    const channelConnected = JSON.parse(messageObject.channelConnected);

    if (channelConnected?.length > 0) {
      let message = 'Connected successfully: <ul>';

      channelConnected.forEach((channel) => {
        message += `<li>${channel}</li>`;
      });

      notifyHTML(message + '</ul>');

      this.channelsListViewModel.setChannelsDataFromWebsocket(messageObject.channelsData);
    }
  }

  closeWebSocketClientInstance() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
    this.socket.close();
  }

  onSocketErrorHandler(error) {
    try {
      this.errorHandler(error);
      this.closeWebSocketClientInstance();
    } catch (error) {}
  }

  up = () => {
    try {
      this.roomID = ''
        .concat('CALLBACK_CHANNEL_NOTIFY_')
        .concat('organisationId=')
        .concat(this.organisationId)
        .trim();
      // WS Client gets started a CONNECTION
      this.socket.connect();

      this.socket.on('connect', () => {
        if (this.socket.connected) {
          // Send server a signal to join room by a predefined {roomID}
          this.socket.emit(WEBSOCKET_EVENT_SIGNATURES.CPN_JOINING_ROOM, this.roomID);

          // WS Client EMIT an Event of PUSH_NOTIFICATION to REACT-APP
          this.socket.on(
            WEBSOCKET_EVENT_SIGNATURES.FORWARD_CALLBACK_CHANNEL,
            this.onReceivingAForwardedMessageFromServer.bind(this)
          );
        }
      });
    } catch (ex) {
      this.closeWebSocketClientInstance.bind(this);
    }
    return this;
  };

  static __init(channelsListViewModel) {
    return new ChannelCallbackNotify(channelsListViewModel).up();
  }
}

export default ChannelCallbackNotify;
