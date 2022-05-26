/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useState, useEffect } from 'react';
import initFacebookSdk from './initFacebookSdk';
import Button from '../Button';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { notify } from '../../components/Toast';
import { socialLogin } from '../../auth';

const ButtonConnectFacebook = (props) => {
  useEffect(() => {
    initFacebookSdk(props.appId).then();
  }, [props.appId]);

  const handleClick = () => {
    window.FB.login(
      function (response) {
        console.log(response);
        if (response.status === 'connected') {
          console.log(response.authResponse.accessToken);
          const accessToken = response.authResponse.accessToken;
          socialLogin('facebook', accessToken);
        } else {
          notify('Login Facebook Failed', 'error');
        }
      },
      {
        scope: 'public_profile, email',
      }
    );
  };

  return (
    <>
      <Button
        link="#"
        icon={faFacebookSquare}
        text="Facebook"
        className="w-100 btn-facebook mb-2"
        onClick={handleClick}
      />
    </>
  );
};

export default ButtonConnectFacebook;
