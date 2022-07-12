/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import UpdateGeneral from './UpdateGeneral';
import UpdatePassword from './UpdatePassword';
import { ProfileViewModelContextProvider } from './ProfileViewModel/ProfileViewModelContextProvider';
import ProfileStore from './ProfileStore/ProfileStore';
import ProfileViewModel from './ProfileViewModel/ProfileViewModel';
import { withTranslation } from 'react-i18next';

const profileStore = new ProfileStore();
const profileViewModel = new ProfileViewModel(profileStore);

class ProfilePage extends React.Component {
  render() {
    const {t}= this.props;
    return (
      <ProfileViewModelContextProvider viewModel={profileViewModel}>
        <div className="py-4 px-3">
          <div className="w-80-percent">
            <h2 className="text-blue-0 mb-3">{t("txt_general_information")}</h2>
            <UpdateGeneral />

            <h2 className="text-blue-0 my-3">{t("txt_projectpage_password")}</h2>
            <UpdatePassword />
          </div>
        </div>
      </ProfileViewModelContextProvider>
    );
  }
}

export default withTranslation('common')(ProfilePage);
