import React from "react";
import { ProgressBar } from "react-bootstrap";

import "../index.scss";

class ItemComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { value } = this.props;

    return (
      <div className="main_line_complete shadow rounded-2 overflow-hidden border-1 h-100 d-flex flex-column justify-content-between">
        <div className="p-3">
          <p className="fw-bold text-blue-3">{value.title}</p>
          <div>
            <ul className="list-unstyled d-flex align-items-center mb-0 flex-wrap">
              {value.complete.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="col-4 fs-12 d-flex align-items-center"
                  >
                    <span
                      className={`
                          number_progre 
                          d-flex 
                          align-items-center 
                          justify-content-center 
                          rounded-circle 
                          text-white
                          bg-${item.name}
                        `}
                    >
                      {item.number}
                    </span>
                    <span className="ps-2">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <ProgressBar className={`progress`}>
          {value.complete.map((item, index) => {
            return (
              <ProgressBar
                key={index}
                variant={`${item.name}`}
                now={item.number}
                // key={item.key}
              />
            );
          })}
        </ProgressBar>
      </div>
    );
  }
}

export default ItemComplete;
