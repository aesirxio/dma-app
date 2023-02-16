/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import './index.scss';
import { Accordion, Button, Image } from 'react-bootstrap';
import ButtonNormal from '../ButtonNormal';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pernona: true, social: true };
  }

  render() {
    return (
      <div className="col-6 bg-white p-4">
        <Accordion defaultActiveKey="0">
          <div className="mb-2">
            <Accordion.Toggle
              as={Button}
              className="w-100 text-start d-flex justify-content-between align-items-center"
              eventKey="0"
              onClick={() => this.setState({ pernona: !this.state.pernona })}
            >
              Pernona 1
              <FontAwesomeIcon icon={this.state.pernona ? faMinus : faPlus} color="#16b979" />
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div className="py-4 d-flex">
              <div className="position-relative me-2">
                <Image
                  src="/assets/images/facebook.png"
                  width="30"
                  className="position-absolute bottom-0 end-0"
                />
                <Image src="/assets/images/avatar-1.png" rounded />
              </div>

              <div className="position-relative me-2">
                <Image
                  src="/assets/images/facebook.png"
                  width="30"
                  className="position-absolute bottom-0 end-0"
                />
                <Image src="/assets/images/avatar-1.png" rounded />
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <h3>When to publish this?</h3>

        <Accordion defaultActiveKey="0">
          <div className="mb-2">
            <Accordion.Toggle
              as={Button}
              className="w-100 bg-light text-body text-start d-flex justify-content-between align-items-center"
              eventKey="0"
              onClick={() => this.setState({ social: !this.state.social })}
            >
              Social Media
              <FontAwesomeIcon icon={this.state.social ? faMinus : faPlus} color="#16b979" />
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div className="py-4 d-flex">
              <div className="form-check">
                <input className="form-check-input" type="radio" id="flexRadioDefault1" checked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Post now
                </label>
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion>

        <div className="d-flex justify-content-between">
          <ButtonNormal className="btn btn-light border-success" text="Back"></ButtonNormal>
          <ButtonNormal className="btn btn-success" text="Post now"></ButtonNormal>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(CreateProject);
