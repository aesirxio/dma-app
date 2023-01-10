import React from 'react';
import './index.scss';

import { withThemeContext } from 'themes/ThemeContextProvider';
import ThemeMode from 'SVG/ThemeMode';

class SwitchThemes extends React.Component {
  render() {
    const { theme, changeTheme } = this.props;
    return (
      <div className=" position-relative cursor-pointer">
        <ThemeMode fill={theme.color} onClick={() => changeTheme(theme)} />
      </div>
    );
  }
}

export default withThemeContext(SwitchThemes);
