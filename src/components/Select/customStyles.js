const customStyles = (isBorder, plColor) => {
  return {
    control: (provided, state) => ({
      ...provided,
      minHeight: 50,
      boxShadow: 'none',
      borderColor: isBorder ? '#ced4da' : 'transparent',
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
    indicatorSeparator: (styles) => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'text-green',
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
