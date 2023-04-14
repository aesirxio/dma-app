/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { runInAction } from 'mobx';

import ContentThemeUtils from '../ContentUtils/ContentThemeUtils';
import ContentThemeModel from '../ContentModel/ContentThemeModel';

import { AesirxContentThemeApiService } from 'aesirx-lib';

import { ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY } from '../../../constants/ContentThemeModule';

export default class ContentThemeStore {
  async fetchContentThemes(callbackOnSuccess, callbackOnError, paginationStep) {
    try {
      const contentThemeAPIService = new AesirxContentThemeApiService();

      const repondedDataFromLibrary = await contentThemeAPIService.getContentThemes(
        paginationStep,
        25
      );
      const contentThemeDataModels = ContentThemeUtils.transformContentThemeResponseIntoModel(
        repondedDataFromLibrary.list
      );
      if (contentThemeDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: contentThemeDataModels,
            pagination: repondedDataFromLibrary.pagination,
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

  async saveContentTheme(contentThemeData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedContentData =
        ContentThemeModel.convertSubmittedDataToAPIService(contentThemeData);

      // Save Content
      const contentThemeService = new AesirxContentThemeApiService();
      let resultContent = false;

      if (convertedContentData[ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY.ID] === undefined) {
        resultContent = await contentThemeService.createContentTheme(convertedContentData);
      } else {
        resultContent = await contentThemeService.updateContentTheme(convertedContentData);
      }

      if (resultContent) {
        runInAction(() => {
          callbackOnSuccess();
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

  async deleteContentThemes(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    try {
      const contentThemeService = new AesirxContentThemeApiService();
      const deleteIds = ids.join();
      const repondedDataFromLibrary = await contentThemeService.deleteContentTheme(deleteIds);

      if (repondedDataFromLibrary.result === true) {
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

  async getContentTheme(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const contentThemeService = new AesirxContentThemeApiService();
      const repondedDataFromLibrary = await contentThemeService.getContentThemeItem(id);

      if (repondedDataFromLibrary) {
        const contentThemeDataModels = ContentThemeUtils.transformContentThemeResponseIntoModel([
          repondedDataFromLibrary,
        ]);

        if (contentThemeDataModels) {
          runInAction(() => {
            callbackOnSuccess(contentThemeDataModels);
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
