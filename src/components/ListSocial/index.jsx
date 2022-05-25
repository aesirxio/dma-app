import React from 'react';
import ComponentImage from '../ComponentImage';
import styles from './index.module.scss';

const defaultData = [
  {
    key: 1,
    images: '/assets/images/ic-youtube.svg',
    number: '2.344',
    des: 'Subscribers',
  },
  {
    key: 2,
    images: '/assets/images/ic-facebook.svg',
    number: '1.891',
    des: 'Likes',
  },
  {
    key: 3,
    images: '/assets/images/ic-facebook.svg',
    number: '1.004',
    des: 'Followers',
  },
  {
    key: 4,
    images: '/assets/images/ic-facebook.svg',
    number: '35,134',
    des: 'Followers',
  },
  {
    key: 5,
    images: '/assets/images/ic-facebook.svg',
    number: '1,284',
    des: 'Followers',
  },
  {
    key: 6,
    images: '/assets/images/ic-facebook.svg',
    number: '600',
    des: 'Posts',
  },
  {
    key: 7,
    images: '/assets/images/ic-facebook.svg',
    number: '2,134',
    des: 'Followers',
  },
  {
    key: 8,
    images: '/assets/images/ic-facebook.svg',
    number: '49',
    des: 'Posts',
  },
  {
    key: 9,
    images: '/assets/images/ic-facebook.svg',
    number: '59',
    des: 'Posts',
  },
];

class ListSocial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { value } = this.props;
    const dataToRender = value ? value : defaultData;
    return (
      <div className="bg-white shadow-sm rounded-2 px-3 py-4 h-100 d-flex align-items-center">
        <div className="row">
          {dataToRender.map((value, key) => {
            return (
              <div key={key} className={`item_social ${styles.item_social} col-4 mb-3 `}>
                <div className={`main_social ${styles.main_social} text-center`}>
                  <p
                    className={`mb-0 wrapper_images ${styles.wrapper_images} d-flex align-items-center justify-content-center`}
                  >
                    <ComponentImage src={value.images} alt={value.images} />
                  </p>
                  <h4 className="text-blue-0 mb-0">{value.number}</h4>
                  <p className="text-blue-0 opacity-50 mb-0">{value.des}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListSocial;
