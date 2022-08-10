/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const AvatarDAM = ({children}) => {
  return (
    <div className='col-3'>
      <label className='form-label mb-3' htmlFor='name'>
        <span className='text-blue-0'>Profile picture</span>
      </label>
      <div className='border-da-1 mb-3'>
        {children}
      </div>
    </div>
  );
};

export default AvatarDAM;
