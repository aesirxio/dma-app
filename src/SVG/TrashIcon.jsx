import React from 'react';

const Trash = ({ fill = 'none' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.25 5.25L6.1875 20.25C6.23203 21.1167 6.8625 21.75 7.6875 21.75H16.3125C17.1408 21.75 17.7595 21.1167 17.8125 20.25L18.75 5.25"
        stroke="#C8192E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.75 5.25H20.25Z" fill="#C8192E" />
      <path d="M3.75 5.25H20.25" stroke="#C8192E" strokeMiterlimit="10" strokeLinecap="round" />
      <path
        d="M9 5.25V3.375C8.99957 3.22715 9.02837 3.08066 9.08475 2.94397C9.14114 2.80729 9.22399 2.6831 9.32854 2.57854C9.43309 2.47399 9.55728 2.39114 9.69397 2.33476C9.83066 2.27838 9.97714 2.24957 10.125 2.25H13.875C14.0229 2.24957 14.1693 2.27838 14.306 2.33476C14.4427 2.39114 14.5669 2.47399 14.6715 2.57854C14.776 2.6831 14.8589 2.80729 14.9152 2.94397C14.9716 3.08066 15.0004 3.22715 15 3.375V5.25M12 8.25001V18.75M8.625 8.25001L9 18.75M15.375 8.25001L15 18.75"
        stroke="#C8192E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Trash;
