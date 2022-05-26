/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';

import ProjectUtils from '../ProjectUtils/ProjectUtils';
import ProjectModel from '../ProjectModel/ProjectModel';
import { AesirxProjectApiService } from 'aesirx-dma-lib';

export default class ProjectStore {
  async fetchProjects(callbackOnSuccess, callbackOnError, paginationStep = 0, paginationSize = 25) {
    try {
      console.log('Project Store - Fetch Projects');
      const projectAPIService = new AesirxProjectApiService();
      const respondedDataFromLibrary = await projectAPIService.getProjects(
        paginationStep,
        paginationSize
      );

      const projectDataModels = ProjectUtils.transformProjectResponseIntoModel(
        respondedDataFromLibrary.list
      );

      if (projectDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: projectDataModels,
            pagination: respondedDataFromLibrary.pagination,
          });
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async searchProjects(
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1,
    paginationSize = 25
  ) {
    try {
      console.log('Project Store - filter Projects');
      const projectAPIService = new AesirxProjectApiService();
      const respondedDataFromLibrary = await projectAPIService.searchProjects(
        dataFilter,
        paginationStep,
        paginationSize
      );

      console.log('Debugging ---- filterProjects');
      console.log(respondedDataFromLibrary);
      let projectDataModels = null;

      if (respondedDataFromLibrary !== null) {
        projectDataModels = ProjectUtils.transformProjectResponseIntoModel(
          respondedDataFromLibrary.list
        );
      }

      if (projectDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: projectDataModels,
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

  async saveProject(projectData, callbackOnSuccess, callbackOnError) {
    try {
      console.log('Saving Project via call web service lib function');
      console.log(projectData);

      const convertedProjectData = ProjectModel.convertSubmittedDataToAPIService(projectData);

      console.log('Project Converted Data');
      console.log(convertedProjectData);

      const projectAPIService = new AesirxProjectApiService();

      var resultOnSave;
      let projectId = null;

      if (projectData.id === undefined) {
        console.log('CREATE PROJECT');
        resultOnSave = await projectAPIService.createProject(convertedProjectData);

        projectId = resultOnSave;
        console.log('CREATE PROJECT projectId');
        console.log(projectId);
      } else {
        console.log('UPDATE PROJECT', convertedProjectData);
        resultOnSave = await projectAPIService.updateProject(convertedProjectData);
        projectId = projectData.id;
      }

      console.log('resultOnSave projectId resultOnSave', resultOnSave);

      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess(projectId);
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async deleteProjects(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    console.log('DELETE PROJECT IDS');
    console.log(ids);

    try {
      const projectAPIService = new AesirxProjectApiService();
      const deleteIds = ids.join();
      console.log('Prepare ids for delete: ', deleteIds);
      const respondedFromApi = await projectAPIService.deleteProject(deleteIds);

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

  async getProject(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      // const editProject = projects.filter(function (e) {
      //   return id === e.id;
      // });

      if (results) {
        const projectAPIService = new AesirxProjectApiService();
        const respondedDataFromLibrary = await projectAPIService.getProjectItem(id);
        console.log('PROJECT RESPONDED ITEM');
        console.log(id);
        console.log(respondedDataFromLibrary);
        const projectDataModels = ProjectUtils.transformProjectResponseIntoModel([
          respondedDataFromLibrary,
        ]);

        console.log(projectDataModels);

        if (projectDataModels) {
          runInAction(() => {
            callbackOnSuccess(projectDataModels);
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
}
