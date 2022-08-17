import React from 'react';
import './index.scss';
import listThemes from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { ThemesContext } from 'themes/ThemeContextProvider';

class SwitchThemes extends React.Component {
  render() {
    const { theme, changeTheme } = this.context;
    return (
      <div className="theme-icon rounded-pill position-relative cursor-pointer border">
        <FontAwesomeIcon
          className="text-dark align-bottom"
          icon={faPalette}
          width={16}
          height={16}
        />
        <div className="theme-icon-list position-absolute bottom-100 start-50 py-1 rounded-3 px-2 translate-middle-x d-flex flex-column-reverse shadow">
          {Object.keys(listThemes)
            .slice(0, 5)
            .map((item, index) => {
              return (
                <button
                  key={index}
                  title={item + ' theme'}
                  disabled={theme === item}
                  className={listThemes[item] + ' box-color m-0 my-1 cursor-pointer btn p-0'}
                  onClick={() => changeTheme(item)}
                ></button>
              );
            })}
        </div>
      </div>
    );
  }
}
SwitchThemes.contextType = ThemesContext;
export default SwitchThemes;
