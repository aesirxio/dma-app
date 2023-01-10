import React from 'react';

const ArrowBack = ({ fill = 'none' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 11.0003H7.14L10.77 6.64028C10.9397 6.43606 11.0214 6.17278 10.997 5.90835C10.9726 5.64393 10.8442 5.40001 10.64 5.23028C10.4358 5.06054 10.1725 4.97888 9.90808 5.00325C9.64365 5.02763 9.39974 5.15606 9.23 5.36028L4.23 11.3603C4.19636 11.408 4.16628 11.4581 4.14 11.5103C4.14 11.5603 4.14 11.5903 4.07 11.6403C4.02467 11.7549 4.00094 11.877 4 12.0003C4.00094 12.1236 4.02467 12.2456 4.07 12.3603C4.07 12.4103 4.07 12.4403 4.14 12.4903C4.16628 12.5424 4.19636 12.5926 4.23 12.6403L9.23 18.6403C9.32402 18.7532 9.44176 18.8439 9.57485 18.9062C9.70793 18.9684 9.85309 19.0005 10 19.0003C10.2337 19.0007 10.4601 18.9194 10.64 18.7703C10.7413 18.6863 10.825 18.5832 10.8863 18.4669C10.9477 18.3505 10.9855 18.2232 10.9975 18.0922C11.0096 17.9613 10.9957 17.8292 10.9567 17.7036C10.9176 17.578 10.8542 17.4613 10.77 17.3603L7.14 13.0003H19C19.2652 13.0003 19.5196 12.8949 19.7071 12.7074C19.8946 12.5198 20 12.2655 20 12.0003C20 11.7351 19.8946 11.4807 19.7071 11.2932C19.5196 11.1056 19.2652 11.0003 19 11.0003Z"
        fill="#1A2226"
      />
    </svg>
  );
};

export default ArrowBack;
