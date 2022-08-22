/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';
import DamButton from '../DamButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import ComponentImage from '../ComponentImage';
import { withTranslation } from 'react-i18next';

class ComponentDamAssets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkTypeImage: false,
      imageDam: this.props.field.getImageDam ? this.props.field.getImageDam : [],
      linkImage: this.props.field.getLinkImage ? this.props.field.getLinkImage : '',
    };
  }

  handleDamAssets = (data) => {
    if (data[0].extension !== 'mp4') {
      this.props.field.changed(data);
      this.setState({
        checkTypeImage: false,
        imageDam: data,
      });
    } else {
      this.setState({ checkTypeImage: true });
    }
  };

  render() {
    const { linkImage, checkTypeImage, imageDam } = this.state;
    const { t } = this.props;
    return (
      <>
        <Form.Group className={`mb-4`}>
          <div
            className={`position-relative cursor-pointer wr_upload_images ${
              imageDam.length > 0 ? 'active_img' : ''
            } `}
          >
            {linkImage ? (
              <div className={`item_dam_assets d-flex justify-content-start wr_icon_upload`}>
                <div className="wr_img_thumbnail_dam position-relative m-2">
                  <ComponentImage
                    className={`img-thumbnail rounded imgTab`}
                    alt={linkImage}
                    src={linkImage}
                  />
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center p-3 wr_icon_upload w-100 justify-content-center">
                <i className="fs-1 text-blue-0 opacity-25">
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                </i>
                <div className="text-center ms-1">
                  {/* <p className="mb-0">Drag and drop a file here </p> */}
                  <p className="mb-0 ms-2">
                    <strong>{t('txt_choose_file')}</strong>
                  </p>
                </div>
              </div>
            )}

            <div className="main_upload_images">
              <DamButton
                changed={(data) => this.handleDamAssets(data)}
                checkTypeImage={checkTypeImage}
                data={imageDam}
              />
            </div>
          </div>
        </Form.Group>
      </>
    );
  }
}

export default withTranslation('common')(ComponentDamAssets);
