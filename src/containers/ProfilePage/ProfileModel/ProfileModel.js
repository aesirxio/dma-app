import {
  UPDATE_PASSWORD_FIELD_KEY,
  UPDATE_GENERAL_FIELD_KEY,
} from '../../../constants/ProfileModule';

class ProfileModel {
  static convertSubmittedPasswordDataToAPIService(updatePasswordData) {
    return updatePasswordData
      ? {
          [UPDATE_PASSWORD_FIELD_KEY.ID]: updatePasswordData[UPDATE_PASSWORD_FIELD_KEY.ID],
          [UPDATE_PASSWORD_FIELD_KEY.CURR_PASSWORD]:
            updatePasswordData[UPDATE_PASSWORD_FIELD_KEY.CURR_PASSWORD],
          [UPDATE_PASSWORD_FIELD_KEY.NEW_PASSWORD]:
            updatePasswordData[UPDATE_PASSWORD_FIELD_KEY.NEW_PASSWORD],
          [UPDATE_PASSWORD_FIELD_KEY.NEW_PASSWORD]:
            updatePasswordData[UPDATE_PASSWORD_FIELD_KEY.NEW_PASSWORD],
        }
      : null;
  }

  static convertSubmittedGeneralDataToAPIService(updateGeneralData) {
    return updateGeneralData
      ? {
          [UPDATE_GENERAL_FIELD_KEY.ID]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.ID],
          [UPDATE_GENERAL_FIELD_KEY.FULLNAME]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.FULLNAME],
          [UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM]:
            updateGeneralData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM],
          [UPDATE_GENERAL_FIELD_KEY.BIRTHDAY]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.BIRTHDAY],
          [UPDATE_GENERAL_FIELD_KEY.PHONE]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.PHONE],
          [UPDATE_GENERAL_FIELD_KEY.ADDRESS]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.ADDRESS],
          [UPDATE_GENERAL_FIELD_KEY.ADDRESS_2]:
            updateGeneralData[UPDATE_GENERAL_FIELD_KEY.ADDRESS_2],
          [UPDATE_GENERAL_FIELD_KEY.ZIPCODE]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.ZIPCODE],
          [UPDATE_GENERAL_FIELD_KEY.CITY]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.CITY],
          [UPDATE_GENERAL_FIELD_KEY.STATE]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.STATE],
          [UPDATE_GENERAL_FIELD_KEY.COUNTRY]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.COUNTRY],
          [UPDATE_GENERAL_FIELD_KEY.TIMEZONE]: updateGeneralData[UPDATE_GENERAL_FIELD_KEY.TIMEZONE],
        }
      : null;
  }
}

export default ProfileModel;
