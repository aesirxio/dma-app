/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import ComponentImage from '../ComponentImage';

class ComponentPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataPreview: [
        {
          name: 'Feeds',
          images: [
            '/assets/images/ic-facebook.svg',
            '/assets/images/wordpress.png',
            '/assets/images/joomla.png',
            '/assets/images/tumblr.png',
            '/assets/images/medium.png',
            '/assets/images/twitter.png',
          ],
        },
        {
          name: 'Stories',
          images: [
            '/assets/images/avatar.png',
            '/assets/images/avatar-1.png',
            '/assets/images/avatar-2.png',
            '/assets/images/avatar-3.png',
            '/assets/images/avatar-4.png',
            '/assets/images/avatar-5.png',
          ],
        },
      ],
      getImagePreview: '',
    };
  }

  componentDidMount = () => {
    this.setState({
      getImagePreview: this.state.dataPreview[0].images[0],
    });
  };

  handlePreview = (name) => {
    this.setState({
      getImagePreview: name,
    });
  };

  render() {
    let { dataPreview, getImagePreview } = this.state;
    return (
      <div>
        <h5 className="text-blue-0 mb-3">Preview</h5>
        <div className="border-1 rounded-2">
          <div>
            <h4 className="text-blue-0 mb-0 border-bottom-1 p-3">16 Placements</h4>
            <div className="row">
              <div className="col-6 border-end-1 pe-0">
                <div className="p-3 h-100 d-flex flex-column">
                  <div className="mb-3 d-flex align-items-center">
                    <ComponentImage
                      className="img-avatar"
                      src="/assets/images/ic-facebook.svg"
                      alt="icon facebook"
                    />
                    <h5 className="mb-0 text-blue-0">Facebook / Feeds</h5>
                  </div>
                  <div className="h-100 wr_preview_img bg-blue ">
                    <ComponentImage
                      src={getImagePreview}
                      className="img_preview"
                      alt={getImagePreview}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 ps-0">
                <div className="p-3">
                  {dataPreview &&
                    dataPreview.map((value, key) => {
                      return (
                        <div key={key} className="section_preview_img">
                          <h5 className="mb-2 text-blue-0">{value.name}</h5>
                          <div className="d-flex flex-wrap wr_col_prview_img">
                            {value.images.map((item, index) => {
                              return (
                                <div key={index} className="col-4 item_preview_img">
                                  <a
                                    href="#"
                                    className="wr_preview_img bg-blue-3"
                                    onClick={() => this.handlePreview(item)}
                                  >
                                    <ComponentImage src={item} className="img_preview" alt={item} />
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentPreview;
