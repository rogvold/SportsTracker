/**
 * Created by sabir on 18.12.16.
 */


import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import UsersReducer from './UsersReducer.js';
import OrganizationReducer from './OrganizationReducer.js';

export const reducer = combineReducers({
    users: UsersReducer,
    form: formReducer,
    organization: OrganizationReducer
});