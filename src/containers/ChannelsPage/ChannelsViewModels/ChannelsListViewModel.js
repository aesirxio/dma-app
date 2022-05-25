import { runInAction, makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import { notify } from '../../../components/Toast';
import ChannelUtils from '../ChannelUtils/ChannelUtils';
class ChannelsListViewModel {
  channelsStore = null;
  channelsData = null;

  tableStatus = PAGE_STATUS.LOADING;

  showUpgrade = false;

  constructor(channelsStore) {
    makeAutoObservable(this);

    this.channelsStore = channelsStore;
  }

  init = async () => {
    try {
      this.tableStatus = PAGE_STATUS.LOADING;

      const channelsData = await this.channelsStore.getChannelsData();

      runInAction(() => {
        this.channelsData = channelsData;
        this.tableStatus = PAGE_STATUS.READY;
      });
    } catch (error) {
      this.catchError(error);
    }
  };

  reset = () => {
    this.channelsData = null;
    this.tableStatus = PAGE_STATUS.LOADING;
  };

  setChannelsDataFromWebsocket = (channelsData) => {
    console.log('setChannelsDataFromWebsocket');
    console.log(channelsData);
    this.channelsData = ChannelUtils.transformChannelResponseIntoModel(JSON.parse(channelsData));
  };

  connectChannel = async (channelType) => {
    try {
      const response = await this.channelsStore.getChannelLoginUrl(channelType);

      if (response?.result?.must_upgrade) {
        this.mustUpgrade = true;
        return;
      }

      window.open(response.result.loginUrl, 'popup', 'width=600,height=600');

      // Todo: we need web socket to get data
    } catch (error) {
      this.catchError(error);
    }
  };

  closeModalUpgrade = () => {
    this.showUpgrade = false;
  };

  actions = async (action, channelType, channel) => {
    try {
      let msg = '';
      let status = await this.channelsStore[action](channelType.id, channel.id);

      switch (action) {
        case 'reconnectChannel':
          msg = `Reconnected ${channel.name} successfully`;

          if (!status.status) {
            this.showUpgrade = true;
          } else {
            //notify(msg);
            channel.connected = !channel.connected;
          }

          break;

        case 'disconnectChannel':
          msg = `Disconnected ${channel.name} successfully`;

          if (status.status) {
            //notify(msg);
            channel.connected = !channel.connected;
          } else {
            throw new Error(`Update ${channel.id} failed`);
          }

          break;

        case 'removeChannel':
          msg = `Removed ${channel.name} successfully`;

          if (status) {
            notify(msg);
            channelType.pages = channelType.pages.filter((item) => item.id !== channel.id);
          } else {
            throw new Error(`Update ${channel.id} failed`);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      this.catchError(error);
      return false;
    }
  };

  catchError = (error) => {
    notify('Something went wrong from Server response. Please try again.');
    console.log(error);
  };
}

export default ChannelsListViewModel;
