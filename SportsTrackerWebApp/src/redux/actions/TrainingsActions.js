/**
 * Created by sabir on 20.12.16.
 */
import * as types from '../ReduxConstants.js'
import ParseAPI from '../../api/ParseAPIEs6.js';

let loadTrainings_ = () => {
    return {
        type: types.LOAD_TRAININGS
    }
}
let loadTrainingsSuccess = (trainings, sessions) => {
    if (sessions == undefined){sessions = []}
    return {
        type: types.LOAD_TRAININGS_SUCCESS,
        trainings: trainings,
        sessions: sessions
    }
}
let loadTrainingsFail = (error) => {
    return {
        type: types.LOAD_TRAININGS_FAIL,
        error: error
    }
}
//thunk
export function loadOrganizationTrainings(id){
    return (dispatch, getState) => {
        if (getState().trainings.loading == true || getState().organization.organization == undefined){return;}
        if (id == undefined){
            id = getState().organization.organization.id;
        }
        if (Object.keys(getState().trainings.trainingsMap).length > 0){
            return;
        }
        dispatch(loadTrainings_())
        return ParseAPI.runCloudFunctionAsPromise("loadOrganizationTrainings", {organizationId: id}).then(
            trainings => dispatch(loadTrainingsSuccess(trainings)),
            error => dispatch(loadTrainingsFail(error))
        )
    }
}

export function loadUserTrainings(userId){
    return (dispatch, getState) => {
        if (getState().trainings.loading == true || getState().organization.organization == undefined){return;}
        //if (Object.keys(getState().trainings.trainingsMap).length > 0){
        //    return;
        //}
        dispatch(loadTrainings_())
        return ParseAPI.runCloudFunctionAsPromise("loadUserTrainings", {id: userId}).then(
                d => dispatch(loadTrainingsSuccess(d.trainings, d.sessions)),
                error => dispatch(loadTrainingsFail(error))
        )
    }
}


let loadSessions_ = () => {
    return {
        type: types.LOAD_TRAINING_SESSIONS
    }
}

let loadSessionsSuccess = (sessions) => {
    return {
        type: types.LOAD_TRAINING_SESSIONS_SUCCESS,
        sessions: sessions
    }
}
let loadSessionsFail = (error) => {
    return {
        type: types.LOAD_TRAINING_SESSIONS_FAIL,
        error: error
    }
}
//thunk
export function loadTrainingSessions(id){
    return (dispatch, getState) => {
        if (getState().trainings.loading == true || getState().organization.organization == undefined){return;}
        if (id == undefined){
            return;
        }
        dispatch(loadSessions_())
        return ParseAPI.runCloudFunctionAsPromise("loadTrainingSessions", {trainingId: id}).then(
                sessions => dispatch(loadSessionsSuccess(sessions)),
                error => dispatch(loadSessionsFail(error))
        )
    }
}

