/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import SelectComponent from '../Select';

let data = [
  {
    name: 'Organisation',
    option: [
      { value: 'organisation1', label: 'Organisation 1' },
      { value: 'organisation2', label: 'Organisation 2' },
      { value: 'organisation3', label: 'Organisation 3' },
    ],
  },
  {
    name: 'txt_title_projects',
    option: [
      { value: 'projects1', label: 'Projects 1' },
      { value: 'projects2', label: 'Projects 2' },
      { value: 'projects3', label: 'Projects 3' },
    ],
  },
  {
    name: 'txt_campaign_name',
    option: [
      { value: 'campaigns1', label: 'Campaigns 1' },
      { value: 'campaigns2', label: 'Campaigns 2' },
      { value: 'campaigns3', label: 'Campaigns 3' },
    ],
  },
  {
    name: 'Content Type',
    option: [
      { value: 'contentType1', label: 'Content Type 1' },
      { value: 'contentType2', label: 'Content Type 2' },
      { value: 'contentType3', label: 'Content Type 3' },
    ],
  },
  {
    name: 'Status',
    option: [
      { value: 'status1', label: 'Status 1' },
      { value: 'status2', label: 'Status 2' },
      { value: 'status3', label: 'Status 3' },
    ],
  },
  {
    name: 'Assigness',
    option: [
      { value: 'assigness1', label: 'Assigness 1' },
      { value: 'assigness2', label: 'Assigness 2' },
      { value: 'assigness3', label: 'Assigness 3' },
    ],
  },
];

class ComponentFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueOption: '',
    };
  }

  handleSelect = (events, name, isMulti) => {
    name = name + '[]';
    let values = null;
    let filter_values = null;
    if (events) {
      if (isMulti === true) {
        values = events.map((e) => {
          return { label: e.label, value: e.value };
        });
        filter_values = events.map((e) => {
          return e.value;
        });
      } else {
        values = { label: events.label, value: events.value };
        filter_values = events.value;
      }
    }

    this.props.setFilter({ ...this.props.titleFilter, [name]: values }, 3);
    this.setState({
      valueOption: values,
    });

    this.props.setGlobalFilter({
      [name]: filter_values,
    });
  };

  render() {
    data = this.props.dataFormFilter.length > 0 ? this.props.dataFormFilter : data;
    const { t } = this.props;
    return (
      <div className="d-flex">
        {data.map((item, key) => {
          return (
            <div key={key} className="flex-1 px-1">
              <SelectComponent
                placeholder={t(item.name)}
                name={item.name}
                onChange={(e) => this.handleSelect(e, item.name, item.isMulti, item.type)}
                options={item.option}
                className="text-danger bg-white rounded-2 text-capitalize"
                isBorder={true}
                plColor="rgba(8, 18, 64, 0.8)"
                isMulti={item.isMulti}
                isClearable={true}
                value={this.props.filter?.titleFilter[`${item.name}[]`]}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
export default withTranslation('common')(ComponentFilter);
