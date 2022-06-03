/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from "react";
import { Form } from "react-bootstrap";

class Label extends React.Component {
  render() {
    let { text, required } = this.props;
    return (
      <Form.Label className="mb-3 w-100">
        <span className="text-black">{text}</span>
        {required && <span className="text-red-1">*</span>}
      </Form.Label>
    );
  }
}

export default Label;
