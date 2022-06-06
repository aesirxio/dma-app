/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import SelectComponent from '../../../components/Select';

class FormSelectionPersona extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;

    this.viewModel = this.field ? this.field.viewModel : null;

    this.viewModel.setMulti(this.field.multi);
  }

  render() {
    const { multi } = this.viewModel;

    return (
      <SelectComponent
        value={this.field.getValueSelected}
        options={this.field.getDataSelectOptions}
        className="mb-3 text-danger"
        isBorder={true}
        plColor="rgba(8, 18, 64, 0.8)"
        //onFocus={this.field.changed}
        onBlur={this.field.blurred}
        isMulti={multi}
        onChange={this.field.handleOnChange}
        // getOptionLabel={(option) => option.label}
        // getOptionValue={(option) => option.val}
      />
    );
  }
}

export default FormSelectionPersona;
