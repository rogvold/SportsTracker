/**
 * Created by sabir on 20.12.16.
 */

export function getAllTrainings(trainingsMap) {
    console.log('getAllTrainings occured: trainingsMap = ', trainingsMap);
    let arr = [];
    for (var key in trainingsMap){
        var tr = trainingsMap[key];
        if (tr == undefined){
            continue;
        }
        arr.push(tr);
    }
    console.log('trainings = ', arr);
    arr.sort((a, b)=>{
        return (b.timestamp - a.timestamp);
    });
    return arr;
}

export function getTrainingSessions(trainingId, state) {
    // console.log('getTrainingSessions: trainingId, state = ', trainingId, state);
    let arr = [];
    const sessionsMap = state.trainings.sessionsMap;
    // console.log('getTrainingSessions occured: sessionsMap, trainingId = ', sessionsMap, trainingId);
    for (var key in sessionsMap){
        let s = sessionsMap[key];
        if (s == undefined || s.trainingId != trainingId){
            continue;
        }
        arr.push(s);
    }
    // console.log('getTrainingSessions: returning ', arr);
    return arr;
}

export function getUserTrainings(userId, state) {
    let arr = [];
    const sessionsMap = state.trainings.sessionsMap;
    const trainingsMap = state.trainings.trainingsMap;
    for (var key in sessionsMap){
        let s = sessionsMap[key];
        if (s == undefined || s.trainingId != trainingId){
            continue;
        }
        arr.push(s);
    }
    return arr;
}