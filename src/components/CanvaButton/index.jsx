/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { notify } from 'components/Toast';
import { withTranslation } from 'react-i18next';
import { canvaApi } from '../../utils/canva';
import './index.scss';
import { env } from 'env';

class CanvaButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps.bind(this);

    if (env.REACT_APP_CANVA_API_KEY === undefined) {
      const { t } = this.props;

      notify(t('txt_canva_api_key_warning'), 'warn');
    }
  }

  canvaEditHandler = ({ index, id, designId }) => {
    canvaApi.editDesign({
      design: {
        id: designId,
      },
      onDesignOpen: () => {},
      onDesignPublish: (opts) => {
        this.props.canvaEditItem(index, id, opts);
      },
    });
  };

  componentWillReceiveProps(nextProps) {
    console.error(nextProps);
    if (nextProps.canvaIndexToEdit !== null) {
      this.canvaEditHandler(nextProps.canvaIndexToEdit);
    }
  }

  handleClick = () => {
    const _this = this;

    canvaApi.createDesign({
      design: {
        type: 'Poster',
      },
      onDesignPublish: function ({ exportUrl, designId }) {
        _this.props.changed(exportUrl, designId);
      },
    });
  };

  render() {
    return (
      <>
        <button
          className="canva-btn canva-btn-theme-default canva-btn-size-m"
          onClick={this.handleClick}
          type="button"
        >
          <span className="canva-btn-i" />
          Design on Canva
        </button>
      </>
    );
  }
}

export default withTranslation('common')(CanvaButton);
