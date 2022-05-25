import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ModalComponent from '../Modal';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import './index.scss';
import ComponentImage from '../ComponentImage';

import { Storage } from 'aesirx-dma-lib';
class Welcome extends Component {
  name = '';
  constructor(props) {
    super(props);
    this.state = {
      showModal: Storage.getItem('first_login') ?? false,
    };

    if (Storage.getItem('first_login')) {
      Storage.removeItem('first_login');
    }
    this.name = Storage.getItem('member_full_name') ?? '';
  }
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };
  render() {
    return (
      <ModalComponent
        show={this.state.showModal}
        centered
        onHide={this.handleClose}
        dialogClassName={'Welcome_Popup'}
        body={
          <>
            <div className="row align-items-center h-100 px-sm-4 pt-sm-3 pb-sm-5 p-0 py-2">
              <div className="col-5 d-lg-block d-none">
                <ComponentImage src={'/assets/images/welcome-pic.png'} alt="welcome" />
              </div>
              <div className="welcome-right col-lg-7 col-12">
                <h4>Welcome {this.name} to AesirX DMA</h4>
                <p className="mb-4">Let the world hear your voice in 3 simple steps</p>
                <div className="d-flex welcome_step justify-content-center gx-4 mb-4 gap-lg-6 gap-md-5 gap-sm-5 gap-3">
                  <div className="d-flex flex-column align-items-center justify-content-center text-center">
                    <ComponentImage src={'/assets/images/networking.svg'} alt="create" />
                    <p>
                      1 <br />
                      Connect
                    </p>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center text-center">
                    <ComponentImage src={'/assets/images/document-text-outline.svg'} alt="create" />
                    <p>
                      2 <br />
                      Create
                    </p>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center text-center">
                    <ComponentImage src={'/assets/images/brochure.svg'} alt="brochure" />
                    <p>
                      3 <br />
                      Publish
                    </p>
                  </div>
                </div>
                <Button onClick={this.handleClose} className="btn btn-success w-40">
                  <span>Start</span>
                  <i className="ms-1">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </i>
                </Button>
              </div>
            </div>
          </>
        }
      />
    );
  }
}

export default withTranslation('common')(Welcome);
