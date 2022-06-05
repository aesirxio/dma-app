/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import ComponentImage from '../ComponentImage';
import './index.scss';

class ComponentCarouselCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 0,
          name: 'carousel 1',
          des: 'Demo Carousel 1',
          toggle: true,
          headline: '',
          description: '',
          website_url: '',
        },
        {
          id: 1,
          name: 'carousel 2',
          des: 'Demo Carousel 2',
          toggle: false,
          headline: '',
          description: '',
          website_url: '',
        },
      ],
      delete_card: '',
    };
  }

  handleClick = (name) => {
    let { data } = this.state;

    data.map((item) => ({
      ...item,
      toggle: item.id === name ? (item.toggle = !item.toggle) : item.toggle,
    }));

    this.setState({
      data: data,
    });
  };

  handleRemove = (name) => {
    let { data } = this.state;

    data.map((item) => ({
      ...item,
      headline: item.id === name ? (item.headline = '') : item.headline,
      description: item.id === name ? (item.description = '') : item.description,
      website_url: item.id === name ? (item.website_url = '') : item.website_url,
    }));

    this.setState({
      data: data,
    });
  };

  handleDelete = (name) => {
    this.setState({
      delete_card: name,
    });
  };

  handleChangeInput = (e, id) => {
    let getId = id;

    let { data } = this.state;

    data.map((item) => ({
      ...item,
      headline: item.id === getId ? (item.headline = e.target.value) : item.headline,
      description: item.id === getId ? (item.description = e.target.value) : item.description,
      website_url: item.id === getId ? (item.website_url = e.target.value) : item.website_url,
    }));

    this.setState({
      data: data,
    });
  };

  render() {
    let { data, delete_card } = this.state;
    return (
      <div className="mb-3">
        <h6>Carousel Cards</h6>
        <div>
          {data.map((value, key) => {
            return (
              <div key={key} className="bg-blue-3 rounded-2 item_carousel_card mb-3">
                <div className="cursor-pointer" onClick={() => this.handleClick(value.id)}>
                  <div className="p-2 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="text-blue-0 me-1">
                        <FontAwesomeIcon icon={faEllipsisV} />
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </i>
                      <div className="ps-1">
                        <ComponentImage
                          src="/assets/images/avatar.png"
                          alt=""
                          className="img-avatar"
                        />
                      </div>
                      <div className="ps-2">
                        <p className="mb-0">{value.name}</p>
                        <p className="mb-0 opacity-50">{value.des}</p>
                      </div>
                    </div>
                    <i className="text-green">
                      {!value.toggle ? (
                        <FontAwesomeIcon icon={faChevronDown} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronUp} />
                      )}
                    </i>
                  </div>
                </div>
                {value.toggle && (
                  <div className="p-2">
                    <div className="p-2 bg-white">
                      {!(delete_card === value.id) && (
                        <div className="d-flex p-2 bg-blue mb-3">
                          <div>
                            <ComponentImage
                              src="/assets/images/avatar.png"
                              alt="avatar"
                              className="w-55"
                            />
                          </div>
                          <div className="flex-1 px-2">
                            <p className="mb-0 opacity-50 lh-1">Untitled</p>
                            <p className="mb-0 opacity-50 lh-1">1280 x 720</p>
                            <div className="d-flex align-items-center mt-2">
                              <button className="btn btn-light fs-12 p-2 border-green">
                                <span>Edit Image</span>
                              </button>
                              <button className="btn btn-light fs-12 p-2 ms-2 border-green">
                                <span>Change Image</span>
                              </button>
                            </div>
                          </div>
                          <span
                            className="d-flex cursor-pointer"
                            onClick={() => this.handleDelete(value.id)}
                          >
                            <i className="text-green">
                              <FontAwesomeIcon icon={faTimes} />
                            </i>
                          </span>
                        </div>
                      )}

                      <div className="mb-3">
                        <p className="mb-1">Headline</p>
                        <Form.Control
                          as="input"
                          type={'text'}
                          id={value.headline}
                          value={value.headline || ''}
                          name="headline"
                          onChange={(e) => this.handleChangeInput(e, value.id)}
                          className={`form-control`}
                        />
                      </div>
                      <div className="mb-3">
                        <p className="mb-1">Description</p>
                        <Form.Control
                          as="input"
                          type={'text'}
                          id={value.description}
                          value={value.description || ''}
                          name="description"
                          onChange={(e) => this.handleChangeInput(e, value.id)}
                          className={`form-control`}
                        />
                      </div>
                      <div className="mb-3">
                        <p className="mb-1">Website URL</p>
                        <Form.Control
                          as="input"
                          type={'text'}
                          id={value.website_url}
                          value={value.website_url || ''}
                          name="website_url"
                          onChange={(e) => this.handleChangeInput(e, value.id)}
                          className={`form-control`}
                        />
                      </div>
                      <div className="text-end">
                        <button
                          className="btn btn-success"
                          onClick={() => this.handleRemove(value.id)}
                        >
                          <i className="text-white me-1">
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </i>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ComponentCarouselCard;
