/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from 'react';
import { canvaApi } from '../../utils/canva';
import './index.scss';

class CanvaButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps.bind(this);
  }

  canvaEditHandler = ({index, id, designId}) => {
    console.log("Editing...")
    canvaApi.editDesign({
      design: {
        id: designId,
      },
      onDesignOpen: (opts) => {
        console.log(opts.designId);
      },
      onDesignPublish: (opts) => {
        this.props.canvaEditItem(index, id, opts);
      },
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);

  }

  render() {
    console.log('[CanvaButton] render');
    console.log('[CanvaButton canvaApi] ', canvaApi);

    return (
      <>
        <button
          className="canva-btn canva-btn-theme-default canva-btn-size-m"
          onClick={this.handleClick}
          type="button"
        >
          <span className="canva-btn-i"/>
          Design on Canva
        </button>
      </>
    );
  }
}

export default CanvaButton;
