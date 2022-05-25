import React from "react";
import { observer } from "mobx-react";
import { Form } from "react-bootstrap";

const FormInformation = observer(
  class FormInformation extends React.Component {
    viewModel = null;
    constructor(props) {
      super(props);
      this.viewModel = props.field.viewModel ? props.field.viewModel : null;
    }

    render() {
      const value = this.viewModel ? this.viewModel.value : "Default";

      return (
        <Form.Label className="w-100 ps-2 mb-0">
          <span className="text-blue-3 fw-100">{value}</span>
        </Form.Label>
      );
    }
  }
);

export default FormInformation;
