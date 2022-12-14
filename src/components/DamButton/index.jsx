/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';

import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import ComponentImage from '../ComponentImage';
import { AesirXDam } from 'aesirx-dam-app';

const ModalComponent = lazy(() => import('../../components/Modal'));

class DamButton extends React.Component {
  modalSelectionDAMSession = null;
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  handleClick = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    let { data, checkTypeImage } = this.props;

    return (
      <>
        <div className={`lg_btn_dam_assets ${data ? 'w-50' : ''}`}>
          <button
            className="wr_btn_dam border-0 ms-2 bg-blue-2 rounded-2 px-3"
            onClick={this.handleClick}
            type="button"
          >
            <i className="text-white">
              <FontAwesomeIcon icon={faImage} />
            </i>
            <span className="text-white ms-2">Digital Asset Management</span>
          </button>
          {data && (
            <>
              {data.map((value, key) => {
                return (
                  <div
                    key={key}
                    className={`item_dam_assets d-flex justify-content-start border-top mt-4`}
                  >
                    <div className="wr_img_thumbnail_dam position-relative m-2">
                      <ComponentImage
                        className={`img-thumbnail rounded imgTab`}
                        alt={value.download_url}
                        src={value.download_url}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {checkTypeImage && (
            <>
              <p className="mt-2 mb-1 text-danger">Supported .jpg/png/jpeg only</p>
              <p className="text-danger">And please choose file without space in name</p>
            </>
          )}
        </div>
        <ModalComponent
          body={
            <AesirXDam
              onSelect={(data) => {
                this.props.changed(data);
                this.closeModal();
              }}
            />
          }
          show={this.state.showModal}
          onHide={this.closeModal}
          dialogClassName="modal-fullscreen modal_digital_assets position-fixed start-0"
        />
      </>
    );
  }
}

export default DamButton;
