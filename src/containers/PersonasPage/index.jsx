/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { lazy } from 'react';

import { Route } from 'react-router-dom';
import PersonaActionBar from './PersonaForm/PersonaActionBar';
import PersonaStore from './PersonaStore/PersonaStore';
import PersonaViewModel from './PersonaViewModels/PersonaViewModel';
import { PersonaViewModelContextProvider } from './PersonaViewModels/PersonaViewModelContextProvider';
import ComponentHeaderPage from '../../components/ComponentHeaderPage';
import { faSave } from '@fortawesome/free-regular-svg-icons/faSave';
import PersonaTemplate from '../../containers/PersonasPage/PersonaTemplate/PersonaTemplate';
import GlobalStore from '../../store/Store';

const PersonaFormPage = lazy(() => import('./PersonaForm/PersonaFormPage'));
const PersonasList = lazy(() => import('./PersonasList/PersonasList'));

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;

const personaStore = new PersonaStore({
  globalStore: globalStore,
});
const personaViewModel = new PersonaViewModel(personaStore);

function Personas({ match }) {
  return (
    <PersonaViewModelContextProvider viewModel={personaViewModel}>
      <div className="p-3">
        <h3>Only Agency Mode</h3>
      </div>
    </PersonaViewModelContextProvider>
  );
}

export default Personas;
