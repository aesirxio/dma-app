/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Form } from 'react-bootstrap';

import Checkbox from '../../Checkbox';
import FormDateRangePicker from '../../Form/FormDateRangePicker';
import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { CONTENT_FIELD_KEY } from '../../../constants/ContentModule';

import SelectComponent from '../../../components/Select';
import DatePickerDay from '../DatePickerDay';
import DatePickerTime from '../DatePickerTime';

import '../index.scss';

class ItemSchedule extends Component {
  render() {
    let { startDateTime, timeDate, handlChangeDay, handlChangeTime } = this.props;

    // let fieldDateRange = {
    //   type: FORM_FIELD_TYPE.DATERANGE,
    //   startField: {
    //     label: 'Date from',
    //     key: CONTENT_FIELD_KEY.START_DATE,
    //     value: this.formPropsData[CONTENT_FIELD_KEY.START_DATE],
    //     changed: (date) => {
    //       this.formPropsData[CONTENT_FIELD_KEY.START_DATE] = date;
    //     },
    //   },
    //   endField: {
    //     label: 'Date until',
    //     key: CONTENT_FIELD_KEY.END_DATE,
    //     value: this.formPropsData[CONTENT_FIELD_KEY.END_DATE],
    //     changed: (date) => {
    //       this.formPropsData[CONTENT_FIELD_KEY.END_DATE] = date;
    //     },
    //   },
    // };

    return (
      <>
        <div className="">
          <p className="mb-2">Publish date/time</p>
          <div className="d-flex mb-3">
            <div className="item w-50">
              <DatePickerDay startDateTime={startDateTime} handlChangeDay={handlChangeDay} />
            </div>
            <div className="item w-50">
              <DatePickerTime timeDate={timeDate} handlChangeTime={handlChangeTime} />
            </div>
          </div>
          {/* {regularly && (
            <>
              <div className="mb-3">
                <Checkbox
                  text="Publish regularly"
                  checked={publish}
                  onCheckBoxChange={handleOnCheckBoxChange}
                />
              </div>
              <div className="wr_form_gr_date d-flex align-items-center mb-3">
                <FormDateRangePicker key={Math.random(40, 200)} field={fieldDateRange} />
                <Form.Group key={Math.random(40, 200)}>
                  <Form.Label className="mb-3 w-100">Time</Form.Label>
                  <DatePickerTime field={timeDateRange} />
                </Form.Group>
              </div>
              <div className="w-50 d-flex align-items-center">
                <SelectComponent
                  name="numbers"
                  onChange={this.handleSelect}
                  options={numbers}
                  className="text-green bg-white w-50"
                  isBorder={true}
                  plColor="rgba(8, 18, 64, 0.8)"
                />
                <SelectComponent
                  name="days"
                  onChange={this.handleSelect}
                  options={days}
                  className="text-green bg-white w-50"
                  isBorder={true}
                  plColor="rgba(8, 18, 64, 0.8)"
                  placeholder="Days"
                />
              </div>
            </>
          )} */}
        </div>
      </>
    );
  }
}

export default ItemSchedule;
