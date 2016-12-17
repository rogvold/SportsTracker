/**
 * Created by sabir on 18.12.16.
 */


import { combineReducers } from 'redux';

import UsersReducer from './UsersReducer.js';

export const reducer = combineReducers({
    users: UsersReducer
});