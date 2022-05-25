import { SIGNUP_FIELD_KEY } from '../../../constants/SignUpModule';
import FIELD_TYPE from '../../../constants/FieldType';

class SignUpModel {
  constructor(data) {
    this.username = data[SIGNUP_FIELD_KEY.USERNAME] ?? '';
    this.email = data[SIGNUP_FIELD_KEY.EMAIL] ?? '';
    this.password = data[SIGNUP_FIELD_KEY.PASSWORD] ?? '';
  }

  getUsername = () => {
    return {
      value: this.username ?? 0,
      type: FIELD_TYPE.TEXT,
      columnName: SIGNUP_FIELD_KEY.USERNAME,
      columnText: 'Username',
    };
  };
  getEmail = () => {
    return {
      value: this.email ?? 0,
      type: FIELD_TYPE.TEXT,
      columnName: SIGNUP_FIELD_KEY.EMAIL,
      columnText: 'Email',
    };
  };
  getPassword = () => {
    return {
      value: this.username ?? 0,
      type: FIELD_TYPE.TEXT,
      columnName: SIGNUP_FIELD_KEY.PASSWORD,
      columnText: 'Password',
    };
  };

  toTableRowData = () => {
    const username = this.getUsername(),
      email = this.getEmail(),
      password = this.getPassword();

    return {
      [username.columnName]: username.value,
      [email.columnName]: email.value,
      [password.columnName]: password.value,
    };
  };

  static convertSubmittedDataToAPIService(signUpData) {
    return signUpData
      ? {
          [SIGNUP_FIELD_KEY.USERNAME]: signUpData[SIGNUP_FIELD_KEY.USERNAME],
          [SIGNUP_FIELD_KEY.EMAIL]: signUpData[SIGNUP_FIELD_KEY.EMAIL],
          [SIGNUP_FIELD_KEY.PASSWORD]: signUpData[SIGNUP_FIELD_KEY.PASSWORD],
          [SIGNUP_FIELD_KEY.TIMEZONE_DEFAULT]: signUpData[SIGNUP_FIELD_KEY.TIMEZONE_DEFAULT],
        }
      : null;
  }
}

export default SignUpModel;
