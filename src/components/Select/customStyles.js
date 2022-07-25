/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const customStyles = (isBorder, plColor) => {
  return {
    control: (provided) => ({
      ...provided,
      minHeight: 50,
      boxShadow: 'none',
      borderColor: isBorder ? 'var(--border-color)' : 'transparent',
      '&:hover': {
        borderColor: isBorder ? '#8bdcbc' : 'transparent',
      },
      backgroundColor: 'transparent',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#FFFFFF' : '#212529',
      '&:hover': {
        backgroundColor: state.isSelected ? '#005f89' : '#8bdcbc',
      },
      backgroundColor: state.isSelected ? '#005f89' : '#FFF',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'var(--body-color)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--body-color)',
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: plColor,
      };
    },
  };
};

export default customStyles;
