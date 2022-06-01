/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import PersonaFormViewModel from './PersonaFormViewModel';
import PersonaListViewModel from './PersonasListViewModel';
import PersonaTemplateViewModel from './PersonaTemplateViewModel';
import ContentConnectedChannelsByOrganisationViewModel from '../../ContentPage/ContentViewModels/ContentConnectedChannelsByOrganisationViewModel';
import ContentStore from '../../ContentPage/ContentStore/ContentStore.js';

const contentStore = new ContentStore();

class PersonaViewModel {
  personaListViewModel = null;
  personaFormViewModel = null;
  personaTemplateViewModel = null;
  contentConnectedChannelsByOrganisationViewModel = null;

  constructor(personaStore) {
    if (personaStore) {
      this.personaFormViewModel = new PersonaFormViewModel(personaStore);
      this.personaListViewModel = new PersonaListViewModel(personaStore);

      this.personaTemplateViewModel = new PersonaTemplateViewModel(personaStore);

      this.contentConnectedChannelsByOrganisationViewModel =
        new ContentConnectedChannelsByOrganisationViewModel(contentStore);
    }
  }

  getPersonaListViewModel = () => this.personaListViewModel;

  getPersonaFormViewModel = () => this.personaFormViewModel;

  getPersonaTemplateViewModel = () => this.personaTemplateViewModel;

  getContentConnectedChannelsViewModel = () => this.contentConnectedChannelsByOrganisationViewModel;
}

export default PersonaViewModel;
