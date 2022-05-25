import { runInAction } from 'mobx';

import ContentThemeUtils from '../ContentUtils/ContentThemeUtils';
import ContentThemeModel from '../ContentModel/ContentThemeModel';

import { AesirxContentThemeApiService } from 'aesirx-dma-lib';

import { ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY } from '../../../constants/ContentThemeModule';

export default class ContentThemeStore {
  async fetchContentThemes(callbackOnSuccess, callbackOnError, paginationStep) {
    try {
      console.log('Content Theme Store - Fetch Content');
      const contentThemeAPIService = new AesirxContentThemeApiService();

      const repondedDataFromLibrary = await contentThemeAPIService.getContentThemes(
        paginationStep,
        25
      );
      console.log('repondedDataFromLibrary repondedDataFromLibrary', repondedDataFromLibrary);

      const contentThemeDataModels = ContentThemeUtils.transformContentThemeResponseIntoModel(
        repondedDataFromLibrary.list
      );
      console.log('contentThemeDataModels');
      console.log(contentThemeDataModels);

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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async saveContentTheme(contentThemeData, callbackOnSuccess, callbackOnError) {
    try {
      console.log('Saving Content Theme via call web service lib function');
      console.log(contentThemeData);

      const convertedContentData =
        ContentThemeModel.convertSubmittedDataToAPIService(contentThemeData);

      console.log('convertedContentData');
      console.log(convertedContentData);

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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async deleteContentThemes(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    console.log('DELETE CONTENT THEME IDS');
    console.log(ids);

    try {
      const contentThemeService = new AesirxContentThemeApiService();
      const deleteIds = ids.join();
      console.log('Prepare ids for delete: ', deleteIds);

      const repondedDataFromLibrary = await contentThemeService.deleteContentTheme(deleteIds);

      if (repondedDataFromLibrary.result === true) {
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

  async getContentTheme(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const contentThemeService = new AesirxContentThemeApiService();
      const repondedDataFromLibrary = await contentThemeService.getContentThemeItem(id);

      console.log('Content Theme Store - getContent');
      console.log(repondedDataFromLibrary);

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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
