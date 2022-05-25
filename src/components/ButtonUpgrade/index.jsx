import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

class ButtonUpgrade extends React.Component {
  render() {
    return (
      <>
        <div>
          <a href="/billing-plan" className="link_upgrade btn btn-warning w-100">
            <i>
              <FontAwesomeIcon icon={faCog} />
            </i>
            <span className="ms-2">Upgrade</span>
          </a>
        </div>
      </>
    );
  }
}

export default ButtonUpgrade;
