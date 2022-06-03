/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ComponentImage from '../ComponentImage';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import './index.scss';

SwiperCore.use([Navigation, Pagination]);

class BannerLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { dataSlider } = this.props;
    return (
      <div className="col-md-4 bg-primary p-0 d-none d-md-block position-relative">
        <div className="wrapper_banner_left vh-100">
          <div className="content_banner_left d-flex h-100 justify-content-between flex-column">
            <a href="/" className="d-block" style={{ zIndex: 1 }}>
              <ComponentImage alt={'logo'} src={'/assets/images/logo/logo-white.svg'} />
            </a>
            <div className="wrapper_slider">
              <div className="wrapper_icon_slider">
                <ComponentImage alt={'icon quote'} src={'assets/images/icon-quote.svg'} />
              </div>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
              >
                {dataSlider.map((value, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <div className="wrapper_text_slider">
                        <p className="text_slider">{value.text}</p>
                        <p className="title_slider mb-1">{value.title}</p>
                        <p className="subtitle_slider">
                          <small>{value.subtitle}</small>
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <span className="position-absolute top-0" style={{ zIndex: 0 }}>
            
          </span>
        </div>
      </div>
    );
  }
}

export default BannerLeft;
