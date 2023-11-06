/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { withTranslation } from 'react-i18next';
import './index.scss';
import { env } from 'aesirx-lib';
import { AUTHORIZATION_KEY, Storage, Helper } from 'aesirx-lib';
import { Configuration, OpenAIApi } from 'openai';
import { Image } from 'aesirx-uikit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { notify } from 'aesirx-uikit';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { withContentViewModel } from 'containers/ContentPage/ContentViewModels/ContentViewModelContextProvider';
import ContentUtils from 'containers/ContentPage/ContentUtils/ContentUtils';
import { CONTENT_DESCRIPTION_MODE, CONTENT_FIELD_KEY } from 'constants/ContentModule';

class ChatGPT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [{ message: 'Hi there! How can I help you?', role: 'chatgpt' }],
      input: '',
      loading: false,
    };
    // Set up OpenAI API key and API client
    const apiKey = this.props.viewModel.contentFormViewModel?.chatGPTAPIKey;
    const configuration = new Configuration({
      apiKey,
    });
    this.apiClient = new OpenAIApi(configuration);
    if (env.REACT_APP_OPENAI_API_KEY === undefined) {
      const { t } = this.props;

      notify(t('txt_open_api_key_warning'), 'warn');
    }
  }

  addMessage = (message) => {
    const messages = this.state.messages.slice();
    messages.push(message);
    this.setState({
      messages,
    });
  };

  handleInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleInputSubmit = async (event) => {
    event.preventDefault();
    const input = this.state.input.trim();
    const { t } = this.props;
    this.setState({
      loading: true,
    });
    if (input) {
      this.addMessage({ message: input, role: 'user' });

      this.setState({
        input: '',
      });
      try {
        const response = await this.apiClient.createCompletion({
          model: 'text-davinci-003',
          prompt: `${input}`,
          temperature: 0,
          top_p: 1,
          max_tokens: 4000,
        });
        const AI = response.data.choices[0].text;
        this.addMessage({ message: AI, type: 'chatgpt', pending: response.status });
      } catch (error) {
        this.addMessage({
          message: error?.response?.data?.error?.message || `${t('txt_api_error')}`,
          role: 'chatgpt',
        });
      }
      this.setState({
        loading: false,
      });
    }
  };

  handleGenerateImage = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });
    try {
      const response = await this.apiClient.createImage({
        prompt: 'A cute baby sea otter',
        n: 1,
        size: '1024x1024',
      });
      this.addMessage({
        message: response['data'][0]['url'],
        role: 'chatgpt',
        type: 'image',
      });
    } catch (error) {
      this.addMessage({
        message: error?.response?.data?.error?.message || `${t('txt_api_error')}`,
        role: 'chatgpt',
      });
    }
    this.setState({
      loading: false,
    });
  };

  handleUseContent = (data) => {
    ContentUtils.setDataForChannels(
      CONTENT_FIELD_KEY.DESCRIPTION,
      data,
      CONTENT_DESCRIPTION_MODE.BASIC,
      this.props.viewModel?.contentFormViewModel?.form?.formPropsData
    );
  };
  render() {
    const { messages, input } = this.state;
    const { t } = this.props;
    console.log(this.props);
    return (
      <div>
        <div className="chat-body mt-4" style={{ minHeight: '80vh' }}>
          {messages.map((message) => {
            return (
              <div
                className={`d-flex align-items-start ${
                  message.role == 'chatgpt' ? 'flex-row-reverse' : ''
                }`}
              >
                <Image
                  width={45}
                  height={45}
                  src={
                    message.role == 'chatgpt'
                      ? '/assets/images/chatgpt-icon.svg'
                      : Helper.isValidUrl(Storage.getItem(AUTHORIZATION_KEY.AVATAR))
                      ? Storage.getItem(AUTHORIZATION_KEY.AVATAR)
                      : '/assets/images/user_default.png'
                  }
                  alt="User Avatar"
                  className={`rounded-circle object-fit-cover ${
                    message.role == 'chatgpt' && 'bg-success p-2'
                  }`}
                />
                <span
                  className={`mx-3 p-2 px-3 text-white rounded ${
                    message.role == 'chatgpt' ? 'bg-success' : 'bg-gray-600'
                  }`}
                >
                  {message.type !== 'image' ? (
                    message.message
                  ) : (
                    <Image
                      className={'object-fit-contain'}
                      width={200}
                      height={200}
                      src={message.message}
                    />
                  )}
                </span>
                {message.role == 'chatgpt' && message.type !== 'image' && (
                  <Button
                    onClick={() => this.handleUseContent(message.message)}
                    variant="primary"
                    className="fs-14 fw-bold py-1 px-2"
                  >
                    Use Content
                  </Button>
                )}
                {message.role == 'chatgpt' && message.type == 'image' && (
                  <Button
                    onClick={() => this.props.handleImage([{ url: message.message }])}
                    variant="primary"
                    className="fs-14 fw-bold py-1 px-2"
                  >
                    Use Image
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <Form className="d-flex" onSubmit={this.handleInputSubmit}>
          <InputGroup>
            <Form.Control
              value={input}
              type="text"
              className="py-2"
              onChange={this.handleInputChange}
              placeholder={t('txt_intro_chatgpt')}
            />
            <Button
              disabled={this.state.loading}
              type="submit"
              variant="success"
              className="py-2 px-3"
            >
              {this.state.loading ? (
                <div
                  className="snippet d-flex flex-wrap justify-content-center align-items-center"
                  data-title="dot-falling"
                >
                  <div className="stage">
                    <div className="dot-falling"></div>
                  </div>
                </div>
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} />
              )}
            </Button>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default withContentViewModel(withTranslation()(ChatGPT));
