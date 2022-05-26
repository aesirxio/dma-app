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
      {/* <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="text-blue-0">Your Digital Assets</h2>
        <div className="d-flex align-items-center">
          <button className="btn d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 pe-2 ms-2">
            <i className="text-white">
              <FontAwesomeIcon icon={faPlus} />
            </i>
            <span className="flex-1 ps-2 text-white">New</span>
          </button>
        </div>
      </div> */}
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
