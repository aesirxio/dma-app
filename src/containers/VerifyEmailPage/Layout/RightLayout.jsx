import React from 'react';

const RightLayout = ({children}) => {
  return (
    <div
      className='col-8 d-flex flex-column justify-content-center align-items-center'>
      <div className='d-block'>
        {children}
      </div>
    </div>
  );
};

export default RightLayout;
