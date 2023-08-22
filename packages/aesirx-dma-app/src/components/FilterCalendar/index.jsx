/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import styles from './index.module.scss';
import { Checkbox } from 'aesirx-uikit';

class FilterCalendar extends React.Component {
  data = [];
  dataFilter = {
    'projects[]': [],
    'campaigns[]': [],
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.filterRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
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
      if (this.dataFilter[name].length == this.data[index].listCheck.length) {
        this.dataFilter[name] = [];
      } else {
        this.data[index].listCheck.forEach((item) => {
          if (!this.dataFilter[name].includes(item.value)) {
            this.dataFilter[name].push(item.value);
          }
        });
      }
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
  handleClearAll = () => {
    this.data.forEach((value) => {
      this.dataFilter[value.name] = [];
    });

    this.setState(this.dataFilter);
    this.onFilter();
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

  handleClickOutside = (event) => {
    if (!this.props.show) return null;
    if (this.filterRef.current && !this.filterRef.current.contains(event.target)) {
      this.props.handleCloseFilterCalendar();
    }
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
        <div className="bg-filter w-450 h-100 px-5" ref={this.filterRef}>
          <div className="d-flex align-items-center justify-content-between px-3 pb-3 pt-4">
            <h4 className="text-body fw-medium mb-0 fs-24">{t('txt_filter')}</h4>
            <span className="cursor-pointer text-body" onClick={() => this.handleClearAll()}>
              <i>
                <FontAwesomeIcon icon={faTimes} width={24} height={24} className="pe-2 fs-24" />
              </i>
            </span>
          </div>
          <div
            className={`main_filter_calendar ${styles.main_filter_calendar} overflow-hidden overflow-y-auto`}
          >
            {this.data.map((value, key) => {
              return (
                <div key={key} className="pt-3 py-4">
                  <div className="d-flex align-items-center justify-content-between mb-3 bg-body p-3 rounded-2">
                    <p className="text-body mb-0 text-uppercase">{t(value.title)}</p>
                    <span
                      className="cursor-pointer fs-sm fw-normal text-green text-decoration-underline "
                      onClick={() => this.handleSelectAll(value.name, key)}
                    >
                      {this.data[key].listCheck.length == this.dataFilter[value.name].length
                        ? t('txt_clear_all')
                        : t('txt_select_all')}
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
                            name={`${key}-${index}`}
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
          <div className="px-2 pt-4 pb-3">
            <Button
              onClick={this.onFilter}
              className="btn btn-outline-secondary border text-body w-45 me-2 py-2"
            >
              <span className="text-center">{t('txt_clear_all')}</span>
            </Button>
            <Button onClick={this.onFilter} className="btn btn-success w-45 ms-2 py-2">
              <span className="text-center">{t('txt_apply')}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(FilterCalendar);
