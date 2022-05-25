import React, { Component } from 'react';
import { NEWS_FIELD_KEY } from '../../constants/NewsConstant';
import { formatDate } from '../../utils/date';
import ComponentImage from '../ComponentImage';
import DefaultImage from './Image.png';
import './index.scss';
export default class Inspiration extends Component {
  render() {
    return (
      <div className="bg-white p-3 pb-5">
        <div className="d-flex justify-content-between mb-2">
          <h4>Inspiration</h4>
          <a href={this.props?.inspiration[0][NEWS_FIELD_KEY.CATEGORY_LINK] ?? '/'}>More</a>
        </div>
        <div className="block__news row g-4">
          {this.props.inspiration.map((item, index) => (
            <a
              key={item[NEWS_FIELD_KEY.ID]}
              href={item[NEWS_FIELD_KEY.LINK]}
              target={`_blank`}
              className="block__news--content col-md-4"
            >
              <div className="mb-3">
                <ComponentImage
                  className="img-fluid object-fit-cover w-100"
                  src={item[NEWS_FIELD_KEY.INTRO_IMAGE] ?? DefaultImage}
                  alt={item[NEWS_FIELD_KEY.TITLE]}
                />
              </div>
              <small className="fs-12 text-green fw-bold">{item[NEWS_FIELD_KEY.CATEGORY]}</small>
              <br />
              <h5 className="mb-0">{item[NEWS_FIELD_KEY.TITLE]}</h5>
              <small className="fs-12">{formatDate(item[NEWS_FIELD_KEY.PUBLISH_DATE])}</small>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
