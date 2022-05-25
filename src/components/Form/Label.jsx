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
