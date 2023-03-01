/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { withTranslation } from 'react-i18next';
import './index.scss';
import { env } from 'env';
import { Configuration, OpenAIApi } from 'openai';


class ChatGPT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      input: '',
      show: false,
      // copied : false,
    };
    // Set up OpenAI API key and API client
    const apiKey = env.REACT_APP_OPENAI_API_KEY;
    const configuration = new Configuration({
      apiKey,
    });
    this.apiClient = new OpenAIApi(configuration);
  }

  // componentDidMount() {
  //   this.addMessage('DMA : Hi there! How can I assist you today?');
  // }

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

    if (input) {
      this.addMessage({message:input , type : "user"});

      this.setState({
        input: '',
      });
      const response = await this.apiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: `${input}`
        ,
        temperature: 0,
        max_tokens: 4000,
      });
      const AI = response.data.choices[0].text;
      console.log(AI);
      this.addMessage({message: AI, type : "chatgpt"});

    }
  };

  render() {
    const { messages, input } = this.state;

    return (
      <>
            <div className='formchat h-100 position-relative my-4'>
              <div className='body-chat'>
                {messages.map((message, index) => (
                  <div className={`my-2 py-4  ${message.type} position-relative`} key={index}><p className='px-5 mx-2 mb-0'>{message.message}</p></div>
                ))}
              </div>
              <form  className='d-flex' onSubmit={this.handleInputSubmit}>
                <input className='w-100'  type="text" value={input} placeholder="Hi there! How can I assist you today?" onChange={this.handleInputChange} />
                <button className='btn submit btn-success' type="submit">Send</button>
              </form>
            </div>
      </>
    );
  }
}

export default withTranslation('common')(ChatGPT);
