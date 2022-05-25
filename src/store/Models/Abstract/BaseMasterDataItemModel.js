import { PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from "../../../constants/ProjectModule";

class BaseMasterDataItemModel {
  id = 0;
  name = "";

  constructor(entity) {
    if (entity) {
      this.id = entity.id ?? 0;
      this.name = entity.title ?? "";
    }
  }

  getId = () => {
    return this.id;
  };

  getName = () => {
    return this.name;
  };

  toDropdownSelectionItem = () => {
    return {
      value: this.id,
      label: this.name,
    };
  };

  toTableRowData = () => {
    return {
      [PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.ID]: this.id,
      [PROJECT_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.NAME]: this.name,
    };
  };
}

export default BaseMasterDataItemModel;
