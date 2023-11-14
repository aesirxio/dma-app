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
        dimensions: '256x256',
      },
      result: {
        content: `\n\nSummer is here, and what better way to celebrate the Fourth of July weekend than with some delicious and refreshing salads? Whether you're hosting a backyard barbecue or heading to a potluck, these 9 salad recipes from ChopChop Family are perfect for any summertime occasion. One of our favorites is the Berry and Burrata Salad, which combines fresh berries, creamy burrata cheese, and a tangy balsamic vinaigrette for a burst of flavors in every bite. It's the perfect side dish to any grilled meat or can even be enjoyed as a light and healthy lunch. Check out the full list of salad recipes on our blog and get ready to impress your friends and family with these easy and delicious options. Trust us, your taste buds will thank you! #saladrecipes #FourthofJuly #summercookout`,
        images: [],
      },
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

  handleGenerateImage = () => {
    this.setState({
      ...this.state,
      generateImage: !this.state.generateImage,
    });
  };

  generateFormSetting = () => {
    return {
      fields: [
        {
          label: 'Headline',
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
          label: 'Inspirations',
          key: 'inspirations',
          type: FORM_FIELD_TYPE.TEXTAREA,
          rows: 6,
          placeholder:
            'Enter up to 5 URLs of existing blog posts you would like to be inspired, separated by commas',
          value: this.state.formData['inspirations'],
          changed: (event) => {
            this.handleUpdateState({ inspirations: event.target.value });
          },
        },
        {
          label: 'Description',
          key: 'description',
          type: FORM_FIELD_TYPE.TEXTAREA,
          rows: 6,
          placeholder:
            'Describe the topic for which you need \n\nFor example: \n"Marketing a social media management tool online"',
          value: this.state.formData['description'],
          changed: (event) => {
            this.handleUpdateState({ description: event.target.value });
          },
        },
        {
          label: 'Approx. Words',
          key: 'approx_words',
          type: FORM_FIELD_TYPE.INPUT,
          typeFormat: 'number',
          value: this.state.formData['approx_words'],
          changed: (event) => {
            this.handleUpdateState({ approx_words: event.target.value });
          },
        },
        {
          label: 'Audience',
          key: 'audience',
          type: FORM_FIELD_TYPE.DROPDOWN,
          value: this.state.formData['audience'],
          option: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Linkedin', value: 'linkedin' },
            { label: 'Instagram', value: 'Instagram' },
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
      label: '256x256',
      value: '256x256',
    },
    {
      label: '512x512',
      value: '512x512',
    },
    {
      label: '1024x1024',
      value: '1024x1024',
    },
    {
      label: '1792x1792',
      value: '1792x1792',
    },
  ];

  handleGenerateImage = async () => {
    try {
      if (this.state.generateImageData.description) {
      }
      const response = await this.apiClient.createImage({
        prompt: this.state.generateImageData.description,
        n: 1,
        size: this.state.generateImageData.dimensions,
      });
      this.setState({
        ...this.state,
        result: {
          ...this.state.result,
          images: [...this.state.result.images, response['data'][0]['url']],
        },
      });
    } catch (error) {
      notify(error?.response?.data?.error?.message || 'Something went wrong', 'error');
    }
  };
  handleGenerate = async (event) => {
    try {
      event.preventDefault();
      const requestPrompt = `Write a short content of about ${
        this.state.formData['approx_words'] ?? 100
      } inspired by ${this.state.formData['inspirations']} with the content about ${
        this.state.formData['description']
      } for ${this.state.formData['audience']?.value} users`;

      const response = await this.apiClient.createCompletion({
        model: 'gpt-3.5-turbo-instruct',
        prompt: requestPrompt,
        top_p: 1,
        max_tokens: 300,
      });
      this.setState({
        ...this.state,
        result: {
          ...this.state.result,
          content: response.data.choices[0].text,
        },
      });
    } catch (error) {
      notify(error?.response?.data?.error?.message || 'Something went wrong', 'error');
    }
  };
  render() {
    const formSetting = this.generateFormSetting();
    console.log(this.state.result);
    return (
      <div
        style={{ background: '#00000099' }}
        className={`${
          this.props.show ? 'd-block' : 'd-none'
        } position-fixed top-0 end-0 bottom-0 z-index-100 start-0 d-flex justify-content-end`}
      >
        <div
          className={`${style['chatgpt']} bg-white  overflow-y-auto  position-relative h-100 px-40 py-32px`}
        >
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
          <div className={style['chatgpt_form']}>
            {renderingGroupFieldHandler(formSetting, this.validator)}
            <div className={`mb-3`}>
              <label className="d-flex justify-content-between">
                Generate image
                <ComponentSwitch
                  checked={this.state.generateImage}
                  handleChange={this.handleGenerateImage}
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
                  placeholder={
                    'Write description of the image you would like to generate.\n\nFor example:\n“Lush coffee bean trees growing in graphic style”'
                  }
                  rows={6}
                />
              )}
            </div>
            {this.state.generateImage && (
              <div className="mb-3">
                <label>Image dimensions</label>
                <div className="d-flex justify-content-between">
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
                        } d-block py-8px px-20 border rounded-6 cursor-pointer`}
                      >
                        {item?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            <Button
              onClick={this.handleGenerate}
              disabled={!this.validator.allValid()}
              className="w-100 rounded-6"
              variant="success"
            >
              Generate
            </Button>
          </div>
        </div>
        {this.state.result?.content && (
          <div className="bg-white  overflow-y-auto  position-relative h-100 px-40 py-32px border-start">
            <h3 className="fw-medium fs-24 mb-24 d-flex justify-content-between">
              Result
              <FontAwesomeIcon
                className="cursor-pointer"
                onClick={this.props.handleClose}
                icon={faXmark}
                width={12}
                height={12}
              />
            </h3>
            {this.state.result?.content}
          </div>
        )}
      </div>
    );
  }
}

export default withContentViewModel(withTranslation()(ChatGPT));
