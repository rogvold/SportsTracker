/**
 * Created by sabir on 18.12.16.
 */
/**
 * Created by sabir on 29.11.16.
 */

import * as types from '../ReduxConstants.js'
import ParseAPI from '../../api/ParseAPIEs6.js';
import JuniorAPI from '../../api/JuniorAPI.js';

//LOGIN
let startLoggingIn = () => {
    return {
        type: types.LOGIN
    }
}
let onLoggedIn = (user) => {
    return {
        type: types.LOGIN_SUCCESS,
        user: user
    }
}
let onLoginFailed = (error) => {
    return {
        type: types.LOGIN_FAIL,
        error: error
    }
}
//thunk
export function logIn(data){
    return (dispatch, getState) => {
        dispatch(startLoggingIn())
        return JuniorAPI.logIn(data.email, data.password).then(
                user => dispatch(onLoggedIn(user)),
                error => dispatch(onLoginFailed(error))
        )
    }
}

//SIGNUP
let startSigningUp = () => {
    return {
        type: types.SIGNUP
    }
}
let onSignedUp = (user) => {
    return {
        type: types.SIGNUP_SUCCESS,
        user: user
    }
}
let onSignUpFail = (error) => {
    return {
        type: types.SIGNUP_FAIL,
        error: error
    }
}
//thunk
export function signUp(data){
    return (dispatch, getState) => {
        dispatch(startSigningUp())
        return ParseAPI.signUpAsPromise(data).then(
                user => dispatch(onSignedUp(user)),
                error => dispatch(onSignUpFail(error))
        )
    }
}

//LOGOUT
let startLoggingOut = () => {
    console.log('startLoggingOut occured');
    return {
        type: types.LOGOUT
    }
}
let onLogoutFail = () => {
    return {
        type: types.LOGOUT_FAIL
    }
}
let onLoggedOut = () => {
    return {
        type: types.LOGOUT_SUCCESS
    }
}
//thunk
export function logOut(){
    return (dispatch, getState) => {
        var usersState = getState().users;
        console.log('usersState = ', usersState);
        if (usersState.currentUser == undefined){
            return Promise.resolve()
        }
        dispatch(startLoggingOut());
        // return ParseAPI.logOutAsPromise().then(
        return JuniorAPI.logOut().then(
            () => dispatch(onLoggedOut()),
            () => dispatch(onLogoutFail())
        )
    }
}

//AUTH_INIT
let startAuthInit = () => {
    return {
        type: types.INITIALIZE_AUTH
    }
}
let authInitFailed = () => {
    return {
        type: types.INITIALIZE_AUTH_FAIL
    }
}
let authInitSuccess = (user) => {
    console.log('authInitSuccess: user = ', user);
    return {
        type: types.INITIALIZE_AUTH_SUCCESS,
        user: user
    }
}
//thunk
export function initializeAuthorization(){
    return (dispatch, getState) => {
        if (getState().users.initialized == true){
            return Promise.resolve()
        }
        dispatch(startAuthInit());
        return JuniorAPI.authJunior().then(
                user => dispatch(authInitSuccess(user)),
                err => dispatch(authInitFailed())
        );
    }
}

//create user
let createUser_ = () => {
    return {
        type: types.CREATE_USER
    }
}
let createUserFail = (error) => {
    return {
        type: types.CREATE_USER_FAIL,
        error: error
    }
}
let createUserSuccess = (user) => {
    return {
        type: types.CREATE_USER_SUCCESS,
        user: user
    }
}
//thunk
export function createUser(data){
    return (dispatch, getState) => {
        let org = getState().organization.organization;
        if (org == undefined){
            return Promise.resolve();
        }
        data.organizationId = org.id;
        dispatch(createUser_());
        return ParseAPI.runCloudFunctionAsPromise("createUser", data).then(
            user => dispatch(createUserSuccess(user)),
            error => dispatch(createUserFail(error))
        )
    }
}
//thunk
export function updateUser(data){
    return (dispatch, getState) => {
        dispatch(createUser_());
        return ParseAPI.runCloudFunctionAsPromise("updateUser", data).then(
                user => dispatch(createUserSuccess(user)),
                error => dispatch(createUserFail(error))
        )
    }
}

//load
let loadUsers_ = () => {
    return {
        type: types.LOAD_USERS
    }
}

let loadUsersFail = (err) => {
    return {
        type: types.LOAD_USERS_FAIL,
        error: err
    }
}

let loadUsersSuccess = (users) => {
    return {
        type: types.LOAD_USERS_SUCCESS,
        users: users
    }
}

//
export function loadGroupUsers(groupId) {
    return (dispatch, getState) => {
        dispatch(loadUsers_())

    }
}