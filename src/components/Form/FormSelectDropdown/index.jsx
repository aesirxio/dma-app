import React, { Component } from 'react';

import SelectComponent from '../../../components/Select';

import { components } from 'react-select';

// import "./index.module.scss";

class FormSelectDropdown extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;
  }

  render() {
    console.log('[FormSelectDropdown] render', this.field);
    console.log('[FormSelectDropdown] Options ', this.field.option);

    return (
      <SelectComponent
        defaultValue={this.field.value}
        onChange={this.field.changed}
        options={this.field.option}
        className="mb-3 text-danger"
        isBorder={true}
        plColor="rgba(8, 18, 64, 0.8)"
        isMulti={this.field.isMulti ?? false}
        components={{
          Option: this.field.optionComponent ? this.field.optionComponent : components.Option,
          Placeholder: this.field.placeholderComponent
            ? this.field.placeholderComponent
            : components.Placeholder,
        }}
        async={this.field.async ?? false}
        loadOptions={this.field.loadOptions ?? null}
        cacheOptions
      />
    );
  }
}

export default FormSelectDropdown;
