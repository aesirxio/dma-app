import FIELD_TYPE from '../../../constants/FieldType';
import { FORMAT_DATE } from '../../../constants/FormFieldType';
import {
  PERSONA_TEMPLATE_FIELD_KEY,
  ESI_PERSONA_TEMPLATE_FIELD_KEY,
} from '../../../constants/PersonaTemplateModule';

import ChannelUtils from '../../ChannelsPage/ChannelUtils/ChannelUtils';

//import {ESI_PERSONA_TEMPLATE_FIELD_KEY} from 'aesirx-dma-lib';

import { format } from 'date-fns';

class PersonaTemplateModel {
  constructor(data) {
    this.id = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.ID] ?? 0;
    this.name = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.NAME] ?? '';
    this.channels = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.CHANNELS] ?? '';
    this.dgname = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.DG_NAME] ?? '';
    this.age = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.AGE] ?? 0;
    this.gender =
      (data[ESI_PERSONA_TEMPLATE_FIELD_KEY.GENDER] !== '' &&
        JSON.parse(data[ESI_PERSONA_TEMPLATE_FIELD_KEY.GENDER])) ??
      '';
    this.location = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.LOCATION] ?? '';
    this.tools = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.TOOLS] ?? '';
    this.job_title = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.JOB_TITLE] ?? '';
    this.website = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.WEBSITE] ?? '';
    this.sector = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.SECTOR] ?? '';
    this.vendor_research = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.VENDOR_RESEARCH] ?? '';
    this.interest = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.INTEREST] ?? [];
    this.goals = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.GOALS] ?? '';
    this.marital_status = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.MARITAL_STATUS] ?? '';
    this.paint_point = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.PAINT_POINT] ?? '';
    this.avatar = JSON.parse(data[ESI_PERSONA_TEMPLATE_FIELD_KEY.AVATAR])[0] ?? '';
    this.challenges = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.CHANNELS] ?? '';
    this.bio = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.BIO] ?? '';
    this.image = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.IMAGE] ?? '/assets/images/annotation.png';

    this.createdDate = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.CREATED_DATE] ?? '';
    this.updatedDate = data[ESI_PERSONA_TEMPLATE_FIELD_KEY.MODIFIED_DATE] ?? '';
    this.thumbnail_url = JSON.parse(data[ESI_PERSONA_TEMPLATE_FIELD_KEY.THUMBNAIL_URL])[0] ?? '';

    // this.channelsModel = ChannelUtils.transformChannelResponseIntoModel(
    //   this.channels
    // );
  }

  getId = () => {
    return {
      value: this.id ?? 0,
      type: FIELD_TYPE.READONLY,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.ID,
      columnText: 'ID',
    };
  };

  getName = () => {
    return {
      value: this.name ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.NAME,
      columnText: 'Name',
    };
  };

  getDgName = () => {
    return {
      value: this.dgname ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.DG_NAME,
      columnText: 'Name',
    };
  };

  getImage = () => {
    return {
      value: this.image ?? '',
      type: FIELD_TYPE.IMAGE,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.IMAGE,
      columnText: 'Name',
    };
  };

  getAvatar = () => {
    return {
      value: this.avatar ?? '',
      type: FIELD_TYPE.IMAGE,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.AVATAR,
      columnText: 'Avatar',
    };
  };

  getThumbnailUrl = () => {
    return {
      value: this.thumbnail_url ?? '',
      type: FIELD_TYPE.IMAGE,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.THUMBNAIL_URL,
      columnText: 'Thumbnail Url',
    };
  };

  getChannels = () => {
    return {
      value: this.channelsModel ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.CHANNELS,
      columnText: 'Channels',
    };
  };

  getCreatedDate = () => {
    return {
      value: this.createdDate ? format(new Date(this.createdDate), FORMAT_DATE) : '',
      original: this.createdDate ?? '',
      type: FIELD_TYPE.DATE,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.CREATED_DATE,
      columnText: 'Created Date',
    };
  };

  getUpdatedDate = () => {
    return {
      value: this.updatedDate ? format(new Date(this.updatedDate), FORMAT_DATE) : '',
      //value: this.updatedDate,
      original: this.updatedDate ?? '',
      type: FIELD_TYPE.DATE,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.UPDATED_DATE,
      columnText: 'Updated',
    };
  };

  getTools = () => {
    return {
      value: this.tools ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.TOOLS,
      columnText: 'Tools',
    };
  };

  getBio = () => {
    return {
      value: this.bio ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.BIO,
      columnText: 'Tools',
    };
  };

  getGoals = () => {
    return {
      value: this.goals ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.GOALS,
      columnText: 'Goals',
    };
  };

  getAge = () => {
    return {
      value: this.age ?? 0,
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.AGE,
      columnText: 'Goals',
    };
  };

  getGender = () => {
    return {
      value: this.gender ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.GENDER,
      columnText: 'Gender',
    };
  };

  getLocation = () => {
    return {
      value: this.location ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.LOCATION,
      columnText: 'Location',
    };
  };

  getJobTitle = () => {
    return {
      value: this.job_title ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.JOB_TITLE,
      columnText: 'Job title',
    };
  };

  getSector = () => {
    return {
      value: this.sector ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.SECTOR,
      columnText: 'SECTOR',
    };
  };

  getMaritalStatus = () => {
    return {
      value: this.marital_status,
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.MARITAL_STATUS,
      columnText: 'marital status',
    };
  };

  getWebsite = () => {
    return {
      value: this.website ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.WEBSITE,
      columnText: 'WEBSITE',
    };
  };

  getVendorResearch = () => {
    return {
      value: this.vendor_research ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.VENDOR_RESEARCH,
      columnText: 'Vendor research',
    };
  };

  getInterest = () => {
    return {
      value: this.interest ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.INTEREST,
      columnText: 'Interest',
    };
  };

  getChallenges = () => {
    return {
      value: this.challenges ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.CHALLENGES,
      columnText: 'Challenges',
    };
  };

  getPaintpoint = () => {
    return {
      value: this.paint_point ?? '',
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_TEMPLATE_FIELD_KEY.PAINT_POINT,
      columnText: 'Paint point',
    };
  };

  toTableRowData = () => {
    const id = this.getId(),
      name = this.getName(),
      createdDate = this.getCreatedDate(),
      updatedDate = this.getUpdatedDate(),
      image = this.getImage(),
      thumbnailUrl = this.getThumbnailUrl();
    //channels = this.getChannels();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [createdDate.columnName]: createdDate.value,
      [updatedDate.columnName]: updatedDate.value,
      [image.columnName]: image.value,
      [thumbnailUrl.columnName]: thumbnailUrl.value,
      //[channels.columnName]: channels.value,
    };
  };

  static convertSubmittedDataToAPIService(personaData) {
    const result = personaData
      ? {
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.ID]: personaData[PERSONA_TEMPLATE_FIELD_KEY.ID] ?? null,
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.NAME]: personaData[PERSONA_TEMPLATE_FIELD_KEY.NAME] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.CHANNEL]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.CHANNEL] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.AGE]: personaData[PERSONA_TEMPLATE_FIELD_KEY.AGE] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.GENDER]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.GENDER] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.LOCATION]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.LOCATION] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.TOOLS]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.TOOLS] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.JOB_TITLE]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.JOB_TITLE] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.WEBSITE]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.WEBSITE] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.SECTOR]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.SECTOR] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.VENDOR_RESEARCH]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.VENDOR_RESEARCH] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.GOALS]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.GOALS] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.MARITAL_STATUS]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.MARITAL_STATUS] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.CHALLENGES]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.CHALLENGES] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.PAINT_POINT]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.PAINT_POINT] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.BIO]: personaData[PERSONA_TEMPLATE_FIELD_KEY.BIO] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.AVATAR]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.AVATAR] ?? '',
          [ESI_PERSONA_TEMPLATE_FIELD_KEY.THUMBNAIL_URL]:
            personaData[PERSONA_TEMPLATE_FIELD_KEY.THUMBNAIL_URL] ?? '',
        }
      : null;
    return result;
  }
}

export default PersonaTemplateModel;
