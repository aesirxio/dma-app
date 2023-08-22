/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { Component } from 'react';

class ComponentViewList extends Component {
  listViewModel = null;
  formModalViewModal = null;
  filterFormViewModel = null;
  formViewModel = null;
  contentData = null;
  key = null;
  view = null;

  constructor(props) {
    super(props);

    const { viewModel } = props;
    this.listViewModel = viewModel ? viewModel.getListViewModel() : null;

    if (typeof viewModel.getFormModalViewModel === 'function') {
      this.formModalViewModal = viewModel ? viewModel.getFormModalViewModel() : null;
    }

    if (typeof viewModel.getFormViewModel === 'function') {
      this.formViewModel = viewModel ? viewModel.getFormViewModel() : null;
    }

    if (typeof viewModel.getFilterFormViewModel === 'function') {
      this.filterFormViewModel = viewModel ? viewModel.getFilterFormViewModel() : null;
    }
  }

  componentDidMount() {
    this.listViewModel.initializeData();
    if (this.filterFormViewModel) {
      this.filterFormViewModel.initData();
    }
  }

  componentWillUnmount() {
    this.listViewModel.resetObservableProperties();
  }

  handleEdit = (e, row, page) => {
    this.formModalViewModal.loadForm(row[this.key], page);
  };

  handleSelect = (data) => {
    // console.warn(this.listViewModel[`${this.view}IdsSelected`]);
    this.listViewModel[`${this.view}IdsSelected`] = data
      .map((item) => {
        return item[this.key];
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };
  handleExpanded = (e, row) => {
    this.listViewModel.getContentByIdExpanded(row[this.key]);
  };

  _handleList = () => {
    this.listViewModel.isList = !this.listViewModel.isList;
  };
}

export default ComponentViewList;
