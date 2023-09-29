/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { runInAction } from 'mobx';

import ProjectUtils from '../ProjectUtils/ProjectUtils';
import ProjectModel from '../ProjectModel/ProjectModel';
import { AesirxProjectApiService } from 'aesirx-lib';

export default class ProjectStore {
  async fetchProjects(callbackOnSuccess, callbackOnError, paginationStep = 0, paginationSize = 25) {
    try {
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
    paginationSize = 25,
    sort = {}
  ) {
    try {
      const projectAPIService = new AesirxProjectApiService();
      const respondedDataFromLibrary = await projectAPIService.searchProjects(
        dataFilter,
        paginationStep,
        paginationSize,
        true,
        sort
      );

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
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async saveProject(projectData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedProjectData = ProjectModel.convertSubmittedDataToAPIService(projectData);

      const projectAPIService = new AesirxProjectApiService();

      var resultOnSave;
      let projectId = null;

      if (projectData.id === undefined) {
        resultOnSave = await projectAPIService.createProject(convertedProjectData);

        projectId = resultOnSave;
      } else {
        resultOnSave = await projectAPIService.updateProject(convertedProjectData);
        projectId = projectData.id;
      }

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
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async deleteProjects(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    try {
      const projectAPIService = new AesirxProjectApiService();
      const deleteIds = ids.join();
      const respondedFromApi = await projectAPIService.deleteProject(deleteIds);

      if (respondedFromApi.result === true) {
        runInAction(() => {
          callbackOnSuccess();
        });
      }
      return respondedFromApi;
    } catch (error) {
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
        const projectDataModels = ProjectUtils.transformProjectResponseIntoModel([
          respondedDataFromLibrary,
        ]);

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
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
