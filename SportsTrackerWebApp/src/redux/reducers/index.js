/**
 * Created by sabir on 18.12.16.
 */


import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import UsersReducer from './UsersReducer.js';
import OrganizationReducer from './OrganizationReducer.js';
import TrainingsReducer from './TrainingsReducer.js';
import PlayerReducer from './PlayerReducer.js';

export const reducer = combineReducers({
    users: UsersReducer,
    organization: OrganizationReducer,
    trainings: TrainingsReducer,
    player: PlayerReducer,
    form: formReducer
});