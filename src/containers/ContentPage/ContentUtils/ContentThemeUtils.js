import ContentThemeModel from "../ContentModel/ContentThemeModel";

class ContentThemeUtils {
  transformContentThemeResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new ContentThemeModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };
}

const utils = new ContentThemeUtils();

export default utils;
