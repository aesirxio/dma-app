import React, { Component } from 'react';
import ComponentImage from '../ComponentImage';

class ComponentViewAnalytics extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount = () => {};

  render() {
    let { titleLg, title, number, name, data, isStatus } = this.props;
    return (
      <div className="bg-white p-3 rounded-2">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <div className="">
            {titleLg && <h4>{titleLg}</h4>}
            {title && <p className="mb-0">{title}</p>}
            {number && <h2 className="mb-0">{number}</h2>}
          </div>
          <p className="mb-0 fs-14">View Report</p>
        </div>
        <div className="py-2 px-3 bg-blue">
          <div className="row">
            <div className={`${isStatus ? 'col-8' : 'col-12'}`}>
              <span>{name}</span>
            </div>
            {isStatus && (
              <div className="col-4">
                <span>Status</span>
              </div>
            )}
          </div>
        </div>
        <div className="px-3">
          {data.map((value, key) => {
            return (
              <div key={key} className="row py-3 border-bottom-1 item_project">
                <div className="col-8">
                  <div className="d-flex align-items-center">
                    {value.icon && (
                      <ComponentImage src={value.icon} alt={value.icon} className="img-avatar" />
                    )}

                    <span className={`${value.icon ? 'ps-3' : ''}`}>{value.text}</span>
                  </div>
                </div>
                {isStatus && (
                  <div className="col-4">
                    <span
                      className={`mw-100 h-35 fs-14 d-table-cell align-middle text-center rounded-2 ${value.statusName}`}
                    >
                      {value.status}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ComponentViewAnalytics;
