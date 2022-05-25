import React from 'react';
import { SignUpViewModelContextProvider } from './SignUpViewModel/SignUpViewModelContextProvider';
import BannerLeft from '../../components/BannerLeft';
import TitleAccount from '../../components/TitlePageAccount';
import Social from '../../components/Social';
import Line from '../../components/Line';
import { withTranslation } from 'react-i18next';
import { SliderData } from './SliderData';
import SignUpStore from './SignUpStore/SignUpStore';
import SignUpViewModel from './SignUpViewModel/SignUpViewModel';
import SignUpForm from './SignUpForm/SignUpForm';

const signupStore = new SignUpStore();
const signupViewModel = new SignUpViewModel(signupStore);

class SignUp extends React.Component {
  render() {
    const { t, i18n } = this.props;
    return (
      <SignUpViewModelContextProvider viewModel={signupViewModel}>
        <div className="row">
          <BannerLeft dataSlider={SliderData} />
          <div className="col-md-8 d-flex flex-column justify-content-center align-items-center ">
            <div className="d-block">
              <Social />
              <Line text={t('txt_or_register_with')} />
              <SignUpForm t={t} />
            </div>
          </div>
        </div>
      </SignUpViewModelContextProvider>
    );
  }
}

export default withTranslation('common')(SignUp);
