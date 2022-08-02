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
    menu: (styles) => {
      return {
        ...styles,
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--input-bg)',
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? 'var(--dropdown-item-color)' : 'var(--input-color)',
        backgroundColor: state.isSelected ? 'var(--dropdown-item-hover-bg)' : 'var(--input-bg)',
        '&:hover': {
          color: 'var(--dropdown-item-color)',
          backgroundColor: 'var(--dropdown-item-hover-bg)',
        },
      };
    },
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'var(--input-color)',
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
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--bg-blue-3-class)',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--body-color)',
    }),
  };
};

export default customStyles;
