/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from 'react';
import { runInAction } from 'mobx';

import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import PersonaUtils from '../PersonaUtils/PersonaUtils';
import PersonaModel from '../PersonaModel/PersonaModel';
import {
  AesirxPersonaApiService,
  AesirxPersonaTemplateApiService,
  AesirxFacebookDataApiService,
} from 'aesirx-dma-lib';
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
      console.log('Persona Store - Fetch Personas');
      const PersonaService = new AesirxPersonaApiService();

      const repondedDataFromLibrary = await PersonaService.getPersonas(
        paginationStep,
        paginationSize
      );
      console.log('fetchPersonas repondedDataFromLibrary', repondedDataFromLibrary);

      if (repondedDataFromLibrary?.list) {
        const personaDataModels = PersonaUtils.transformPersonaResponseIntoModel(
          repondedDataFromLibrary.list
        );

        console.log('fetchPersonas personaDataModels', personaDataModels);

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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async savePersona(personaData) {
    try {
      console.log('Saving Persona via call web service lib function', personaData);

      const convertedPersonaData = PersonaModel.convertSubmittedDataToAPIService(personaData);

      const personaService = new AesirxPersonaApiService();

      let resultOnSave = null;

      console.log('convertedPersonaData convertedPersonaData', convertedPersonaData);

      const personaId = convertedPersonaData.id;

      if (personaId === undefined || personaId === null || personaId === 0) {
        console.log('CREATE PERSONA');
        resultOnSave = await personaService.createPersona(convertedPersonaData);
      } else {
        console.log('UPDATE PERSONA', convertedPersonaData);
        resultOnSave = await personaService.updatePersona(convertedPersonaData);
      }

      console.log('resultOnSave', resultOnSave);

      return resultOnSave;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deletePersonas(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    console.log('DELETE PERSONA IDS');
    console.log(ids);

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
      console.log(error);
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
      console.log(error);
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
        console.log('Persona Store - Get Global Store');
        console.log(this.globalStore);
        await this.globalStore.getMasterData(
          {
            isForPersonaMasterData: true,
          },
          (result) => {
            try {
              console.log('Persona - getMasterData');
              console.log(result);
              const resultPersonaInModel = new PersonaMasterDataModel(
                result && result.personaMasterData ? result.personaMasterData : null
              );
              console.log('resultInModel');
              console.log(resultPersonaInModel);
              console.log('persona - resultPersonaInModel');
              console.log(result);
              console.log('persona - resultToDropdownlistValues');

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
      console.log(error);
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
      console.log('Content Store - getPersonaRecommendations');
      const personaTemplateAPIService = new AesirxPersonaTemplateApiService();

      const repondedDataFromLibrary = await personaTemplateAPIService.getPersonaTemplates(
        paginationStep,
        100
      );
      console.log('repondedDataFromLibrary repondedDataFromLibrary', repondedDataFromLibrary);

      if (repondedDataFromLibrary?.list) {
        const personaTemplateDataModels =
          PersonaTemplateUtils.transformPersonaTemplateResponseIntoModel(
            repondedDataFromLibrary.list
          );
        console.log('personaTemplateDataModels');
        console.log(personaTemplateDataModels);

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
      console.log(error);
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

      console.log('Persona Store - getPersonaRecommendationItem');
      console.log(repondedDataFromLibrary);
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
      console.log(error);
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
      console.log('Persona Store - searchPersonas');
      const personaAPIService = new AesirxPersonaApiService();
      const respondedDataFromLibrary = await personaAPIService.searchPersonas(
        dataFilter,
        paginationStep,
        paginationSize
      );

      console.log('Debugging ---- searchPersonas');
      console.log(respondedDataFromLibrary);
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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
