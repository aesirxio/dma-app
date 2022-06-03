/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import ComponentImage from '../../ComponentImage';

const FormImage = ({ field }) => {
  const [file, setFile] = useState(field.value);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <div className="position-relative cursor-pointer">
      <div {...getRootProps()} className="d-flex align-items-center justify-content-center p-3">
        <input {...getInputProps()} className="position-absolute start-0 top-0 bottom-0 end-0" />
        <div className="d-flex align-items-center p-3">
          <i className="fs-1 text-blue-0 opacity-25">
            <FontAwesomeIcon icon={faCloudUploadAlt} />
          </i>
          <div className="text-center ms-1">
            {/* <p className="mb-0">Drag and drop a file here </p> */}
            <p className="mb-0 ms-2">
              <strong>Choose file</strong>
            </p>
          </div>
        </div>
      </div>
      <div key={field.value} className="text-center">
        <ComponentImage src={file} alt={field.value} />
      </div>
    </div>
  );
};

export default FormImage;
