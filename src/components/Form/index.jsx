import React, { Component, lazy } from 'react';

import SimpleReactValidator from 'simple-react-validator';
import { Form } from 'react-bootstrap';

import { renderingGroupFieldHandler } from '../../utils/form';

class FormComponent extends Component {
  formPropsData = null;

  isEditMode = false;
  validator = null;
  viewModel = null;

  constructor(props) {
    console.log('re initialize');
    super(props);

    this.isEditMode = props.editMode === true;
    this.validator = new SimpleReactValidator();
    this.viewModel = this.props.viewModel;
    this.formPropsData = props.formPropsData;

    if (this.isEditMode) {
      this.populatingFormDataHandler(props.populatedFormData);
    }

    this.viewModel.setForm(this);
  }

  isFormValid = () => {
    console.log('isFormValid');
    if (this.validator.allValid()) {
      console.log('[is Form Valid]');
      console.log(this.formPropsData);
      return true;
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
      return false;
    }
  };

  getFormPropsData = () => this.formPropsData;

  renderingFormHandler = (formSetting) => {
    return (
      <Form key={Math.random(40, 200)} className={this.props.formClassName}>
        {Object.keys(formSetting)
          .map((groupIndex) => {
            return [...Array(formSetting[groupIndex])].map((group) => {
              return renderingGroupFieldHandler(group, this.validator);
            });
          })
          .reduce((arr, el) => {
            return arr.concat(el);
          }, [])}
      </Form>
    );
  };

  render() {
    console.log('rerender.....');

    this.validator.purgeFields();

    let formSetting = this.props.generateFormSetting();

    return this.renderingFormHandler(formSetting);
  }
}

export default FormComponent;
