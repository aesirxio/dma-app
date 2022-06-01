/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useState } from 'react';
import './index.scss';
import useGoogleLogin from './useGoogleLogin';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import Button from '../Button';
import { notify } from '../../components/Toast';
import { socialLogin } from '../../auth';
import GoogleIcon from './512px-Google__G__Logo.png';
import { GoogleLogin } from 'react-google-login';

const ButtonConnectGoogle = (props) => {
  const { clientId } = props;

  const [error, setError] = useState(false);

  const onSuccess = (res) => {
    socialLogin('google', res.accessToken);
  };

  const onFailure = (res) => {
    setError(true);
    notify('Login Google Failed: ' + res.details, 'error');
  };

  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <Button
            link="#"
            image={GoogleIcon}
            text="Google"
            className="w-100 btn-google mb-2 align-items-center"
            onClick={renderProps.onClick}
            disabled={error}
          />
        )}
      />
    </>
  );
};

export default ButtonConnectGoogle;
