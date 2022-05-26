/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component } from 'react';

import { observer } from 'mobx-react';

import { withContentViewModel } from '../../ContentViewModels/ContentViewModelContextProvider';
import { CONTENT_FIELD_KEY } from '../../../../constants/ContentModule';
import { FORM_FIELD_TYPE } from '../../../../constants/FormFieldType';
import SimpleReactValidator from 'simple-react-validator';
import { renderingGroupFieldHandler } from '../../../../utils/form';
import ContentFormGeneralChannel from './channel';
import ContentFormDescription from '../ContentFormDescription';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';
import Button from '../../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { notify } from '../../../../components/Toast';
import ContentUtils from '../../ContentUtils/ContentUtils';

const ContentFormGeneral = observer(
  class ContentFormGeneral extends Component {
    formPropsData = {};

    constructor(props) {
      super(props);

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      this.viewModel = this.props.viewModel.getFormViewModel();

      this.formPropsData = this.props.formPropsData;
    }

    generateFormSetting = () => {
      console.log('ContentFormGeneral re generate Form Setting', this.formPropsData);

      return {
        name: {
          fields: [
            {
              label: 'Headline',
              key: CONTENT_FIELD_KEY.NAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[CONTENT_FIELD_KEY.NAME],
              required: true,
              validation: 'required',
              changed: (event) => {
                this.formPropsData[CONTENT_FIELD_KEY.NAME] = event.target.value;
                this.valid('Headline');
              },
              blurred: () => {
                this.validator.showMessageFor('Headline');
              },
            },
          ],
        },

        selection: {
          fields: [
            {
              label: 'Choose the Project',
              key: CONTENT_FIELD_KEY.PROJECT,
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: this.formPropsData[CONTENT_FIELD_KEY.PROJECT],
              option: this.viewModel.projectMasterData,

              changed: (data) => {
                this.formPropsData[CONTENT_FIELD_KEY.PROJECT] = data;
              },
            },
            {
              label: 'Choose the Campaign',
              key: CONTENT_FIELD_KEY.CAMPAIGN,
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN],
              option: this.viewModel.campaignMasterData,

              changed: (data) => {
                this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN] = data;
              },
            },
          ],
        },
      };
    };

    valid = (key) => {
      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.validator.showMessageFor(key);
      }, 100);
    };

    onNext = () => {
      const channelsData = this.viewModel.channelMasterData;
      const dataChannels = ChannelUtils.getChannelByFilter(channelsData, 'removed', 'not');

      const mediaChannel = ContentUtils.hasMediaChannel(dataChannels);

      console.log('ContentFormGeneralrender1234', this.formPropsData);

      if (this.validator.allValid()) {
        if (dataChannels.length > 0) {
          if (
            mediaChannel.video &&
            !this.viewModel.requiredVideo(this.formPropsData[CONTENT_FIELD_KEY.DAM])
          ) {
            notify('The video field is required');
          } else {
            this.props.nextStep();
          }
        } else {
          notify('Please connect a Channel');
        }
      } else {
        this.validator.showMessages();
      }

      console.log(this.formPropsData);
    };

    onBlurDescription = () => {
      this.validator.showMessageFor('Description');
    };

    render() {
      const formSetting = this.generateFormSetting();

      console.log('ContentFormGeneral render', this.formPropsData);

      return (
        <div className="pe-md-80">
          <h3 className="mb-4">General</h3>
          <div className="bg-white p-4">
            <div className="row">
              <div className="col-md-5">
                <ContentFormGeneralChannel />
                {renderingGroupFieldHandler(formSetting.selection, this.validator)}
              </div>
              <div className="col-md-7">
                {renderingGroupFieldHandler(formSetting.name, this.validator)}
                <ContentFormDescription
                  formPropsData={this.formPropsData}
                  onBlurDescription={this.onBlurDescription}
                />
                {this.validator.message(
                  'Description',
                  this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION],
                  'required',
                  {
                    className: 'text-danger',
                  }
                )}
              </div>
            </div>
          </div>
          <div className="d-flex border-top-1 pt-3 justify-content-end wr_btn_back_wz pb-5">
            <a
              href="/wizard"
              className="btn rounded-2 border-1 border-green text-black bg-transparent px-2 mw-80 btn_back_wz d-none"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <span className="ps-2">Back</span>
            </a>
            <Button className="btn btn-success px-4 mw-80" onClick={this.onNext} text="Next" />
          </div>
        </div>
      );
    }
  }
);

export default withContentViewModel(ContentFormGeneral);
