/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { withTranslation } from 'react-i18next';

import './index.scss';
import { Modal } from 'react-bootstrap';

class ModalComponent extends React.Component {
  render() {
    let { header, footer, body, show, onHide, dialogClassName } = this.props;

    return (
      <Modal show={show} onHide={onHide} centered dialogClassName={dialogClassName}>
        <Modal.Header closeButton className="px-4 border-bottom-0 text-blue-0">
          {header && <Modal.Title>{header}</Modal.Title>}
        </Modal.Header>
        <Modal.Body className="px-4 pt-2 pb-0">{body}</Modal.Body>
        {footer && <Modal.Footer className="px-4">{footer}</Modal.Footer>}
      </Modal>
    );
  }
}

export default withTranslation('common')(ModalComponent);
