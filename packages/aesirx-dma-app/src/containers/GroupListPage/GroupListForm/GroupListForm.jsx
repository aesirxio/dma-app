/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import SimpleReactValidator from 'simple-react-validator';

import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { GROUP_FIELD_KEY } from '../../../constants/GroupModule';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withTranslation } from 'react-i18next';
import { Spinner } from 'aesirx-uikit';
import { renderingGroupFieldHandler } from '../../../utils/form';

class GroupListForm extends Component {
  formPropsData = {
    [GROUP_FIELD_KEY.NAME]: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.viewModel = this.props.viewModel;

    this.viewModel.setForm(this);
  }

  generateFormSetting = () => {
    const { t } = this.props;
    return [
      {
        fields: [
          {
            label: t('txt_group_name'),
            key: GROUP_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[GROUP_FIELD_KEY.NAME],
            required: true,
            validation: 'required',
            changed: (event) => {
              this.formPropsData[GROUP_FIELD_KEY.NAME] = event.target.value;
            },
            blurred: () => {
              if (!this.viewModel.editMode) {
                this.validator.showMessageFor('Group Name');
              }
            },
          },
        ],
      },
    ];
  };

  // populatingFormDataHandler = (data) => {
  //   if (!data) return false;

  //   this.formPropsData[GROUP_FIELD_KEY.NAME] = data.getName().value;
  // };

  // onDrop = (files) => {
  //   this.setState({ files });
  // };

  render() {
    const { formStatus, groupEditdata, editMode } = this.viewModel;

    // if (editMode) {
    //   this.populatingFormDataHandler(groupEditdata);
    // }

    // if (formStatus === PAGE_STATUS.LOADING) {
    //   return <Spinner />;
    // }

    // const formSetting = this.generateFormSetting();

    // return (
    //   <>
    //     {/* {Object.keys(formSetting)
    //       .map((groupIndex) => {
    //         return [...Array(formSetting[groupIndex])].map((group) => {
    //           return renderingGroupFieldHandler(group, this.props.validator);
    //         });
    //       })
    //       .reduce((arr, el) => {
    //         return arr.concat(el);
    //       }, [])} */}
    //   </>
    // );
  }
}

export default withTranslation()(GroupListForm);
