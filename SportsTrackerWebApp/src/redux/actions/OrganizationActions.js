/**
 * Created by sabir on 18.12.16.
 */

import * as types from '../ReduxConstants.js'
import ParseAPI from '../../api/ParseAPIEs6.js';
import JuniorAPI from '../../api/JuniorAPI.js';

// --- ORGANIZATION ---

//LOAD ORGANIZATION
let loadOrganization_ = () => {
    return {
        type: types.LOAD_ORGANIZATION
    }
}
let loadOrganizationFailed = (error) => {
    console.log('loadOrganizationFailed: error = ', error);
    return {
        type: types.LOAD_ORGANIZATION_FAIL,
        error: error
    }
}
let loadOrganizationSuccess = (data) => {
    console.log('loadOrganizationSuccess: data = ', data);
    return {
        type: types.LOAD_ORGANIZATION_SUCCESS,
        organization: data.organization,
        trainers: data.trainers,
        users: data.users,
        groups: data.groups,
        fields: data.fields,
        admin: data.admin
    }
}
//thunk
export function loadOrganization(id){
    return (dispatch, getState) => {
        dispatch(loadOrganization_());
        return JuniorAPI.getFields().then(
            fields => dispatch(loadOrganizationSuccess({fields})),
            error => dispatch(loadOrganizationFailed(error))
        )
        // return JuniorAPI.getAllTrainerData().then(
        //     data => dispatch(loadOrganizationSuccess(data)),
        //     error => dispatch(loadOrganizationFailed(error))
        // );
    }
}

//---   GROUPS   ----

//CREATE GROUP
let createGroup_ = () => {
    return {
        type: types.CREATE_GROUP
    }
}
let createGroupFail = (error) => {
    return {
        type: types.CREATE_GROUP_FAIL,
        error: error
    }
}
let createGroupSuccess = (group) => {
    return {
        type: types.CREATE_GROUP_SUCCESS,
        group: group
    }
}
//thunk
export function createGroup(data){
    if (data == undefined){return;}
    return (dispatch, getState) => {
        let org = getState().organization.organization;
        data.organizationId = org.id;
        dispatch(createGroup_());
        return ParseAPI.runCloudFunctionAsPromise('createGroup', data).then(
                data => dispatch(createGroupSuccess(data)),
                error => dispatch(createGroupFail(error))
        )
    }
}

//UPDATE GROUP
export function updateGroup(data){
    if (data == undefined){return;}
    return (dispatch, getState) => {
        //let org = getState().organization.organization;
        //data.organizationId = org.id;
        dispatch(createGroup_());
        return ParseAPI.runCloudFunctionAsPromise('updateGroup', data).then(
                data => dispatch(createGroupSuccess(data)),
                error => dispatch(createGroupFail(error))
        )
    }
}

let deleteGroup_ = () => {
    return {
        type: types.DELETE_GROUP
    }
}
let deleteGroupFail = (error) => {
    return {
        type: types.DELETE_GROUP_FAIL,
        error: error
    }
}
let deleteGroupSuccess = (id) => {
    return {
        type: types.DELETE_GROUP_SUCCESS,
        id: id
    }
}
//thunk
export function deleteGroup(id){
    return (dispatch, getState) => {
        dispatch(deleteGroup_());
        return ParseAPI.runCloudFunctionAsPromise('deleteGroup', {id: id}).then(
            () => dispatch(deleteGroupSuccess(id)),
            error => dispatch(deleteGroupFail(error))
        )
    }
}

//add user to group
let addUserToGroup_ = () => {
    return {
        type: types.ADD_USER_TO_GROUP
    }
}
let addUserToGroupFail = (error) => {
    return {
        type: types.ADD_USER_TO_GROUP_FAIL,
        error: error
    }
}
let addUserToGroupSuccess = (link) => {
    return {
        type: types.ADD_USER_TO_GROUP_SUCCESS,
        link: link
    }
}
//thunk
export function addUserToGroup(userId, groupId){
    if (userId == undefined || groupId == undefined){return;}
    return (dispatch, getState) => {
        dispatch(addUserToGroup_());
        let org = getState().organization.organization;
        return ParseAPI.runCloudFunctionAsPromise('addUserToGroup', {userId: userId, groupId: groupId, organizationId: org.id}).then(
            link => dispatch(addUserToGroupSuccess(link)),
            error => dispatch(addUserToGroupFail(error))
        )
    }
}

//delete user from group
let deleteUserFromGroup_ = () => {
    return {
        type: types.DELETE_USER_FROM_GROUP
    }
}
let deleteUserFromGroupFail = (error) => {
    return {
        type: types.DELETE_USER_FROM_GROUP_FAIL,
        error: error
    }
}
let deleteUserFromGroupSuccess = (data) => {
    return {
        type: types.DELETE_USER_FROM_GROUP_SUCCESS,
        groupId: data.groupId,
        userId: data.userId
    }
}
//thunk
export function deleteUserFromGroup(userId, groupId){
    if (userId == undefined || groupId == undefined){return;}
    return (dispatch, getState) => {
        dispatch(deleteUserFromGroup_());
        return ParseAPI.runCloudFunctionAsPromise('deleteUserFromGroup()', {userId: userId, groupId: groupId}).then(
            () => dispatch(deleteUserFromGroupSuccess({userId: userId, groupId: groupId})),
            error => dispatch(deleteUserFromGroupFail(error))
        )
    }
}

let loadGroupUsersLinks_ = () => {
    return {
        type: types.LOAD_GROUP_USERS_LINKS
    }
}
let loadGroupUsersLinksFail = (error) => {
    return {
        type: types.LOAD_GROUP_USERS_LINKS_FAIL,
        error: error
    }
}
let loadGroupUsersLinksSuccess = (links, users) => {
    return {
        type: types.LOAD_GROUP_USERS_LINKS_SUCCESS,
        links: links,
        users: users
    }
}
//thunk
export function loadGroupUsersLinks(groupId){
    if (groupId == undefined){return;}
    return (dispatch, getState) => {
        dispatch(loadGroupUsersLinks_());
        return JuniorAPI.loadGroupUsersLinks(groupId).then(
            d => dispatch(loadGroupUsersLinksSuccess(d.links, d.users)),
            error => dispatch(loadGroupUsersLinksFail(error))
        )
    }
}

//loadGroupUserLinks


// ---   FIELDS   ---
let createField_ = () => {
    return {
        type: types.CREATE_FIELD
    }
}
let createFieldFail = (error) => {
    return {
        type: types.CREATE_FIELD_FAIL,
        error: error
    }
}
let createFieldSuccess = (field) => {
    return {
        type: types.CREATE_FIELD_SUCCESS,
        field: field
    }
}
//thunk
export function createField(data){
    if (data == undefined){return;}
    return (dispatch, getState) => {
        var org = getState().organization.organization;
        data.organizationId = org.id;
        dispatch(createField_());
        return ParseAPI.runCloudFunctionAsPromise("createField", data).then(
            field => dispatch(createFieldSuccess(field)),
            error => dispatch(createFieldFail(error))
        )
    }
}
//thunk
export function updateField(data){
    return (dispatch, getState) => {
        dispatch(createField_());
        return ParseAPI.runCloudFunctionAsPromise("updateField", data).then(
                field => dispatch(createFieldSuccess(field)),
                error => dispatch(createFieldFail(error))
        )
    }
}

//delete field
let deleteField_ = () => {
    return {
        type: types.DELETE_FIELD
    }
}
let deleteFieldFail = (error) => {
    return {
        type: types.DELETE_FIELD_FAIL,
        error: error
    }
}
let deleteFieldSuccess = (id) => {
    return {
        type: types.DELETE_FIELD_SUCCESS,
        id: id
    }
}
//thunk
export function deleteField(id){
    if (id == undefined){return undefined;}
    return (dispatch, getState) => {
        dispatch(deleteField_());
        return ParseAPI.runCloudFunctionAsPromise("deleteField", {id: id}).then(
            () => dispatch(deleteFieldSuccess(id)),
            error => dispatch(deleteFieldFail(error))
        )
    }
}