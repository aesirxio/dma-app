/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import {
  ESI_CONTENT_THEME_FIELD_KEY,
  ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY,
} from "../../../constants/ContentThemeModule";

class ContentThemeModel {
  constructor(data) {
    this[ESI_CONTENT_THEME_FIELD_KEY.ID] =
      data[ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY.ID] ?? 0;
    this[ESI_CONTENT_THEME_FIELD_KEY.DESIGN_ID] =
      data[ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY.DESIGN_ID] ?? 0;
    this[ESI_CONTENT_THEME_FIELD_KEY.IMAGE] =
      data[ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY.IMAGE] ?? 0;
  }

  static convertSubmittedDataToAPIService(data) {
    const result = data
      ? {
          [ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY.ID]:
            data[ESI_CONTENT_THEME_FIELD_KEY.ID],

          [ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY.DESIGN_ID]:
            data[ESI_CONTENT_THEME_FIELD_KEY.DESIGN_ID],

          [ESI_CONTENT_THEME_API_RESPONSE_FIELD_KEY.IMAGE]:
            data[ESI_CONTENT_THEME_FIELD_KEY.IMAGE],
        }
      : null;
    return result;
  }
}

export default ContentThemeModel;
