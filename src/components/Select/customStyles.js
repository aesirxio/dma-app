/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const customStyles = (isBorder) => {
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
        backgroundColor: 'var(--dropdown-bg)',
      };
    },
    input: (styles) => ({ ...styles, color: 'var(--dropdown-item-color)' }),
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? 'var(--dropdown-item-hover-color)' : 'var(--dropdown-item-color)',
        backgroundColor: state.isSelected ? 'var(--dropdown-item-hover-bg)' : 'var(--dropdown-bg)',
        '&:hover': {
          color: 'var(--dropdown-item-color)',
          backgroundColor: 'var(--dropdown-item-hover-bg)',
        },
      };
    },
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'var(--dropdown-item-hover-color)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--body-color)',
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: 'var(--text-title-color)',
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--view-active-bg)',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--body-color)',
    }),
  };
};

export default customStyles;
