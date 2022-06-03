/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { ProgressBar } from 'react-bootstrap';

import '../index.module.scss';
import ComponentImage from '../../../components/ComponentImage';

const data = [
  {
    key: 1,
    image: '/assets/images/icon-pepsi.png',
    projectName: 'Marketing Vietnam Suntory PepsiCo',
    avatar: '/assets/images/avatar-1.png',
    progress: 70,
    day: '31/08/2020',
    text:
      'Suntory PepsiCo Vietnam Beverage (SPVB), is 100% owned by foreign capital, and is a new beverage joint venture between PepsiCo Inc. and Suntory',
  },
  {
    key: 2,
    image: '/assets/images/icon-nikon.png',
    projectName: 'Marketing Vietnam Suntory PepsiCo',
    avatar: '/assets/images/avatar-2.png',
    progress: 50,
    day: '31/08/2020',
    text:
      'Suntory PepsiCo Vietnam Beverage (SPVB), is 100% owned by foreign capital, and is a new beverage joint venture between PepsiCo Inc. and Suntory',
  },
  {
    key: 3,
    image: '/assets/images/icon-adidas.png',
    projectName: 'Marketing Vietnam Adidas',
    avatar: '/assets/images/avatar-3.png',
    progress: 70,
    day: '31/08/2020',
    text:
      'Suntory PepsiCo Vietnam Beverage (SPVB), is 100% owned by foreign capital, and is a new beverage joint venture between PepsiCo Inc. and Suntory',
  },
  {
    key: 4,
    image: '/assets/images/icon-levis.png',
    projectName: "Marketing Vietnam Levi's",
    avatar: '/assets/images/avatar-4.png',
    progress: 50,
    day: '31/08/2020',
    text:
      'Suntory PepsiCo Vietnam Beverage (SPVB), is 100% owned by foreign capital, and is a new beverage joint venture between PepsiCo Inc. and Suntory',
  },
  {
    key: 5,
    image: '/assets/images/icon-gap.png',
    projectName: "MShop Gap for Casual Women's, Men's",
    avatar: '/assets/images/avatar-5.png',
    progress: 90,
    day: '31/08/2020',
    text:
      'Suntory PepsiCo Vietnam Beverage (SPVB), is 100% owned by foreign capital, and is a new beverage joint venture between PepsiCo Inc. and Suntory',
  },
  {
    key: 6,
    image: '/assets/images/icon-gap.png',
    projectName: 'Marketing Vietnam McDonalds',
    avatar: '/assets/images/avatar-5.png',
    progress: 50,
    day: '31/08/2020',
    text:
      'Suntory PepsiCo Vietnam Beverage (SPVB), is 100% owned by foreign capital, and is a new beverage joint venture between PepsiCo Inc. and Suntory',
  },
  {
    key: 7,
    image: '/assets/images/icon-gap.png',
    projectName: 'Samsung Note 20 campaign',
    avatar: '/assets/images/avatar-5.png',
    progress: 70,
    day: '31/08/2020',
    text:
      'Samsung Galaxy Note20 Ultra 5G. The Samsung Galaxy Note 20 Ultra 5G sets the pace for 2020 smartphones with a huge screen.',
  },
  {
    key: 8,
    image: '/assets/images/icon-gap.png',
    projectName: 'Hugo Boss campaign',
    avatar: '/assets/images/avatar-5.png',
    progress: 80,
    day: '31/08/2020',
    text: 'Phasellus scelerisque commodo nunc, sit amet blandit est tincidunt vitae.',
  },
  {
    key: 9,
    image: '/assets/images/icon-gap.png',
    projectName: 'Marketing Vietnam RayBan',
    avatar: '/assets/images/avatar-5.png',
    progress: 90,
    day: '31/08/2020',
    text:
      'Donec at maximus nulla, ac molestie purus. Aliquam nunc lacus, lobortis ut placerat eu, suscipit at erat. Sed at mi diam. Sed aliquam diam ac',
  },
];

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div>
        <div className="row">
          {data.map((value, key) => {
            return (
              <div key={key} className="item_thumb col-3 mb-3">
                <div className="main_thumb bg-white p-3 rounded-2 h-100">
                  <div className="mb-2">
                    <ComponentImage
                      src={value.image}
                      alt={value.image}
                      className="img-avatar ms-2"
                    />
                  </div>
                  <h6 className="fw-bold mb-2">{value.projectName}</h6>
                  <p className="mb-3">{value.text}</p>
                  <ProgressBar className="mb-3">
                    <ProgressBar
                      variant="success"
                      now={value.progress}
                      label={`${value.progress}%`}
                    />
                  </ProgressBar>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">{value.day}</p>
                    <ComponentImage src={value.avatar} alt={value.avatar} className="img-avatar" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(List);
