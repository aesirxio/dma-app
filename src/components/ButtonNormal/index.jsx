import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

import "./index.scss";

class ButtonNormal extends React.Component {
  render() {
    let { iconStart, iconEnd, text, onClick, className, disabled } = this.props;

    if (className === undefined) {
      className = "btn-success";
    }

    return (
      <>
        <button type="button" className={`btn ${className}`} onClick={onClick} disabled={disabled}>
          {iconStart && (
            <i className="me-1">
              <FontAwesomeIcon icon={faPlus} />
            </i>
          )}
          {text}

          {iconEnd && (
            <i className="ms-1">
              <FontAwesomeIcon icon={iconEnd} />
            </i>
          )}
        </button>
      </>
    );
  }
}

export default ButtonNormal;
