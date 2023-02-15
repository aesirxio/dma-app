/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Form } from 'react-bootstrap';
import Label from '../Form/Label';

import { PERSONA_FIELD_KEY } from '../../constants/PersonaModule';
import SelectComponent from '../Select';
import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';

const ComponentLocations = ({
  formPropsData,
  getDataSelectOptions,
  getDataSelectOptionsAge,
  viewModel,
  getAge,
}) => {
  const handleOnchange = () => {};

  const handleOnchangeAge = (name) => {
    viewModel.getAge = name;
    formPropsData[PERSONA_FIELD_KEY.AGE] = name;
  };

  return (
    <div>
      <Form.Group key={Math.random(40, 200)} className="mb-4">
        <Label text={'Locations'} required={false} />
        <SelectComponent
          options={getDataSelectOptions}
          className="mb-3 text-danger"
          isBorder={true}
          plColor="rgba(8, 18, 64, 0.8)"
        />
        <div className="bg-gray-2 p-3 rounded-2 border-1">
          <p>Viet nam</p>
          <div className="mb-2 d-flex align-items-center position-relative">
            <i className="text-green position-absolute top-0 start-0 bottom-0 d-flex align-items-center ms-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </i>
            <Form.Control
              as="input"
              defaultValue={formPropsData[PERSONA_FIELD_KEY.LOCATION]}
              id={PERSONA_FIELD_KEY.LOCATION}
              onChange={handleOnchange}
              className="border-0 ps-4"
            />
          </div>
          <div>
            <Form.Control
              as="input"
              defaultValue={formPropsData[PERSONA_FIELD_KEY.LOCATION]}
              id={PERSONA_FIELD_KEY.LOCATION}
              onChange={handleOnchange}
              className="border-0"
            />
          </div>
        </div>
      </Form.Group>
      <Form.Group key={Math.random(40, 200)} className="mb-4">
        <Label text={'Age'} required={false} />
        <div className="d-flex align-items-center">
          <SelectComponent
            options={getDataSelectOptionsAge}
            className="text-green w-110 mb-0"
            isBorder={true}
            plColor="rgba(8, 18, 64, 0.8)"
          />
          <span className="px-2">-</span>
          <SelectComponent
            options={getDataSelectOptionsAge}
            className="text-green w-110 mb-0"
            isBorder={true}
            plColor="rgba(8, 18, 64, 0.8)"
          />
        </div>
      </Form.Group>
      <Form.Group key={Math.random(40, 200)} className="mb-4">
        <Label text={'Gender'} required={false} />
        <div className="d-flex">
          <span
            style={{ cursor: 'pointer' }}
            className={`w-80 btn_gender border-1 bg-transparent cursor-pointer d-flex align-items-center justify-content-center ${
              getAge === 'all' ? 'active' : ''
            }`}
            onClick={() => handleOnchangeAge('all')}
          >
            All
          </span>
          <span
            style={{ cursor: 'pointer' }}
            className={`w-80 btn_gender border-1 bg-transparent cursor-pointer d-flex align-items-center justify-content-center ${
              getAge === 'men' ? 'active' : ''
            }`}
            onClick={() => handleOnchangeAge('men')}
          >
            Men
          </span>
          <span
            style={{ cursor: 'pointer' }}
            className={`w-80 btn_gender border-1 bg-transparent cursor-pointer d-flex align-items-center justify-content-center ${
              getAge === 'women' ? 'active' : ''
            }`}
            onClick={() => handleOnchangeAge('women')}
          >
            Women
          </span>
        </div>
      </Form.Group>
    </div>
  );
};

export default ComponentLocations;
