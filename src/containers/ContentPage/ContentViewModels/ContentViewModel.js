/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ContentFormViewModel from './ContentFormViewModel';
import ContentListViewModel from './ContentsListViewModel';
import ContentsFilterFormViewModel from './ContentsFilterFormViewModel';
import ContentFormAdsViewModel from './ContentFormAdsViewModel';

class ContentViewModel {
  contentListViewModel = null;
  contentFormViewModel = null;
  contentsFilterFormViewModel = null;
  contentFormAdsViewModel = null;

  constructor(contentStore) {
    if (contentStore) {
      this.contentFormViewModel = new ContentFormViewModel(contentStore);
      this.contentListViewModel = new ContentListViewModel(contentStore);
      this.contentsFilterFormViewModel = new ContentsFilterFormViewModel(contentStore);
      this.contentFormAdsViewModel = new ContentFormAdsViewModel();
    }
  }

  getListViewModel = () => this.contentListViewModel;

  getFormViewModel = () => this.contentFormViewModel;

  getFilterFormViewModel = () => this.contentsFilterFormViewModel;

  getFormAdsViewModel = () => this.contentFormAdsViewModel;
}

export default ContentViewModel;
