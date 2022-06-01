/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

export default function initFacebookSdk(appId) {
  return new Promise((resolve) => {
    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v10.0',
      });

      // auto authenticate with the api if already logged in with facebook
      window.FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
        } else {
          resolve();
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
}
