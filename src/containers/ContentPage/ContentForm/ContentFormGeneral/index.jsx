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
import { notify } from 'aesirx-uikit';
import ContentUtils from '../../ContentUtils/ContentUtils';
import { withTranslation } from 'react-i18next';
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
      const { t } = this.props;
      return {
        name: {
          fields: [
            {
              label: t('txt_headline'),
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
              label: t('txt_choose_the_project'),
              key: CONTENT_FIELD_KEY.PROJECT,
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: this.formPropsData[CONTENT_FIELD_KEY.PROJECT],
              option: this.viewModel.projectMasterData,

              changed: (data) => {
                this.formPropsData[CONTENT_FIELD_KEY.PROJECT] = data;
              },
            },
            {
              label: t('txt_choose_the_campaign'),
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
      const { t } = this.props;
      const mediaChannel = ContentUtils.hasMediaChannel(dataChannels);
      const validate = {
        description: 3600,
        hashtag: 0,
        headline: 220,
        image: false,
        media: false,
        video: false,
      };
      dataChannels.forEach((channel) => {
        channel.list.forEach((list) => {
          if (
            list?.requirements?.description < validate.description &&
            list?.requirements?.description != 0
          ) {
            validate.description = list?.requirements?.description;
          }
          //  if(list?.requirements?.hashtag <  validate.hashtag && list?.requirements?.hashtag !=0){
          //   validate.hashtag = list?.requirements?.hashtag;
          //  }
          if (
            list?.requirements?.headline < validate.headline &&
            list?.requirements?.headline != 0
          ) {
            validate.headline = list?.requirements?.headline;
          }
          if (list?.requirements?.image == true) {
            validate.image = list?.requirements?.image;
          }
          if (list?.requirements?.video == true) {
            validate.video = list?.requirements?.video;
          }
          if (list?.requirements?.media == true) {
            validate.media = list?.requirements?.media;
          }
        });
      });

      if (this.validator.allValid()) {
        if (dataChannels.length > 0) {
          if (
            mediaChannel.video &&
            !this.viewModel.requiredVideo(this.formPropsData[CONTENT_FIELD_KEY.DAM])
          ) {
            notify(t('txt_the_video_field_is_required'), 'error');
          } else if (this.formPropsData[CONTENT_FIELD_KEY.NAME].length > validate.headline) {
            notify(t('txt_headline_limmit'), 'error');
          } else if (
            Object.values(this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION])[0].length >
            validate.description
          ) {
            notify(t('txt_description_limmit'), 'error');
          } else if (Object.values(this.formPropsData[CONTENT_FIELD_KEY.DAM])[0].length == 0) {
            notify(t('txt_the_images_field_is_required'), 'error');
          } else {
            this.props.nextStep();
          }
        } else {
          notify(t('txt_please_connect_a_channel'), 'warn');
        }
      } else {
        this.validator.showMessages();
      }
    };

    onBlurDescription = () => {
      this.validator.showMessageFor('Description');
    };

    render() {
      const formSetting = this.generateFormSetting();
      const { t } = this.props;
      return (
        <div className="pe-md-80">
          <h3 className="mb-4">{t('txt_general')}</h3>
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
              <span className="ps-2">{t('txt_back')}</span>
            </a>
            <Button className="btn btn-success px-4 mw-80 " onClick={this.onNext} text="txt_next" />
          </div>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withContentViewModel(ContentFormGeneral));
