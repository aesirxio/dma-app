/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import history from '../../../routes/history';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { observer } from 'mobx-react';
import { withPersonaViewModel } from '../PersonaViewModels/PersonaViewModelContextProvider';
import ComponentPersonaTemplate from '../../../components/ComponentPersonaTemplate';
import { PERSONA_TEMPLATE_FIELD_KEY } from '../../../constants/PersonaTemplateModule';

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

      this.personaTemplateViewModel = viewModel ? viewModel.getPersonaTemplateViewModel() : null;
    }

    componentDidMount() {
      this.personaTemplateViewModel.initializeData();
    }

    handlerClick = (id) => {
      history.push(`/personas/create/bypersonatemplate/` + id);
    };

    render() {
      const personaTemplatesData = this.personaTemplateViewModel.personaTemplatesData;

      return (
        <>
          {personaTemplatesData && (
            <div className="persona-recommendation mb-4">
              <h2 className="text-blue-0 mb-3">Persona recommendations</h2>
              <div className="persona-template-list p-3 bg-white rounded-2">
                <ul className="list-unstyled mb-0">
                  <Swiper spaceBetween={30} slidesPerView={5} navigation>
                    {personaTemplatesData.map((personaTemplate, key) => {
                      return (
                        <SwiperSlide key={key}>
                          <ComponentPersonaTemplate
                            handlerClick={() =>
                              this.handlerClick(personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.ID])
                            }
                            THUMBNAIL_URL={
                              personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.THUMBNAIL_URL]
                            }
                            NAME={personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.NAME]}
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
