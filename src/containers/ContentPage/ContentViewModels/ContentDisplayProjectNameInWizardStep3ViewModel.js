import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import PAGE_STATUS from "../../../constants/PageStatus";

class ContentDisplayProjectNameInWizardStep3ViewModel {
  contentsStore = null;

  formStatus = PAGE_STATUS.LOADING;

  value = null;


  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
  }

  resetObservableProperties() {
    this.value = null;
  }

  renderProjectNameByProjectId = (projectId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentsStore.getProjectItemByProjectId(
      projectId,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log(
      "callbackOnErrorHander - ContentDisplayProjectNameInWizardStep3ViewModel"
    );
    console.log(error);
    this.formStatus = PAGE_STATUS.READY;
    notify(error.message);
  };

  callbackOnSuccessHandler = (projectItemInModel) => {
    console.log(
      "callbackOnSuccessHandler - ContentDisplayProjectNameInWizardStep3ViewModel"
    );
    const resultInModel = projectItemInModel ? projectItemInModel : null;
    console.log(resultInModel);
    this.value = resultInModel ? resultInModel[0].getName().value : null;
    this.formStatus = PAGE_STATUS.READY;

    console.log(this.value);
  };
}

export default ContentDisplayProjectNameInWizardStep3ViewModel;
