class ContentFacebookAdsCreativeModel {
  static convertSubmittedDataToAPIService(data) {
    console.log('convertdatafacebookadscreative', data);
    const result = {
      object_story_spec: {
        link_data: {
          call_to_action: {
            type: data?.call_action?.value,
          },
          name: data?.headline,
          message: data?.text,
          link: data?.link,
        },
      },
    };
    return JSON.stringify(result);
  }
}

export default ContentFacebookAdsCreativeModel;
