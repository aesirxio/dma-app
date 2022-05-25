import React, { Component } from "react";

import history from "../../../routes/history";

import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import PAGE_STATUS from "../../../constants/PageStatus";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import Table from "../../../components/Table";
import Spinner from "../../../components/Spinner";

import { observer } from "mobx-react";
import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";
import ComponentPersonaTemplate from "../../../components/ComponentPersonaTemplate";
import {
  PERSONA_TEMPLATE_FIELD_KEY,
  ESI_PERSONA_TEMPLATE_FIELD_KEY,
} from "../../../constants/PersonaTemplateModule";

SwiperCore.use([Navigation, Pagination]);

const PersonaTemplate = observer(
  class PersonaTemplate extends Component {
    personaTemplateViewModel = null;
    viewModel = null;
    isPersonaTemplate = true;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      this.viewModel = viewModel;

      this.personaTemplateViewModel = viewModel
        ? viewModel.getPersonaTemplateViewModel()
        : null;
    }

    componentDidMount() {
      this.personaTemplateViewModel.initializeData();
    }

    handlerClick = (id) => {
      history.push(`/personas/create/bypersonatemplate/` + id);
    };

    render() {
      console.log("PersonaTemplate - render");
      console.log(this.personaTemplateViewModel.personaTemplatesData);
      const personaTemplatesData = this.personaTemplateViewModel
        .personaTemplatesData;

      return (
        <>
          {personaTemplatesData && (
            <div className="persona-recommendation mb-4">
              <h2 className="text-blue-0 mb-3">Persona recommendations</h2>
              <div className="persona-template-list p-3 bg-white rounded-2">
                <ul className="list-unstyled mb-0">
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={5}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log()}
                    navigation
                  >
                    {personaTemplatesData.map((personaTemplate, key) => {
                      return (
                        <SwiperSlide key={key}>
                          <ComponentPersonaTemplate
                            handlerClick={(e) =>
                              this.handlerClick(
                                personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.ID]
                              )
                            }
                            THUMBNAIL_URL={
                              personaTemplate[
                                PERSONA_TEMPLATE_FIELD_KEY.THUMBNAIL_URL
                              ]
                            }
                            NAME={
                              personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.NAME]
                            }
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </ul>
              </div>
            </div>
          )}
        </>
      );
    }
  }
);

export default withPersonaViewModel(PersonaTemplate);
