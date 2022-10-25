/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';

import styles from './index.module.scss';
import Checkbox from '../Checkbox';

class FilterCalendar extends React.Component {
  data = [];
  dataFilter = {
    'projects[]': [],
    'campaigns[]': [],
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCheck = (name, value, checkall = false, index) => {
    // this.data.forEach((value) => {
    //   value.listCheck = value.listCheck.map((item) => ({
    //     ...item,
    //     // checked: item.name === name ? item.checked = !item.checked : item.checked,
    //     // checked: item.groupName === name ? item.checked = true : item.checked
    //   }));
    // });
    // this.setState({
    //   data: this.data,
    // });
    if (checkall) {
      this.data[index].listCheck.forEach((item) => {
        this.dataFilter[name].push(item.value);
      });
    } else {
      if (this.dataFilter[name].includes(value)) {
        const index = this.dataFilter[name].indexOf(value);
        if (index > -1) {
          this.dataFilter[name].splice(index, 1);
        }
      } else {
        this.dataFilter[name].push(value);
      }
    }
    this.setState(this.dataFilter);
  };

  onCheckBoxChange = (name, value) => {
    this.handleCheck(name, value);
  };

  handleSelectAll = (name, index) => {
    this.handleCheck(name, null, true, index);
  };

  isCheck = (name, value) => {
    if (name && value && this.state[name]?.includes(value)) {
      return true;
    } else return false;
  };
  onFilter = () => {
    this.props.listViewModel.searchContents(this.dataFilter, 0, 0);
    this.props.handleCloseFilterCalendar();
  };

  render() {
    this.data = [
      {
        id: 1,
        title: 'txt_menu_projects',
        name: 'projects[]',
        listCheck: this.props.filterFormViewModel.projectMasterData,
      },
      {
        id: 2,
        title: 'txt_menu_campaigns',
        name: 'campaigns[]',
        listCheck: this.props.filterFormViewModel.campaignMasterData,
      },
    ];
    const { t } = this.props;
    if (!this.props.show && this.props.filterFormViewModel) {
      return null;
    }
    return (
      <div
        className={`wrapper_filter_calendar ${styles.wrapper_filter_calendar} position-fixed top-0 end-0 bottom-0 z-index-100 start-0 d-flex justify-content-end vh-100`}
      >
        <div className="bg-white w-400 h-100">
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom-1">
            <h4 className="text-blue-0 fw-medium">{t('txt_filter')}</h4>
            <span
              className="cursor-pointer text-danger"
              onClick={this.props.handleCloseFilterCalendar}
            >
              <i>
                <FontAwesomeIcon icon={faTimes} />
              </i>
              <span className="ms-2">{t('txt_clear_all')}</span>
            </span>
          </div>
          <div
            className={`main_filter_calendar ${styles.main_filter_calendar} overflow-hidden overflow-y-auto`}
          >
            {this.data.map((value, key) => {
              return (
                <div key={key} className="border-bottom-1 p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="text-blue-0 mb-0 text-uppercase">{t(value.title)}</p>
                    <span
                      className="cursor-pointer fs-14 text-color opacity-50"
                      onClick={() => this.handleSelectAll(value.name, key)}
                    >
                      {t('txt_select_all')}
                    </span>
                  </div>
                  <div>
                    {value.listCheck.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`item_check_list ${styles.item_check_list} mb-3`}
                        >
                          <Checkbox
                            text={item?.label}
                            checked={this.isCheck(value.name, item?.value)}
                            onCheckBoxChange={() => this.onCheckBoxChange(value?.name, item.value)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-3 pt-4 pb-3">
            <Button onClick={this.onFilter} className="btn btn-success w-100">
              <i>
                <FontAwesomeIcon icon={faFilter} />
              </i>
              <span className="ms-2">{t('txt_filter')}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(FilterCalendar);
