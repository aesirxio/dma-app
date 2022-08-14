/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from "react";
import { Form } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
class Label extends React.Component {
  render() {
    let { text, required } = this.props;
    const {t}= this.props;
    return (
      <Form.Label className="mb-3 w-100 text-blue-0">
        {t(text)}
        {required && <span className="text-red-1">*</span>}
      </Form.Label>
    );
  }
}

export default withTranslation('common') (Label);
