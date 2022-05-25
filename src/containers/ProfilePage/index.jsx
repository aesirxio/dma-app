import React from 'react';
import UpdateGeneral from './UpdateGeneral';
import UpdatePassword from './UpdatePassword';
import { ProfileViewModelContextProvider } from './ProfileViewModel/ProfileViewModelContextProvider';
import ProfileStore from './ProfileStore/ProfileStore';
import ProfileViewModel from './ProfileViewModel/ProfileViewModel';

const profileStore = new ProfileStore();
const profileViewModel = new ProfileViewModel(profileStore);

class ProfilePage extends React.Component {
  render() {
    return (
      <ProfileViewModelContextProvider viewModel={profileViewModel}>
        <div className="py-4 px-3">
          <div className="w-80-percent">
            <h2 className="text-blue-0 mb-3">General Information</h2>
            <UpdateGeneral />

            <h2 className="text-blue-0 my-3">Password</h2>
            <UpdatePassword />
          </div>
        </div>
      </ProfileViewModelContextProvider>
    );
  }
}

export default ProfilePage;
