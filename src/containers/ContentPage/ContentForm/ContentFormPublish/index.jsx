import React, { Component } from 'react';

import { observer } from 'mobx-react';

import { withContentViewModel } from '../../ContentViewModels/ContentViewModelContextProvider';
import { CONTENT_FIELD_KEY, CONTENT_POST_TYPE } from '../../../../constants/ContentModule';

import SimpleReactValidator from 'simple-react-validator';
import ContentUtils from '../../ContentUtils/ContentUtils';
import ContentFormPublishChannel from './channel';
import ContentFormPublishAdvance from './advance';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import Button from '../../../../components/Button';
import ContentFormPublishShedule from './shedule';

const ContentFormPublish = observer(
  class ContentFormPublish extends Component {
    formPropsData = {};

    constructor(props) {
      super(props);

      this.validator = new SimpleReactValidator();

      this.viewModel = this.props.viewModel.getFormViewModel();

      this.formPropsData = this.props.formPropsData;
    }

    handleSave = (type) => {
      this.viewModel.save(type);
    };

    render() {
      const mode = this.formPropsData[CONTENT_FIELD_KEY.MODE];

      console.log('ContentFormPublish render', this.formPropsData);

      return (
        <>
          <h3 className="mb-4">Publish</h3>
          <div className="bg-white p-4">
            <div className="row">
              <div className="col-md-4">
                <ContentFormPublishChannel formPropsData={this.formPropsData} />
              </div>
              <div className="col-md-6">
                <h6 className="text-blue mb-0 mb-3">When to publish this?</h6>
                <div className="rounded border-1 p-3">
                  {mode === 'basic' ? (
                    <ContentFormPublishShedule formPropsData={this.formPropsData} />
                  ) : (
                    <ContentFormPublishAdvance formPropsData={this.formPropsData} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex border-top-1 pt-3 justify-content-start pb-5">
            <div className="w-100">
              <Button
                className="btn btn-light border-success "
                onClick={this.props.previousStep}
                text="Back"
                icon={faChevronLeft}
              />
            </div>
            <div className="d-flex">
              <Button
                className="btn btn-secondary me-1"
                text="Save as Draft"
                onClick={() => this.handleSave(CONTENT_POST_TYPE.DRAFT)}
              />
              <Button
                className="btn btn-success"
                text="Save"
                onClick={() => this.handleSave(CONTENT_POST_TYPE.POST)}
              />
            </div>
          </div>
        </>
      );
    }
  }
);

export default withContentViewModel(ContentFormPublish);
