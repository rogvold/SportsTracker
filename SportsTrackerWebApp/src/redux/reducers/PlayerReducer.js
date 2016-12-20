/**
 * Created by sabir on 20.12.16.
 */
import * as types from '../ReduxConstants.js'

const initialState = {
    selectedUsersMap: {},
    selectedTrainingId: undefined
}


const PlayerReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.PLAYER_SELECT_USER:
            return {
                ...state,
                selectedUsersMap: Object.assign({}, state.selectedUsersMap, {[action.id]: 1})
            }

        case types.PLAYER_UNSELECT_USER:
            return {
                ...state,
                selectedUsersMap: Object.assign({}, state.selectedUsersMap, {[action.id]: undefined})
            }

        case types.PLAYER_TOGGLE_USER:
            let map = Object.assign({}, state.selectedUsersMap);
            let id = action.id;
            if (map[id] == 1){
                map[id] = undefined;
            }else {
                map[id] = 1;
            }
            return {
                ...state,
                selectedUsersMap: map
            }

        case types.PLAYER_UNSELECT_ALL_USERS:
            return {
                ...state,
                selectedUsersMap: {}
            }

        case types.PLAYER_SELECT_ALL_USERS:
            let {ids} = action;
            var map = Object.assign({}, state.selectedUsersMap);
            for (var i in ids){
                let id = ids[i];
                map[id] = 1;
            }
            return {
                ...state,
                selectedUsersMap: map
            }

        case types.LOAD_TRAINING_SESSIONS_SUCCESS:
            let {sessions} = action;
            let selectedUsersMap = Object.assign({}, state.selectedUsersMap);
            for (var i in sessions){
                let userId = sessions[i].session.userId;
                selectedUsersMap[userId] = 1;
            }
            return {
                ...state,
                selectedUsersMap: selectedUsersMap
            }

        case types.PLAYER_SELECT_TRAINING:
            return {
                ...state,
                selectedTrainingId: action.id
            }
        case types.PLAYER_UNSELECT_TRAINING:
            return {
                ...state,
                selectedTrainingId: undefined
            }


        default:
            return state;

    }

}

export default PlayerReducer;
