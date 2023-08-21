/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import PersonaStore from './PersonaStore/PersonaStore';
import PersonaViewModel from './PersonaViewModels/PersonaViewModel';
import { PersonaViewModelContextProvider } from './PersonaViewModels/PersonaViewModelContextProvider';
import GlobalStore from '../../store/Store';

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;

const personaStore = new PersonaStore({
  globalStore: globalStore,
});
const personaViewModel = new PersonaViewModel(personaStore);

function Personas() {
  return (
    <PersonaViewModelContextProvider viewModel={personaViewModel}>
      <div className="p-3">
        <h3>Only Agency Mode</h3>
      </div>
    </PersonaViewModelContextProvider>
  );
}

export default Personas;
