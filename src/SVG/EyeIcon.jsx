import React from 'react';

const Eye = ({ fill = 'none' }) => {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
        stroke="#1A2226"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
        stroke="#1A2226"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Eye;
