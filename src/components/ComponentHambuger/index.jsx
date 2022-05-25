import React from "react";
import "./index.scss";

class ComponentHambuger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { handleAction, className } = this.props;
    return (
      <div
        className={`wrapper_hambuger d-none cursor-pointer ps-3 pe-2 ${className}`}
        onClick={handleAction}
      >
        <div className="item_hambuger"></div>
        <div className="item_hambuger"></div>
        <div className="item_hambuger"></div>
      </div>
    );
  }
}

export default ComponentHambuger;
