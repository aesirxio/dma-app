import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash';
import './index.scss';
class InputPassword extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      showPassword: true,
    };
  }

  handleShowPassword = () => {
    if (this.state.showPassword) {
      this.input.current.setAttribute('type', 'text');
    } else {
      this.input.current.setAttribute('type', 'password');
    }
    this.setState((prevstate) => ({
      showPassword: !prevstate.showPassword,
    }));
  };
  render() {
    const { name, id, disabled, className, value, onChange, onKeyPress, onBlur } = this.props;
    return (
      <div className="position-relative input-password">
        <input
          id={id}
          disabled={disabled}
          type="password"
          className={className}
          value={value}
          name={name}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          ref={this.input}
        />
        <span onClick={this.handleShowPassword} className="cursor-pointer">
          <FontAwesomeIcon icon={this.state.showPassword ? faEye : faEyeSlash} />
        </span>
      </div>
    );
  }
}

export default InputPassword;
