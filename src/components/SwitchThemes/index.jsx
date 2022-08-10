import React from 'react';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { ThemesContext } from 'themes/ThemeContextProvider';

class SwitchThemes extends React.Component {
  render() {
    const { theme, changeTheme } = this.context;
    return (
      <button
        onClick={() => changeTheme(theme == 'light' ? 'dark' : 'light')}
        className={`${styles['theme-icon']} btn btn-light rounded-pill p-0`}
      >
        <FontAwesomeIcon icon={faMoon} width={16} height={16} />
      </button>
    );
  }
}
SwitchThemes.contextType = ThemesContext;
export default SwitchThemes;
