/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { useState, useEffect, useCallback } from 'react';
import loadScript from '../../utils/loadScript';
import removeScript from '../../utils/removeScript';

const useGoogleLogin = ({
  onSuccess = () => {},
  onAutoLoadFinished = () => {},
  onFailure = () => {},
  onRequest = () => {},
  onScriptLoadFailure,
  clientId,
  cookiePolicy,
  loginHint,
  hostedDomain,
  autoLoad,
  isSignedIn,
  fetchBasicProfile,
  redirectUri,
  discoveryDocs,
  uxMode,
  scope = 'https://www.googleapis.com/auth/userinfo.profile',
  accessType,
  responseType,
  jsSrc = 'https://apis.google.com/js/api.js',
  prompt,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleSigninSuccess = useCallback(
    (res) => {
      /*
      offer renamed response keys to names that match use
    */
      const basicProfile = res.getBasicProfile();
      const authResponse = res.getAuthResponse(true);
      res.googleId = basicProfile.getId();
      res.tokenObj = authResponse;
      res.tokenId = authResponse.id_token;
      res.accessToken = authResponse.access_token;
      res.profileObj = {
        googleId: basicProfile.getId(),
        imageUrl: basicProfile.getImageUrl(),
        email: basicProfile.getEmail(),
        name: basicProfile.getName(),
        givenName: basicProfile.getGivenName(),
        familyName: basicProfile.getFamilyName(),
      };
      onSuccess(res);
    },
    [onSuccess]
  );

  const signIn = useCallback(
    (e) => {
      if (e) {
        e.preventDefault(); // to prevent submit if used within form
      }
      if (loaded) {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();
        const options = {
          prompt,
        };
        onRequest();
        if (responseType === 'code') {
          GoogleAuth.grantOfflineAccess(options).then(
            (res) => onSuccess(res),
            (err) => onFailure(err)
          );
        } else {
          GoogleAuth.signIn(options).then(
            (res) => handleSigninSuccess(res),
            (err) => onFailure(err)
          );
        }
      }
    },
    [handleSigninSuccess, loaded, onFailure, onRequest, onSuccess, prompt, responseType]
  );

  useEffect(() => {
    let unmounted = false;
    const onLoadFailure = onScriptLoadFailure || onFailure;
    loadScript(
      document,
      'script',
      'google-login',
      jsSrc,
      () => {
        const params = {
          client_id: clientId,
          cookie_policy: cookiePolicy,
          login_hint: loginHint,
          hosted_domain: hostedDomain,
          fetch_basic_profile: fetchBasicProfile,
          discoveryDocs,
          ux_mode: uxMode,
          redirect_uri: redirectUri,
          scope,
          access_type: accessType,
        };

        if (responseType === 'code') {
          params.access_type = 'offline';
        }

        window.gapi.load('auth2', () => {
          const GoogleAuth = window.gapi.auth2.getAuthInstance();
          if (!GoogleAuth) {
            window.gapi.auth2.init(params).then(
              (res) => {
                if (!unmounted) {
                  setLoaded(true);
                  const signedIn = isSignedIn && res.isSignedIn.get();
                  onAutoLoadFinished(signedIn);
                  if (signedIn) {
                    handleSigninSuccess(res.currentUser.get());
                  }
                }
              },
              (err) => {
                setLoaded(true);
                onAutoLoadFinished(false);
                onLoadFailure(err);
              }
            );
          } else {
            GoogleAuth.then(
              () => {
                if (unmounted) {
                  return;
                }
                if (isSignedIn && GoogleAuth.isSignedIn.get()) {
                  setLoaded(true);
                  onAutoLoadFinished(true);
                  handleSigninSuccess(GoogleAuth.currentUser.get());
                } else {
                  setLoaded(true);
                  onAutoLoadFinished(false);
                }
              },
              (err) => {
                onFailure(err);
              }
            );
          }
        });
      },
      (err) => {
        onLoadFailure(err);
      }
    );

    return () => {
      unmounted = true;
      removeScript(document, 'google-login');
    };
  });

  useEffect(() => {
    if (autoLoad) {
      signIn();
    }
  }, [signIn, loaded, autoLoad]);

  return { signIn, loaded };
};

export default useGoogleLogin;
