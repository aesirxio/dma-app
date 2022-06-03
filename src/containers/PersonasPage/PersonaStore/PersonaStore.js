/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { runInAction } from 'mobx';

import PersonaUtils from '../PersonaUtils/PersonaUtils';
import PersonaModel from '../PersonaModel/PersonaModel';
import { AesirxPersonaApiService, AesirxPersonaTemplateApiService } from 'aesirx-dma-lib';
import { PersonaMasterDataModel } from '../../../store/Models/MasterDataModels/PersonaMasterDataModel';
import { ConnectedChannelMasterDataModel } from '../../../store/Models/MasterDataModels/ConnectedChannelMasterDataModel';
import PersonaTemplateUtils from '../PersonaUtils/PersonaTemplateUtils';

export default class PersonaStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

  async fetchPersonas(callbackOnSuccess, callbackOnError, paginationStep = 0, paginationSize = 25) {
    try {
      const PersonaService = new AesirxPersonaApiService();

      const repondedDataFromLibrary = await PersonaService.getPersonas(
        paginationStep,
        paginationSize
      );

      if (repondedDataFromLibrary?.list) {
        const personaDataModels = PersonaUtils.transformPersonaResponseIntoModel(
          repondedDataFromLibrary.list
        );

        if (personaDataModels) {
          runInAction(() => {
            callbackOnSuccess({
              list: personaDataModels,
              pagination: repondedDataFromLibrary.pagination,
            });
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async savePersona(personaData) {
    try {
      const convertedPersonaData = PersonaModel.convertSubmittedDataToAPIService(personaData);

      const personaService = new AesirxPersonaApiService();

      let resultOnSave = null;

      const personaId = convertedPersonaData.id;

      if (personaId === undefined || personaId === null || personaId === 0) {
        resultOnSave = await personaService.createPersona(convertedPersonaData);
      } else {
        resultOnSave = await personaService.updatePersona(convertedPersonaData);
      }

      return resultOnSave;
    } catch (error) {
      return false;
    }
  }

  async deletePersonas(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    try {
      const personaService = new AesirxPersonaApiService();
      const deleteIds = ids.join();
      const respondedFromApi = await personaService.deletePersona(deleteIds);

      if (respondedFromApi.result === true) {
        runInAction(() => {
          callbackOnSuccess();
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getPersona(id) {
    if (!id) return null;

    try {
      const personaService = new AesirxPersonaApiService();

      const repondedDataFromLibrary = await personaService.getPersona(id);

      if (repondedDataFromLibrary) {
        const personaDataModels = PersonaUtils.transformPersonaResponseIntoModel([
          repondedDataFromLibrary,
        ]);

        return personaDataModels;
      }
    } catch (error) {
      return null;
    }
  }

  async getPersonaMasterData(callbackOnSuccess, callbackOnError) {
    try {
      if (!this.globalStore) {
        runInAction(() => {
          callbackOnError({
            message: 'Global Store is NULL',
          });
        });
      } else {
        await this.globalStore.getMasterData(
          {
            isForPersonaMasterData: true,
          },
          (result) => {
            try {
              const resultPersonaInModel = new PersonaMasterDataModel(
                result && result.personaMasterData ? result.personaMasterData : null
              );

              runInAction(() => {
                callbackOnSuccess(resultPersonaInModel);
              });
            } catch (error) {
              runInAction(() => {
                callbackOnError({
                  message:
                    'resultInModel - personaStore - getMasterData - Something went wrong from Server response',
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message:
                  'personaStore - getMasterData - Something went wrong from Server response : ' +
                  error,
              });
            });
          }
        );
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getConnectedChannelsMasterData() {
    if (!this.globalStore) {
      return false;
    }

    const result = await this.globalStore.getMasterData({
      isForConnectedChannelsMasterData: true,
    });

    return new ConnectedChannelMasterDataModel(
      result && result.connectedChannelsMasterData ? result.connectedChannelsMasterData : null
    );
  }

  async getPersonaRecommendations(callbackOnSuccess, callbackOnError, paginationStep) {
    try {
      const personaTemplateAPIService = new AesirxPersonaTemplateApiService();

      const repondedDataFromLibrary = await personaTemplateAPIService.getPersonaTemplates(
        paginationStep,
        100
      );
      if (repondedDataFromLibrary?.list) {
        const personaTemplateDataModels =
          PersonaTemplateUtils.transformPersonaTemplateResponseIntoModel(
            repondedDataFromLibrary.list
          );

        if (personaTemplateDataModels) {
          runInAction(() => {
            callbackOnSuccess({
              list: personaTemplateDataModels,
              pagination: repondedDataFromLibrary.pagination,
            });
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  getPersonaRecommendationItem = async (id, callbackOnSuccess, callbackOnError) => {
    if (!id) return false;

    try {
      const personaTemplateService = new AesirxPersonaTemplateApiService();

      const repondedDataFromLibrary = await personaTemplateService.getPersonaTemplate(id);

      if (repondedDataFromLibrary) {
        const personaDataModels = PersonaTemplateUtils.transformPersonaTemplateResponseIntoModel([
          repondedDataFromLibrary,
        ]);

        if (personaDataModels) {
          runInAction(() => {
            callbackOnSuccess(personaDataModels);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  };

  async searchPersonas(
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1,
    paginationSize = 25
  ) {
    try {
      const personaAPIService = new AesirxPersonaApiService();
      const respondedDataFromLibrary = await personaAPIService.searchPersonas(
        dataFilter,
        paginationStep,
        paginationSize
      );

      let personaDataModels = null;

      if (respondedDataFromLibrary !== null) {
        personaDataModels = PersonaUtils.transformPersonaResponseIntoModel(
          respondedDataFromLibrary.list
        );
      }

      if (personaDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: personaDataModels,
            pagination: respondedDataFromLibrary.pagination,
          });
        });
      } else {
        callbackOnError({
          message: 'No result',
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
