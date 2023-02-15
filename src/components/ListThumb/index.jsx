/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh';
import { faColumns } from '@fortawesome/free-solid-svg-icons/faColumns';

import SelectComponent from '../Select';

const optionAction = [
  { value: 'action-1', label: 'Action 1' },
  { value: 'action-2', label: 'Action 2' },
  { value: 'action-3', label: 'Action 3' },
];

const optionColumns = [
  { value: 'columns-1', label: 'Columns 1' },
  { value: 'columns-2', label: 'Columns 2' },
  { value: 'columns-3', label: 'Columns 3' },
];

class ListThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anAction: null,
      columns: null,
    };
  }

  handleAnAction = (selectedOption) => {
    this.setState({
      anAction: selectedOption,
    });
  };

  handleColumns = (selectedOption) => {
    this.setState({
      columns: selectedOption,
    });
  };

  render() {
    let { anAction, columns } = this.state;
    let { _handleList, isList } = this.props;

    return (
      <div className="bg-white rounded-3">
        <div className="row">
          <div className="col-7">
            <div className="row">
              <div className="col-6 border-end-1">
                <div className="input-group mb-0">
                  <input
                    type="text"
                    placeholder="Search your projects"
                    aria-describedby="button-search"
                    className="form-control border-end-0 pe-2 border-0"
                  />
                  <button
                    type="button"
                    id="button-search"
                    className="btn btn_search border-0 border-start-0 border-gray text-green"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
              <div className="col-3 border-end-1">
                <SelectComponent
                  value={anAction}
                  onChange={this.handleAnAction}
                  options={optionAction}
                  isBorder={false}
                  placeholder="Choose an action"
                  className="text-green"
                  plColor="rgba(8, 18, 64, 0.8)"
                />
              </div>
              <div className="col-3 border-end-1">
                <div className="d-flex align-items-center">
                  <i className="text-blue-0">
                    <FontAwesomeIcon icon={faColumns} />
                  </i>
                  <div className="w-260">
                    <SelectComponent
                      value={columns}
                      onChange={this.handleColumns}
                      options={optionColumns}
                      isBorder={false}
                      placeholder="Columns"
                      className="text-green"
                      plColor="rgba(8, 18, 64, 0.8)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5 justify-content-end d-flex">
            <button
              type="button"
              className={`btn text-blue-0 rounded-0 px-4 ${isList ? 'bg-blue-3' : ''}`}
              onClick={_handleList}
            >
              <i>
                <FontAwesomeIcon icon={faList} />
              </i>
              <span className="ms-2 opacity-75">List</span>
            </button>
            <button
              type="button"
              className={`btn text-blue-0 rounded-0 px-4 ${!isList ? 'bg-blue-3' : ''}`}
              onClick={_handleList}
            >
              <i>
                <FontAwesomeIcon icon={faTh} />
              </i>
              <span className="ms-2 opacity-75">Thumb</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(ListThumb);
