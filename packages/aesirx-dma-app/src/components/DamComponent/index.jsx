import React, { useState } from 'react';
import { Image as ComponentImage, ModalDAMComponent } from 'aesirx-uikit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

function ImageDamComponent({
  field,
  allowType = ['image'],
  children,
  damType = '',
  accept = { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
}) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [defaultValue] = useState(field.value);
  const [validate, setValidate] = useState(false);

  const onSelect = (data) => {
    if (allowType.includes(data[0].type)) {
      setFile(data[0]);
      field.changed(data);
      setValidate(false);
    } else {
      setValidate(true);
    }
    setShow(false);
  };
  return (
    <>
      <ModalDAMComponent
        show={show}
        onHide={() => setShow(false)}
        onSelect={onSelect}
        type={damType}
        accept={accept}
      /> 
      {children ? (
        <div onClick={() => setShow(true)}>{children}</div>
      ) : (
        <>
          <div className="cursor-pointer position-relative p-1 border-da-1">
            {file ? (
              <>
                <ComponentImage
                  onClick={() => setShow(true)}
                  src={file?.download_url}
                  alt={file?.basename}
                />
                <i
                  className="position-absolute pt-2 pe-2 end-0 text-danger"
                  onClick={() => {
                    setFile(null);
                    setValidate(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </i>
              </>
            ) : defaultValue ? (
              <ComponentImage onClick={() => setShow(true)} src={defaultValue} alt={defaultValue} />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center py-4"
                onClick={() => setShow(true)}
              >
                <FontAwesomeIcon className="fs-1 opacity-75" icon={faCloudUploadAlt} />
                <p className="ms-3 mb-0 fw-semibold">Choose File</p>
              </div>
            )}
          </div>
          {validate && (
            <>
              <p className="mt-2 mb-1 text-danger">Supported .jpg/png/jpeg only</p>
              <p className="text-danger">And please choose file without space in name</p>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ImageDamComponent;
