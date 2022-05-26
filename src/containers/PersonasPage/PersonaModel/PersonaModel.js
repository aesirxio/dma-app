/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import FIELD_TYPE from '../../../constants/FieldType';
import { FORMAT_DATE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY, ESI_PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import ChannelUtils from '../../ChannelsPage/ChannelUtils/ChannelUtils';

//import {ESI_PERSONA_FIELD_KEY} from 'aesirx-dma-lib';

import { format } from 'date-fns';
import Helper from '../../../utils/helper';

class PersonaModel {
  constructor(data) {
    console.log('PersonaModel2222', data);

    this.id = data[ESI_PERSONA_FIELD_KEY.ID] ?? 0;
    this.name = data[ESI_PERSONA_FIELD_KEY.NAME] ?? '';
    this.avatar_2 = data[ESI_PERSONA_FIELD_KEY.AVATAR_2]
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.AVATAR_2])
      : '';
    this.all_countries = data[ESI_PERSONA_FIELD_KEY.ALL_COUNTRIES] ?? '';
    this.age_from = data[ESI_PERSONA_FIELD_KEY.AGE_FROM] ?? 0;
    this.age_to = data[ESI_PERSONA_FIELD_KEY.AGE_TO] ?? 0;
    this.gender = data[ESI_PERSONA_FIELD_KEY.GENDER]
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.GENDER])
      : '';
    this.createdDate = data[ESI_PERSONA_FIELD_KEY.CREATED_DATE] ?? '';
    this.updatedDate = data[ESI_PERSONA_FIELD_KEY.MODIFIED_DATE] ?? '';
    this.channels = data[ESI_PERSONA_FIELD_KEY.CHANNEL]
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.CHANNEL])
      : '';
    this.demographics_type = data[ESI_PERSONA_FIELD_KEY.DEMOGRAPHICS_TYPE]
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.DEMOGRAPHICS_TYPE])
      : '';
    this.demographics_select = !Helper.isNull(data[ESI_PERSONA_FIELD_KEY.DEMOGRAPHICS_SELECT])
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.DEMOGRAPHICS_SELECT])
      : [];
    this.interests_type = data[ESI_PERSONA_FIELD_KEY.INTERESTS_TYPE]
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.INTERESTS_TYPE])
      : '';
    this.interests_select = !Helper.isNull(data[ESI_PERSONA_FIELD_KEY.INTERESTS_SELECT])
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.INTERESTS_SELECT])
      : [];
    this.behaviors_type = data[ESI_PERSONA_FIELD_KEY.BEHAVIORS_TYPE]
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.BEHAVIORS_TYPE])
      : '';
    this.behaviors_select = !Helper.isNull(data[ESI_PERSONA_FIELD_KEY.BEHAVIORS_SELECT])
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.BEHAVIORS_SELECT])
      : [];
    this.location = !Helper.isNull(data[ESI_PERSONA_FIELD_KEY.LOCATION])
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.LOCATION])
      : [];

    this.channels = data[ESI_PERSONA_FIELD_KEY.CHANNEL]
      ? JSON.parse(data[ESI_PERSONA_FIELD_KEY.CHANNEL])
      : [];
  }

  getId = () => {
    return {
      value: this.id ?? 0,
      type: FIELD_TYPE.READONLY,
      columnName: PERSONA_FIELD_KEY.ID,
      columnText: 'ID',
    };
  };

  getName = () => {
    return {
      value: this.name ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_FIELD_KEY.NAME,
      columnText: 'Name',
    };
  };

  getAvatar2 = () => {
    return {
      value: this.avatar_2 ?? '',
      type: FIELD_TYPE.IMAGE,
      columnName: PERSONA_FIELD_KEY.AVATAR,
      columnText: 'Name',
    };
  };

  getAgeFrom = () => ({
    value: this.age_from,
    label: this.age_from,
  });

  getAgeTo = () => ({
    value: this.age_to,
    label: this.age_to,
  });

  getGender = () => {
    return {
      value: this.gender ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_FIELD_KEY.GENDER,
      columnText: 'Gender',
    };
  };

  getCreatedDate = () => {
    return {
      value: this.createdDate ? format(new Date(this.createdDate), FORMAT_DATE) : '',
      original: this.createdDate ?? '',
      type: FIELD_TYPE.DATE,
      columnName: PERSONA_FIELD_KEY.CREATED_DATE,
      columnText: 'Created Date',
    };
  };

  getUpdatedDate = () => {
    return {
      value: this.updatedDate ? format(new Date(this.updatedDate), FORMAT_DATE) : '',
      original: this.updatedDate ?? '',
      type: FIELD_TYPE.DATE,
      columnName: PERSONA_FIELD_KEY.UPDATED_DATE,
      columnText: 'Updated',
    };
  };

  getChannels = (connectedChannelMasterData) => {
    return connectedChannelMasterData
      .map(({ options }) =>
        options.filter((channel) => this.channels?.indexOf(channel.value) !== -1)
      )
      .reduce((arr, el) => [...arr, ...el], []);
  };

  getDemographicsType = () => ({
    value: this.demographics_type,
    label: this.demographics_type,
  });

  getDemographicsSelect = () =>
    this.demographics_select?.map((value) => {
      return {
        value: value,
        label: value,
      };
    });

  getInterestsType = () => ({
    value: this.interests_type,
    label: this.interests_type,
  });

  getInterestsSelect = () =>
    this.interests_select?.map((value) => {
      return {
        value: value,
        label: value,
      };
    });

  getBehaviorsType = () => ({
    value: this.behaviors_type,
    label: this.behaviors_type,
  });

  getBehaviorsSelect = () =>
    this.behaviors_select?.map((value) => {
      return {
        value: value,
        label: value,
      };
    });

  getLocation = () =>
    Array.isArray(this.location)
      ? this.location?.map((value) => {
          return {
            value: value,
            label: value,
          };
        })
      : [];

  getMaritalStatus = () => {
    return {
      value: this.marital_status,
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_FIELD_KEY.MARITAL_STATUS,
      columnText: 'marital status',
    };
  };

  // getDgName = () => {
  //   return {
  //     value: this.dgname ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.DG_NAME,
  //     columnText: 'Name',
  //   };
  // };

  // getImage = () => {
  //   return {
  //     value: this.image ?? '',
  //     type: FIELD_TYPE.IMAGE,
  //     columnName: PERSONA_FIELD_KEY.IMAGE,
  //     columnText: 'Name',
  //   };
  // };

  // getAvatar = () => {
  //   return {
  //     value: this.avatar ?? '',
  //     type: FIELD_TYPE.AVATAR,
  //     columnName: PERSONA_FIELD_KEY.AVATAR,
  //     columnText: 'Name',
  //   };
  // };

  // getTools = () => {
  //   return {
  //     value: this.tools ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.TOOLS,
  //     columnText: 'Tools',
  //   };
  // };

  // getBio = () => {
  //   return {
  //     value: this.bio ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.BIO,
  //     columnText: 'Tools',
  //   };
  // };

  // getGoals = () => {
  //   return {
  //     value: this.goals ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.GOALS,
  //     columnText: 'Goals',
  //   };
  // };

  // getAge = () => {
  //   return {
  //     value: this.age ?? 0,
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.AGE,
  //     columnText: 'Goals',
  //   };
  // };

  // getLocation = () => {
  //   return {
  //     value: this.location ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.LOCATION,
  //     columnText: 'Location',
  //   };
  // };

  // getJobTitle = () => {
  //   return {
  //     value: this.job_title ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.JOB_TITLE,
  //     columnText: 'Job title',
  //   };
  // };

  // getSector = () => {
  //   return {
  //     value: this.sector ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.SECTOR,
  //     columnText: 'SECTOR',
  //   };
  // };

  // getWebsite = () => {
  //   return {
  //     value: this.website ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.WEBSITE,
  //     columnText: 'WEBSITE',
  //   };
  // };

  // getVendorResearch = () => {
  //   return {
  //     value: this.vendor_research ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.VENDOR_RESEARCH,
  //     columnText: 'Vendor research',
  //   };
  // };

  // getInterest = () => {
  //   return {
  //     value: this.interest ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.INTEREST,
  //     columnText: 'Interest',
  //   };
  // };

  // getChallenges = () => {
  //   return {
  //     value: this.challenges ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.CHALLENGES,
  //     columnText: 'Challenges',
  //   };
  // };

  // getPaintpoint = () => {
  //   return {
  //     value: this.paint_point ?? '',
  //     type: FIELD_TYPE.TEXT,
  //     columnName: PERSONA_FIELD_KEY.PAINT_POINT,
  //     columnText: 'Paint point',
  //   };
  // };

  toTableRowData = () => {
    const id = this.getId(),
      name = this.getName(),
      createdDate = this.getCreatedDate(),
      updatedDate = this.getUpdatedDate(),
      // image = this.getImage(),
      avatar_2 = this.getAvatar2();
    //channels = this.getChannels();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [createdDate.columnName]: createdDate.value,
      [updatedDate.columnName]: updatedDate.value,
      // [image.columnName]: image.value,
      //[channels.columnName]: channels.value,
    };
  };

  static convertSubmittedDataToAPIService(personaData) {
    console.log('convertSubmittedDataToAPIService', personaData);

    const result = personaData
      ? {
          [ESI_PERSONA_FIELD_KEY.ID]: personaData[PERSONA_FIELD_KEY.ID] ?? null,
          [ESI_PERSONA_FIELD_KEY.NAME]: personaData[PERSONA_FIELD_KEY.NAME] ?? '',
          [ESI_PERSONA_FIELD_KEY.AVATAR]: personaData[PERSONA_FIELD_KEY.AVATAR] ?? '',
          [ESI_PERSONA_FIELD_KEY.AVATAR_2]: personaData[PERSONA_FIELD_KEY.AVATAR_2] ?? '',

          [ESI_PERSONA_FIELD_KEY.ALL_COUNTRIES]: personaData[PERSONA_FIELD_KEY.ALL_COUNTRIES] ?? '',

          [ESI_PERSONA_FIELD_KEY.LOCATION]:
            personaData[PERSONA_FIELD_KEY.LOCATION]?.length > 0 &&
            (personaData[PERSONA_FIELD_KEY.LOCATION]?.map((item) => item.label) ?? ''),

          [ESI_PERSONA_FIELD_KEY.AGE_FROM]: personaData[PERSONA_FIELD_KEY.AGE_FROM]?.value ?? '',
          [ESI_PERSONA_FIELD_KEY.AGE_TO]: personaData[PERSONA_FIELD_KEY.AGE_TO]?.value ?? '',
          [ESI_PERSONA_FIELD_KEY.GENDER]: personaData[PERSONA_FIELD_KEY.GENDER] ?? '',
          [ESI_PERSONA_FIELD_KEY.CHANNEL]:
            personaData[PERSONA_FIELD_KEY.CHANNELS]?.map((item) => item.value) ?? '',
          [ESI_PERSONA_FIELD_KEY.DEMOGRAPHICS_TYPE]: personaData[
            PERSONA_FIELD_KEY.DEMOGRAPHICS_TYPE
          ]
            ? personaData[PERSONA_FIELD_KEY.DEMOGRAPHICS_TYPE]?.label
            : '',
          [ESI_PERSONA_FIELD_KEY.DEMOGRAPHICS_SELECT]:
            personaData[PERSONA_FIELD_KEY.DEMOGRAPHICS_SELECT]?.map((item) => item.label) ?? '',
          [ESI_PERSONA_FIELD_KEY.INTERESTS_TYPE]: personaData[PERSONA_FIELD_KEY.INTERESTS_TYPE]
            ? personaData[PERSONA_FIELD_KEY.INTERESTS_TYPE]?.label
            : '',
          [ESI_PERSONA_FIELD_KEY.INTERESTS_SELECT]:
            personaData[PERSONA_FIELD_KEY.INTERESTS_SELECT]?.map((item) => item.label) ?? '',

          [ESI_PERSONA_FIELD_KEY.BEHAVIORS_TYPE]: personaData[PERSONA_FIELD_KEY.BEHAVIORS_TYPE]
            ? personaData[PERSONA_FIELD_KEY.BEHAVIORS_TYPE]?.label
            : '',
          [ESI_PERSONA_FIELD_KEY.BEHAVIORS_SELECT]:
            personaData[PERSONA_FIELD_KEY.BEHAVIORS_SELECT]?.map((item) => item.label) ?? '',
        }
      : null;
    return result;
  }
}

export default PersonaModel;
