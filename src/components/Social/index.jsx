/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import './index.scss';
import ButtonConnectFacebook from '../../components/ButtonConnectFacebook';
import ButtonConnectGoogle from '../../components/ButtonConnectGoogle';
import { AESIRX_CONFIGS } from 'aesirx-dma-lib';

class Social extends React.Component {
  render() {
    return (
      <div className="row justify-content-around mb-3">
        <div className="col">
          <ButtonConnectFacebook appId={AESIRX_CONFIGS.SOCIAL_LOGIN.FACEBOOK_APP_ID} />
        </div>
        <div className="col">
          <ButtonConnectGoogle clientId={AESIRX_CONFIGS.SOCIAL_LOGIN.GOOGLE_CLIENT_ID} />
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(Social);
