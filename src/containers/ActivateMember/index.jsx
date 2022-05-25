import React from 'react';
import {ActivateMemberViewModelContextProvider} from './ActivateMemberViewModel/ActivateMemberContextProvider';
import ActivateMemberStore from './ActivateMemberStore/ActivateMemberStore';
import ActivateMemberViewModel from './ActivateMemberViewModel/ActivateMemberViewModel';
import ActivateMemberLoading from './ActivateMemberLoading';
const activateMemberStore = new ActivateMemberStore();
const activateMemberViewModel = new ActivateMemberViewModel(activateMemberStore);

class ActivateMember extends React.Component {
  render() {
    return (
      <ActivateMemberViewModelContextProvider viewModel={activateMemberViewModel}>
        <ActivateMemberLoading location={this.props.location}/>
      </ActivateMemberViewModelContextProvider>
    );
  }
}

export default ActivateMember;
