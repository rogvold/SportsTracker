/**
 * Created by sabir on 18.12.16.
 */

import * as types from '../ReduxConstants.js'

const initialState = {
    initialized: false,
    loading: false,
    usersMap: {},
    currentUser: undefined,
    error: undefined
}

const consumeUsers = (state, users) => {
    if (users == undefined){
        return state;
    }
    var usersMap = Object.assign({}, state.usersMap);
    for (let u of users){
        usersMap[u.id] = u;
    }
    return Object.assign({}, state.usersMap, usersMap);
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const UsersReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOGIN:
            return startLoading(state, action)

        case types.LOGIN_SUCCESS:
            var usersMap = Object.assign({}, state.usersMap, {[action.user.id]: action.user});
            return {
                ...state,
                currentUser: action.user,
                usersMap: usersMap,
                loading: false
            }

        case types.LOGIN_FAIL:
            return stopLoading(state, action)



        case types.SIGNUP:
            return startLoading(state, action)

        case types.SIGNUP_FAIL:
            return stopLoading(state, action)

        case types.SIGNUP_SUCCESS:
            var usersMap = Object.assign({}, state.usersMap, {[action.user.id]: action.user});
            return {
                ...state,
                currentUser: action.user,
                usersMap: usersMap,
                loading: false
            }

        case types.CREATE_USER:
            return startLoading(state,action)

        case types.CREATE_USER_FAIL:
            return stopLoading(state, action)

        case types.CREATE_USER_SUCCESS:
            var usersMap = Object.assign({}, state.usersMap, {[action.user.id]: action.user});
            return {
                ...state,
                usersMap: usersMap,
                loading: false
            }


        case  types.LOGOUT:
            return startLoading(state, action)

        case  types.LOGOUT_FAIL:
            return stopLoading(state, action)

        case  types.LOGOUT_SUCCESS:
            return {...state, currentUser: undefined, loading: false, error: undefined}



        case types.INITIALIZE_AUTH:
            return {...state, loading: true, initialized: false}

        case types.INITIALIZE_AUTH_FAIL:
            return {...state, loading: false, initialized: false}

        case types.INITIALIZE_AUTH_SUCCESS:
            var usersMap = Object.assign({}, state.usersMap, (action.user == undefined ) ? {} : {[action.user.id]: action.user});
            return {...state, loading: false, initialized: true, currentUser: action.user, usersMap: usersMap}



        case types.LOAD_USERS:
            return startLoading(state, action)

        case types.LOAD_USERS_FAIL:
            return stopLoading(state, action)

        case types.LOAD_USERS_SUCCESS:
            var newUsersMap = consumeUsers(state, action.users)
            return {
                ...state,
                usersMap: newUsersMap,
                loading: false
            }

        case types.LOAD_ORGANIZATION_SUCCESS:
            let newUsersMap = Object.assign({}, consumeUsers(state, action.users), consumeUsers(state, action.trainers));

            return {
                ...state,
                usersMap: newUsersMap
            }


        default:
            return state;
    }

}

export default UsersReducer;
