/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

class Helper {
  static isValidUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  };

  static isNull = (value) => {
    if (!value || value === 'null' || !JSON.parse(value)) {
      return true;
    }

    return false;
  };

  static confirmDeleteItem() {
    return window.confirm('Are you sure you wish to delete this item?');
  }

  static isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  static getTimezoneDefault = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export default Helper;
