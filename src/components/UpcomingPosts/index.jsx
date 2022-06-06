/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import './index.scss';
import ComponentNoData from '../ComponentNoData';
import ComponentImage from '../ComponentImage';
import moment from 'moment';

class UpcomingPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { contents } = this.props;

    let today = new Date();

    let result = contents
      ? contents
          .filter((work) => work.start > today)
          .map((item) => {
            return {
              ...item,
              schedule_time:
                moment(item.start_date).format('DD/MM/YYYY HH:mm') +
                ' | ' +
                moment(item.end_date).format('DD/MM/YYYY HH:mm'),
            };
          })
      : [];

    return (
      <div className="px-4 post_events pb-2">
        <div className="d-flex align-items-center mb-3 justify-content-between">
          <h4 className="fs-4 text-blue-0">Upcoming Posts</h4>
          {/*{this.props.isClose && (*/}
          {/*  <a*/}
          {/*    href={void 0}*/}
          {/*    className="cursor-pointer text-green"*/}
          {/*    onClick={this.props.handleFullCalender}*/}
          {/*  >*/}
          {/*    <FontAwesomeIcon icon={faTimes} />*/}
          {/*  </a>*/}
          {/*)}*/}
        </div>
        {result.length ? (
          <div>
            {result.map((data) => {
              return (
                <div key={data.id} className="main_post rounded-2 shadow mb-3">
                  <div
                    className={`${
                      data.background ? '' : 'bg-blue-3'
                    } rounded-top-2 text-blue-0 fw-bold py-2 px-3 d-flex justify-content-between align-items-center rounded-top`}
                    style={{ background: data.background }}
                  >
                    <span className="opacity-75">
                      {/*{value[CONTENT_FIELD_KEY.NAME]}*/}
                      {data.title}
                    </span>
                    <span className="cursor-pointer text-blue-3 text-decoration-none">...</span>
                  </div>
                  <div className="p-3">
                    <ul className="list-unstyled post_list_text">
                      <li className="fs-14 mb-2 row">
                        <span className="text-blue-0 col-4">
                          <strong>Campaign:</strong>
                        </span>
                        <span className="col-8 text-wrap text-break">{data.description}</span>
                      </li>
                      <li className="fs-14 row">
                        <span className="text-blue-0 col-4 ">
                          <strong>Schedule:</strong>
                        </span>
                        <span className="col-8">{data.schedule_time}</span>
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex post_list_images">
                      <ComponentImage
                        src={'/assets/images/' + data.channel + '.png'}
                        className="img-avatar"
                        alt={data.channel}
                      />
                      {/*{images.map((item, index) => {*/}
                      {/*  return (*/}
                      {/*    <li key={index} className="me-1">*/}
                      {/*      <img src={item} className="img-avatar" />*/}
                      {/*    </li>*/}
                      {/*  );*/}
                      {/*})}*/}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <ComponentNoData
            icons="/assets/images/document-text-outline.svg"
            title="Create your 1st upcoming Posts"
            linlText="Create content"
            link="/content/create"
            iconBg="icon-post"
            isBtn={true}
          />
        )}
      </div>
    );
  }
}

export default UpcomingPosts;
