/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

export let canvaApi = null;

(function (document, url) {
  var script = document.createElement('script');
  script.src = url;
  script.onload = function () {
    (async function () {
      if (window.Canva && window.Canva.DesignButton) {
        canvaApi = await window.Canva.DesignButton.initialize({
          apiKey: '1cXlRfKSEDQWMd7w_2LOVrBb',
        });
      }
    })();
  };
  document.body.appendChild(script);
})(document, 'https://sdk.canva.com/designbutton/v2/api.js');
