import React, { Component } from 'react';
import style from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';
import { Image } from 'aesirx-uikit';
import { withContentViewModel } from 'containers/ContentPage/ContentViewModels/ContentViewModelContextProvider';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

const Result = observer(
  class Result extends Component {
    constructor(props) {
      super(props);
    }

    handleUseContent = () => {
      this.props.viewModel?.contentFormViewModel.saveFormData(
        this.props?.formData.headline,
        this.props?.result?.content
      );
      this.props.handleClose();
    };
    render() {
      const { t } = this.props;
      return (
        <div
          className={`${style['result']} bg-white overflow-y-auto position-relative h-100 px-40 py-32px border-start`}
        >
          <h3 className="fw-medium fs-24 mb-24 d-flex justify-content-between">
            {t('txt_result')}
            <FontAwesomeIcon
              className="cursor-pointer"
              onClick={this.props.handleClose}
              icon={faXmark}
              width={12}
              height={12}
            />
          </h3>
          <div className={`${style['result-content']} overflow-y-auto`}>
            <label className="mb-8px fw-semibold"> {t('content_description')}</label>
            <Form.Control
              className="rounded-6 mb-4 fs-14"
              onChange={(event) => {
                this.props.handleUpdateState({ content: event.target.value }, 'result');
              }}
              as="textarea"
              value={this.props?.result?.content}
              rows={15}
            />
            {this.props?.result?.images?.length ? (
              <>
                <label className="mb-8px fw-semibold">{t('image')}</label>
                <div className="d-flex flex-wrap">
                  {this.props.result.images.map((image, index) => {
                    const isUsed = this.props.damAssets.find((item) => item?.url == image.url);
                    return (
                      <div key={index} className={`${style['image']} me-1 position-relative`}>
                        <div
                          className={`${style['option-image']} px-2 d-flex align-items-center justify-content-center position-absolute top-0 end-0 start-0 bottom-0`}
                        >
                          <a
                            className="fs-14 py-8px btn btn-secondary lh-sm fw-semibold"
                            target="_blank"
                            rel="noreferrer"
                            href={image.url}
                          >
                            {t('txt_view')}
                          </a>
                          <Button
                            disabled={isUsed}
                            onClick={() => this.props.handleImage([image])}
                            className="fs-14 py-8px lh-sm fw-semibold ms-3"
                            variant="success"
                          >
                            {isUsed ? t('txt_used') : t('txt_use')}
                          </Button>
                        </div>
                        <Image
                          src={image?.url}
                          alt={'Image ChatGPT'}
                          className="rounded-6 object-fit-cover"
                          width={154}
                          height={154}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <Button
            onClick={this.handleUseContent}
            className="w-100 rounded-6 mt-4"
            variant="success"
          >
            {t('txt_add_content_to_editor')}
          </Button>
        </div>
      );
    }
  }
);
export default withContentViewModel(withTranslation()(Result));
