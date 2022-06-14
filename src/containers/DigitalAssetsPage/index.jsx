/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import Iframe from 'react-iframe';
import { AUTHORIZATION_KEY, AXIOS_CONFIGS, Storage } from 'aesirx-dma-lib';

function DigitalAssetsPage() {
  const urlDam =
    AXIOS_CONFIGS.BASE_ENDPOINT_URL +
    '/administrator/index.php?option=com_aesir_dam&view=collection_assets&token=' +
    Storage.getItem(AUTHORIZATION_KEY.TOKEN_USER);
  return (
    <div className="py-4 px-3 h-100 flex-direction-column">
      <div className="h-100 flex-1">
        <Iframe
          url={urlDam}
          width="100%"
          height="100%"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </div>
    </div>
  );
}

export default DigitalAssetsPage;
