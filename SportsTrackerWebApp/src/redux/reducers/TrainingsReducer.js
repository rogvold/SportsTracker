/**
 * Created by sabir on 20.12.16.
 */
import * as types from '../ReduxConstants.js'

const initialState = {
    loading: false,
    trainingsMap: {},
    sessionsMap: {}
}

const consumeTrainings = (state, trainings) => {
    if (trainings == undefined){
        return state;
    }
    var trainingsMap = Object.assign({}, state.trainingsMap);
    for (let u of trainings){
        trainingsMap[u.id] = u;
    }
    return Object.assign({}, state.trainingsMap, trainingsMap);
}

const consumeSessions = (state, sessions) => {
    if (sessions == undefined){
        return state;
    }
    var sessionsMap = Object.assign({}, state.sessionsMap);
    for (let u of sessions){
        sessionsMap[u.id] = u;
    }
    return Object.assign({}, state.sessionsMap, sessionsMap);
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const TrainingsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOAD_TRAININGS:
            return startLoading(state, action)
        case types.LOAD_TRAININGS_FAIL:
            return stopLoading(state, action)
        case types.LOAD_TRAININGS_SUCCESS:
            return {
                ...state,
                loading: false,
                trainingsMap: consumeTrainings(state, action.trainings)
            }


        case types.LOAD_TRAINING_SESSIONS:
            return startLoading(state, action)
        case types.LOAD_TRAINING_SESSIONS_FAIL:
            return stopLoading(state, action)
        case types.LOAD_TRAINING_SESSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                sessionsMap: consumeSessions(state, action.sessions)
            }


        default:
            return state;
    }

}

export default TrainingsReducer;
