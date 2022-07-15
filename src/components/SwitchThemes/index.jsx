import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import './index.scss';
import { ThemesContext } from 'themes/ThemeContextProvider';

class SwitchThemes extends React.Component {
  render() {
    const { theme, changeTheme } = this.context;
    return (
      <div
        onClick={() => changeTheme(theme == 'light' ? 'dark' : 'light')}
        className="switch-button shadow-sm cursor-pointer text-white d-flex align-items-center position-relative bg-primary p-2 rounded-pill"
      >
        <FontAwesomeIcon icon={faMoon} />
        <FontAwesomeIcon className="ms-3 text-warning" icon={faSun} />
        <div className={(theme == 'dark' ? 'active' : '') + ' switch-button-ball'}></div>
      </div>
    );
  }
}
SwitchThemes.contextType = ThemesContext;
export default SwitchThemes;
