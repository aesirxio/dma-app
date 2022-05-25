import React from 'react';
import { observer } from 'mobx-react';
import { withActivateMemberViewModel } from '../ActivateMemberViewModel/ActivateMemberContextProvider';
import Spinner from '../../../components/Spinner';

const ActivateMemberLoading = observer(
  class ActivateMemberLoading extends React.Component {
    activateMemberLoadingViewModel = null;
    activationData = {
      'activation_code': '',
    };

    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.activateMemberLoadingViewModel = viewModel
        ? viewModel.getActivateMemberLoadingFormViewModel()
        : null;
      this.activateMemberLoadingViewModel.setValue(this);
    }

    activateMemberHandler = () => {
      this.activateMemberLoadingViewModel.activateMemberOnPage();
    };

    componentDidMount() {
      this.activationData = {
        'activation_code': this.props.location.search.slice(1),
      }
      this.activateMemberHandler();
    }

    render() {
      return (
        <Spinner />
      )
    }
  },
);

export default withActivateMemberViewModel(ActivateMemberLoading);