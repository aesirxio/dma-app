import React from 'react';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import customStyles from './customStyles';

class SelectComponent extends React.Component {
  render() {
    let { isBorder, plColor, async } = this.props;

    let styles = customStyles(isBorder, plColor);

    if (async) {
      return <AsyncSelect {...this.props} styles={styles} />;
    }

    return <Select {...this.props} styles={styles} />;
  }
}

SelectComponent.defaultProps = {
  async: false,
  isMulti: false,
};

export default SelectComponent;
