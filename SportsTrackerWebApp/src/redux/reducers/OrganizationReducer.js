/**
 * Created by sabir on 18.12.16.
 */
import * as types from '../ReduxConstants.js'

const initialState = {
    loading: false,
    organization: undefined,
    fieldsMap: {},
    groupsMap: {},
    userGroupLinksMap: {},
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const consumeGroups = (state, groups) => {
    if (groups == undefined){
        return state;
    }
    var groupsMap = Object.assign({}, state.groupsMap);
    for (let g of groups){
        groupsMap[g.id] = g;
    }
    return Object.assign({}, state.groupsMap, groupsMap);
}

const consumeFields = (state, fields) => {
    if (fields == undefined){
        return state;
    }
    var fieldsMap = Object.assign({}, state.fieldsMap);
    for (let g of fields){
        fieldsMap[g.id] = g;
    }
    return Object.assign({}, state.fieldsMap, fieldsMap);
}


const removeGroupLinks = (state, groupId) => {
    let newUserGroupLinksMap = Object.assign({}, state.userGroupLinksMap);
    for (var key in newUserGroupLinksMap){
        var l = newUserGroupLinksMap[key];
        if (l.groupId == groupId){
            newUserGroupLinksMap[key] = undefined;
        }
    }
    return newUserGroupLinksMap;
}

const addLink = (state, link) => {
    let newUserGroupLinksMap = Object.assign({}, state.userGroupLinksMap, {[link.id]: link});
    return newUserGroupLinksMap;
}
const removeLink = (state, userId, groupId) => {
    let newUserGroupLinksMap = Object.assign({}, state.userGroupLinksMap);
    for (var key in newUserGroupLinksMap){
        var l = newUserGroupLinksMap[key];
        if (l.groupId == groupId && l.userId == userId){
            newUserGroupLinksMap[key] = undefined;
        }
    }
    return newUserGroupLinksMap;
}

const OrganizationReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_ORGANIZATION:
            return startLoading(state, action)
        case types.LOAD_ORGANIZATION_FAIL:
            return stopLoading(state, action)
        case types.LOAD_ORGANIZATION_SUCCESS:
            return {
                ...state,
                organization: action.organization,
                fieldsMap: consumeFields(state, action.fields),
                groupsMap: consumeGroups(state, action.groups),
                loading: false
            }


        case types.CREATE_GROUP:
            return startLoading(state, action)
        case types.CREATE_GROUP_FAIL:
            return stopLoading(state, action)
        case types.CREATE_GROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                groupsMap: consumeGroups(state, [action.group])
            }

        case types.DELETE_GROUP:
            return startLoading(state, action)
        case types.DELETE_GROUP_FAIL:
            return stopLoading(state, action)
        case types.DELETE_GROUP_SUCCESS:
            let newGroupsMap = Object.assign({}, state.groupsMap, {[action.id]: undefined});
            return {
                ...state,
                groupsMap: newGroupsMap,
                userGroupLinksMap: removeGroupLinks(state, action.id),
                loading: false
            }

        case types.ADD_USER_TO_GROUP:
            return startLoading(state, action)
        case types.ADD_USER_TO_GROUP_FAIL:
            return stopLoading(state, action)
        case types.ADD_USER_TO_GROUP_SUCCESS:
            return {
                ...state,
                userGroupLinksMap: addLink(state, action.link),
                loading: false
            }

        case types.DELETE_USER_FROM_GROUP:
            return startLoading(state, action)
        case types.DELETE_USER_FROM_GROUP_FAIL:
            return stopLoading(state, action)
        case types.DELETE_USER_FROM_GROUP_SUCCESS:
            return {
                ...state,
                userGroupLinksMap: removeLink(state, action.userId, action.groupId),
                loading: false
            }

        case types.CREATE_FIELD:
            return startLoading(state, action)
        case types.CREATE_FIELD_FAIL:
            return stopLoading(state, action)
        case types.CREATE_FIELD_SUCCESS:
            return {
                ...state,
                fieldsMap: consumeFields(state, [action.field]),
                loading: false
            }

        case types.DELETE_FIELD:
            return startLoading(state, action)
        case types.DELETE_FIELD_FAIL:
            return stopLoading(state, action)
        case types.DELETE_FIELD_SUCCESS:
            return {
                ...state,
                fieldsMap: Object.assign({}, state.fieldsMap, {[action.id]: undefined}),
                loading: false
            }


        default:
            return state;
    }

}

export default OrganizationReducer;
