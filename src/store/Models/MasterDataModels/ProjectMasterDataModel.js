import BaseMasterDataItemModel from "../Abstract/BaseMasterDataItemModel";
import BaseMasterDataModel from "../Abstract/BaseMasterDataModel";
class ProjectMasterDataItemModel extends BaseMasterDataItemModel {
  constructor(entity) {
    if (entity) {
      super(entity);
    }
  }
}

class ProjectMasterDataModel extends BaseMasterDataModel {
  constructor(entities) {
    if (entities) {
      super(entities);
      this.unTransformedItems = entities;
      this.items = entities.map((element) => {
        return new ProjectMasterDataItemModel(element);
      });
    }
  }
}
export { ProjectMasterDataModel, ProjectMasterDataItemModel };
