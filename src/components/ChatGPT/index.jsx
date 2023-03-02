/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { withTranslation } from 'react-i18next';
import './index.scss';
import { env } from 'env';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-dma-lib';
import { Configuration, OpenAIApi } from 'openai';
import Helper from '../../utils/helper';
import ComponentImage from '../ComponentImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';


class ChatGPT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      input: '',
      show: false,
      loading:false,
    };
    // Set up OpenAI API key and API client
    const apiKey = env.REACT_APP_OPENAI_API_KEY;
    const configuration = new Configuration({
      apiKey,
    });
    this.apiClient = new OpenAIApi(configuration);
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
  handleCopy=()=>{
    this.setState({
      copied:true,
    })
  }

  handleInputSubmit = async (event) => {
    event.preventDefault();
    const input = this.state.input.trim();
    this.setState({
      loading:true,
    });
    if (input) {
      this.addMessage({message:input , type : "user"});

      this.setState({
        input: '',
      });
      try {
      const response = await this.apiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: `${input}`
        ,
        temperature: 0,
        max_tokens: 4000,
      });
      const AI = response.data.choices[0].text;
      console.log(response.status);
      this.addMessage({message: AI, type : "chatgpt" , pending : response.status });
      } catch (error) {
        console.log(error);
        this.addMessage({message: "An error occurred. Please try again later.", type: "chatgpt"});
      }
      this.setState({
        loading:false,
      });
    }
  };
  render() {
    const { messages, input } = this.state;

    return (
      <>
            <div className='formchat h-100 position-relative'>
              <div className='body-chat pt-3'>
                {messages.map((message, index) => (
                  <div className={`my-3 py-4 ${message.type} position-relative d-flex align-content-center flex-wrap`} key={index}>
                     {message.type === 'user' &&(
                      <ComponentImage
                        src={
                          Helper.isValidUrl(Storage.getItem(AUTHORIZATION_KEY.AVATAR))
                            ? Storage.getItem(AUTHORIZATION_KEY.AVATAR)
                            : '/assets/images/user_default.png'
                        }
                        alt=""
                        className="img-avatar rounded-circle object-fit-cover h-45 position-absolute "
                      />
                    )}
                    <p className={`px-5 mx-2 mb-0 text-${message.type} position-relative  `}>{message.message}</p>

                  </div>
                ))}
              </div>
              <form  className='d-flex position-absolute w-100 bottom-0 mb-1' onSubmit={this.handleInputSubmit}>
                <input className='w-100'  type="text" value={input} placeholder="Hi there! How can I assist you today?" onChange={this.handleInputChange} />
                <button className='btn submit btn-success px-3 w-70px ' type="submit" disabled={this.state.loading}>
                  {this.state.loading ? (
                  <div className="snippet d-flex flex-wrap justify-content-center align-items-center" data-title="dot-falling">
                      <div className="stage">
                        <div className="dot-falling"></div>
                      </div>
                  </div>
                  ) : (<i className="text-white">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </i>)}

                </button>
              </form>
            </div>
      </>
    );
  }
}

export default withTranslation('common')(ChatGPT);
