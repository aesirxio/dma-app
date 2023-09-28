/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Image as ComponentImage } from 'aesirx-uikit';

class MediaDataRender extends React.Component {
  // canvaEditHandler = (index, id) => {
  //   this.props.onSetCanvaIndexToEdit(index, id);
  // };

  // canvaDeleteHandler = (index) => {
  //   this.props.canvaDeleteItem(index);
  // };

  render() {
    const { damData, deleteDamItem } = this.props;
    // const { canvaEditHandler, canvaDeleteHandler } = this;
    const imageData = damData.filter((data) => !['mp4', 'mov'].includes(data.file_extension));
    const videoData = damData.filter((data) => ['mp4', 'mov'].includes(data.file_extension));
    return (
      <div className="d-flex">
        {imageData.map((damAsset, index) => (
          <div
            key={index}
            className="item_dam_assets justify-content-start mt-18px me-18px mb-12px"
          >
            <div className="position-relative m-2 group-bg-img-thumbnail">
              <div>
                <span
                  className={`group-cursor-pointer bg-white position-absolute rounded-circle text-center`}
                >
                  <span
                    className="cursor-pointer text-red-1"
                    onClick={() => deleteDamItem(damAsset.id)}
                  >
                    <i>
                      <FontAwesomeIcon icon={faTimes} />
                    </i>
                  </span>
                </span>
              </div>
              <ComponentImage
                className={`imgTab object-fit-contain bg-white rounded-3 ${
                  damAsset?.file_extension === 'pdf' ? 'default-pdf' : ''
                }`}
                width={100}
                height={100}
                alt={damAsset?.url ?? damAsset?.download_url}
                src={
                  damAsset?.file_extension === 'pdf'
                    ? '/assets/images/default_digital_asset.svg'
                    : damAsset?.url ?? damAsset?.download_url
                }
              ></ComponentImage>
            </div>
          </div>
        ))}

        {videoData && (
          <div>
            {videoData.map((value, index) => {
              return (
                <div key={index} className="justify-content-start mt-4 me-18px">
                  <div className="position-relative m-2 w-260">
                    <div>
                      <span className="fa-pull-right">
                        <span
                          className="cursor-pointer text-red-1"
                          onClick={() => deleteDamItem(value.id)}
                        >
                          <i>
                            <FontAwesomeIcon icon={faTimes} />
                          </i>
                        </span>
                      </span>
                    </div>
                    <video width="260" controls>
                      <source src={value?.url ?? value?.download_url} type="video/mp4" />
                      <source src={value?.url ?? value?.download_url} type="video/mov" />
                      This vide does not support this video.
                    </video>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default MediaDataRender;
