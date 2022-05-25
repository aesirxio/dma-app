import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import PersonaUtils from "../PersonaUtils/PersonaUtils";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";
import contentsStore from "../../ContentPage/ContentStore/ContentStore";
import PersonaTemplateUtils from "../PersonaUtils/PersonaTemplateUtils";

import { notify } from "../../../components/Toast";

class PersonaTemplateViewModel {
  personaStore = null;

  contentsStore = null;

  personaTemplatesData = null;

  constructor(personaStore) {
    makeAutoObservable(this);
    this.personaStore = personaStore;

    if (this.contentsStore === null) {
      this.contentsStore = new contentsStore();
    }
  }

  initializeData = () => {
    console.log("componentDidMount");
    this.personaStore.getPersonaRecommendations(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      1
    );
  };

  callbackOnSuccessHandler = (personaTemplateModelData) => {
    console.log("Component PersonaTemplate - callbackOnSuccessHandler");
    console.log(personaTemplateModelData);

    const rowDataTransformed = PersonaTemplateUtils.transformPersonaTemplateModelIntoTableDataRow(
      personaTemplateModelData.list
    );

    console.log("Row Data is Formatted");
    console.log(rowDataTransformed);

    this.personaTemplatesData = rowDataTransformed;
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    // notify(error.message);
  };
}

export default PersonaTemplateViewModel;
