import React from 'react';

import './index.scss';

class Checkbox extends React.Component {
  render() {
    let { name, text, checked, onCheckBoxChange, disabled } = this.props;
    return (
      <div className="form-check">
        <input
          name={name}
          id={`id_${name}`}
          className="form-check-input cursor-pointer"
          type="checkbox"
          checked={checked}
          onChange={onCheckBoxChange}
          disabled={disabled}
        />
        <label className="form-check-label cursor-pointer" htmlFor={`id_${name}`}>
          {text}
        </label>
      </div>
    );
  }
}

export default Checkbox;
