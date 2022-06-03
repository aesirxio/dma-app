/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import TwitterLogin from 'react-twitter-login';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import Button from '../Button';
import { AESIRX_CONFIGS } from 'aesirx-dma-lib';
import { socialLogin } from '../../auth';

const ButtonConnectTwitter = (props) => {
  const { consumerKey, consumerSecret } = props;
  const authHandler = (err, data) => {
    if (err !== undefined) {
      return false;
    }

    const tokenData = {
      ...data,
      consumerKey: consumerKey,
      consunmerSecret: consumerSecret,
    };

    socialLogin('twitter', JSON.stringify(tokenData));
  };
  return (
    <TwitterLogin
      authCallback={authHandler}
      consumerKey={consumerKey}
      consumerSecret={consumerSecret}
      children={
        <Button link="#" icon={faTwitterSquare} text="Twitter" className="w-100 btn-twitter mb-2" />
      }
    />
  );
};

export default ButtonConnectTwitter;
