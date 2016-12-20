/**
 * Created by sabir on 20.12.16.
 */

import ParseAPI from '../../api/ParseAPIEs6.js';
import * as types from '../ReduxConstants.js'

export function selectUser(userId){
    return {
        type: types.PLAYER_SELECT_USER,
        id: userId
    }
}
export function unselectUser(userId){
    return {
        type: types.PLAYER_UNSELECT_USER,
        id: userId
    }
}
export function toggleUser(userId){
    return {
        type: types.PLAYER_TOGGLE_USER,
        id: userId
    }
}
export function selectAllUsers(usersIds){
    return {
        type: types.PLAYER_SELECT_ALL_USERS,
        ids: usersIds
    }
}
export function unselectAllUsers(){
    return {
        type: types.PLAYER_UNSELECT_ALL_USERS
    }
}
export function selectTraining(id){
    return {
        type: types.PLAYER_SELECT_TRAINING,
        id: id
    }
}
export function unselectTraining(){
    return {
        type: types.PLAYER_UNSELECT_TRAINING
    }
}