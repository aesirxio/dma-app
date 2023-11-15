import React, { Component } from 'react';
import style from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Configuration, OpenAIApi } from 'openai';
import { FORM_FIELD_TYPE, notify } from 'aesirx-uikit';
import SimpleReactValidator from 'simple-react-validator';
import { renderingGroupFieldHandler } from 'utils/form';
import { Button, Form } from 'react-bootstrap';
import ComponentSwitch from 'components/ComponentSwitch';
import { withTranslation } from 'react-i18next';
import { withContentViewModel } from 'containers/ContentPage/ContentViewModels/ContentViewModelContextProvider';
import Result from './Result';
class ChatGPT extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.state = {
      formData: {
        audience: { label: 'Facebook', value: 'facebook' },
      },
      generateImage: false,
      generateImageData: {
        dimensions: '1024x1024',
      },
      result: {
        content: '',
        images: [],
      },
      loading: false,
    };

    // Set up OpenAI API key and API client
    const apiKey = this.props.viewModel.contentFormViewModel?.chatGPTAPIKey;
    const configuration = new Configuration({
      apiKey,
    });
    this.apiClient = new OpenAIApi(configuration);
  }
  handleUpdateState = (data, form = 'formData') => {
    this.setState({
      ...this.state,
      [form]: { ...this.state[form], ...data },
    });
  };

  handleToggleImage = () => {
    this.setState({
      ...this.state,
      generateImage: !this.state.generateImage,
    });
  };

  generateFormSetting = () => {
    const { t } = this.props;
    return {
      fields: [
        {
          label: t('txt_headline'),
          key: 'headline',
          type: FORM_FIELD_TYPE.INPUT,
          value: this.state.formData['headline'],
          required: true,
          validation: 'required',
          changed: (event) => {
            this.handleUpdateState({ headline: event.target.value });
          },
          blurred: () => {
            this.validator.showMessageFor('Headline');
          },
        },
        {
          label: t('txt_inspirations'),
          key: 'inspirations',
          type: FORM_FIELD_TYPE.TEXTAREA,
          rows: 6,
          placeholder: t('txt_inspirations_placeholder'),
          value: this.state.formData['inspirations'],
          changed: (event) => {
            this.handleUpdateState({ inspirations: event.target.value });
          },
        },
        {
          label: t('txt_description'),
          key: 'description',
          type: FORM_FIELD_TYPE.TEXTAREA,
          rows: 6,
          placeholder: t('txt_content_description_placeholder'),
          value: this.state.formData['description'],
          changed: (event) => {
            this.handleUpdateState({ description: event.target.value });
          },
        },
        {
          label: t('txt_approx_words'),
          key: 'approx_words',
          type: FORM_FIELD_TYPE.INPUT,
          typeFormat: 'number',
          value: this.state.formData['approx_words'],
          changed: (event) => {
            this.handleUpdateState({ approx_words: event.target.value });
          },
        },
        {
          label: t('txt_target_audience'),
          key: 'audience',
          type: FORM_FIELD_TYPE.DROPDOWN,
          value: this.state.formData['audience'],
          option: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Linkedin', value: 'linkedin' },
            { label: 'Instagram', value: 'Instagram' },
            { label: 'Youtube', value: 'Youtube' },
          ],
          changed: (event) => {
            this.handleUpdateState({ audience: event });
          },
        },
      ],
    };
  };
  listDimensions = [
    {
      label: '1024x1024',
      value: '1024x1024',
    },
    {
      label: '1792x1024',
      value: '1792x1024',
    },
    {
      label: '1024x1792',
      value: '1024x1792',
    },
  ];

  handleGenerate = async (event) => {
    const { t } = this.props;
    try {
      this.setState({ ...this.state, loading: true });
      event.preventDefault();
      let result = {
        content: '',
        images: this.state.result.images ?? [],
      };
      const requestPrompt = `${
        this.state.formData['inspirations']
          ? ''
          : `Blog posts for inspiration: ${this.state.formData['inspirations']}`
      },
        My purpose: ${this.state.formData['description']}
        My target audience: ${this.state.formData['audience']?.value} users
        Write a short post of about ${this.state.formData['approx_words'] ?? 100} words
      `;
      const response = await this.apiClient.createCompletion({
        model: 'gpt-3.5-turbo-instruct',
        prompt: requestPrompt,
        temperature: 0.6,
        top_p: 1,
        max_tokens: 300,
      });
      result.content = response.data.choices[0].text;
      if (this.state.generateImage) {
        const imageResponse = await this.apiClient.createImage({
          prompt: this.state.generateImageData.description,
          n: 1,
          size: this.state.generateImageData.dimensions,
          model: 'dall-e-3',
        });
        result.images = [...result.images, ...imageResponse?.data?.data];
      }
      this.setState({
        ...this.state,
        result,
        loading: false,
      });
    } catch (error) {
      this.setState({ ...this.state, loading: false });
      console.log('error', error);
      notify(error?.response?.data?.error?.message || t('txt_api_error'), 'error');
    }
  };
  render() {
    const formSetting = this.generateFormSetting();
    const { t } = this.props;
    return (
      <div
        style={{ background: '#00000099' }}
        className={`${
          this.props.show ? 'd-block' : 'd-none'
        } position-fixed top-0 end-0 bottom-0 z-index-100 start-0 d-flex justify-content-end`}
      >
        <div className={`${style['chatgpt']} bg-white h-100 px-40 py-32px`}>
          <h3 className="fw-medium fs-24 mb-24 d-flex justify-content-between">
            Content Generator with AI
            <FontAwesomeIcon
              className="cursor-pointer"
              onClick={this.props.handleClose}
              icon={faXmark}
              width={12}
              height={12}
            />
          </h3>
          <div className={`${style['chatgpt_form']} overflow-y-auto`}>
            {renderingGroupFieldHandler(formSetting, this.validator)}
            <div className={`mb-3`}>
              <label className="d-flex justify-content-between">
                {t('txt_generate_image')}
                <ComponentSwitch
                  checked={this.state.generateImage}
                  handleChange={this.handleToggleImage}
                />
              </label>
              {this.state.generateImage && (
                <Form.Control
                  as="textarea"
                  onChange={(event) => {
                    this.handleUpdateState(
                      { description: event.target.value },
                      'generateImageData'
                    );
                  }}
                  placeholder={t('txt_generate_image_placeholder')}
                  rows={6}
                />
              )}
            </div>
            {this.state.generateImage && (
              <div className="mb-3">
                <label>{t('txt_image_dimensions')}</label>
                <div className="d-flex">
                  {this.listDimensions.map((item, index) => {
                    const currentSize = item.value == this.state.generateImageData.dimensions;
                    return (
                      <span
                        onClick={() => {
                          this.handleUpdateState({ dimensions: item.value }, 'generateImageData');
                        }}
                        key={index}
                        className={`${currentSize && style['active_size']} ${
                          style['dimensions']
                        } d-block py-8px px-20 me-1 border rounded-6 cursor-pointer`}
                      >
                        {item?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={this.handleGenerate}
            disabled={!this.validator.allValid() || this.state.loading}
            className={`${style['button']} w-100 rounded-6 mt-4 d-flex align-items-center justify-content-center`}
            variant="success"
          >
            {this.state.loading ? (
              <div className={`${style['dot-falling']}`} />
            ) : this.state.result.content ? (
              t('txt_re_generate')
            ) : (
              t('txt_generate')
            )}
          </Button>
        </div>
        {this.state.result?.content && (
          <Result
            handleImage={this.props.handleImage}
            handleUpdateState={this.handleUpdateState}
            handleClose={this.props.handleClose}
            damAssets={this.props.damAssets}
            {...this.state}
          />
        )}
      </div>
    );
  }
}

export default withContentViewModel(withTranslation()(ChatGPT));
