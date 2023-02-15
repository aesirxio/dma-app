/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';

import PersonaStore from '../../PersonasPage/PersonaStore/PersonaStore';
import PersonaViewModel from '../../PersonasPage/PersonaViewModels/PersonaViewModel';
import { PersonaViewModelContextProvider } from '../../PersonasPage/PersonaViewModels/PersonaViewModelContextProvider';
import GlobalStore from '../../../store/Store';

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;
const personaStore = new PersonaStore({
  globalStore: globalStore,
});

const personaViewModel = new PersonaViewModel(personaStore);

const FormPreviewPersona = lazy(() =>
  import('../../PersonasPage/FormPreviewPersona/FormPreviewPersona')
);

const ContentPreviewPersona = (props) => {
  return (
    <PersonaViewModelContextProvider viewModel={personaViewModel}>
      <FormPreviewPersona {...props} />
    </PersonaViewModelContextProvider>
  );
};

export { ContentPreviewPersona };
