/**
 * Created by sabir on 20.12.16.
 */

export function getAllTrainings(trainingsMap) {
    let arr = [];
    for (var key in trainingsMap){
        var tr = trainingsMap[key];
        if (tr == undefined){
            continue;
        }
        arr.push(tr);
    }
    arr.sort((a, b)=>{
        return (b.timestamp - a.timestamp);
    });
    return arr;
}

export function getTrainingSessions(trainingId, state) {
    let arr = [];
    const sessionsMap = state.trainings.sessionsMap;
    for (var key in sessionsMap){
        let s = sessionsMap[key];
        if (s == undefined || s.trainingId != trainingId){
            continue;
        }
        arr.push(s);
    }
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