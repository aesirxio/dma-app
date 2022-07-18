import React from 'react';
import './index.scss';
import { ThemesContext } from 'themes/ThemeContextProvider';

class SwitchThemes extends React.Component {
  render() {
    const listColor = ['light', 'dark'];
    const { changeTheme } = this.context;
    return (
      <div className="d-flex bg-gray py-1">
        {listColor.map((color, index) => {
          return (
            <div
              key={index}
              onClick={() => changeTheme(color)}
              className={`box-color ${color}`}
            ></div>
          );
        })}
      </div>
    );
  }
}
SwitchThemes.contextType = ThemesContext;
export default SwitchThemes;
