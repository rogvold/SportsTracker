/**
 * Created by sabir on 12.07.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');
var UsersModule = require('cloud/modules/UsersModule');

var TrainingsModule = {

    CHUNK_SIZE: 1000,

    transformTraining: function(tr){
        if (tr == undefined){
            return undefined;
        }
        return {
            id: tr.id,
            startTimestamp: tr.get('startTimestamp'),
            endTimestamp: tr.get('endTimestamp'),
            trainerId: tr.get('trainerId'),
            groupId: tr.get('groupId'),
            fieldId: tr.get('fieldId'),
            name: tr.get('name')
        }
    },

    transformSession: function(s){
        if (s == undefined){
            return undefined;
        }
        return {
            id: s.id,
            timestamp: (new Date()).getTime(),
            userId: s.get('userId'),
            trainingId: s.get('trainingId'),

            lastPointTime: s.get('lastPointTime'),
            lastChunkNumber: s.get('lastChunkNumber'),
            cachePointsNumber: s.get('cachePointsNumber')
        }
    },

    transformCachePoint: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            sessionId: p.get('sessionId'),
            x: p.get('x'),
            y: p.get('y'),
            t: p.get('t'),
            step: p.get('step')
        }
    },

    transformDataChunk: function(c){
        if (c == undefined){
            return undefined;
        }
        return {
            id: c.id,
            timestamp: (new Date(c.createdAt)).getTime(),
            sessionId: c.get('sessionId'),
            number: c.get('number'),
            x: (c.get('x') == undefined) ? [] : c.get('x'),
            y: (c.get('y') == undefined) ? [] : c.get('y'),
            t: (c.get('t') == undefined) ? [] : c.get('t'),
            step: (c.get('step') == undefined) ? [] : c.get('step')
        }
    },

    loadTrainingChunkPoints: function(sessionId, callback){
        var q = new Parse.Query('DataChunk');
        q.addAscending('number');
        q.equalTo('sessionId', sessionId);
        q.limit(1000);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){return self.transformDataChunk(r)});
            var arr = [];
            for (var i in results){
                var c = results[i];
                var times = c.t;
                for (var i in times){
                    arr.push({
                        t: c.t[i],
                        x: c.x[i],
                        y: c.y[i]
                    });
                }
            }
            callback(arr);
        });
    },

    loadTrainingCachePoints: function(sessionId, callback, shouldTransform){
        var q = new Parse.Query('CachePoint');
        q.limit(1000);
        q.addAscending('t');
        q.equalTo('sessionId', sessionId);
        var self = this;
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            if (shouldTransform == true){
                results = results.map(function(r){return self.transformCachePoint(r)});
            }
            callback(results);
        });
    },

    loadTrainingPoints: function(sessionId, callback){
        var self = this;
        this.loadTrainingChunkPoints(sessionId, function(chunkPoints){
            self.loadTrainingCachePoints(sessionId, function(cachePoints){
                var points = chunkPoints.concat(cachePoints);
                callback(points);
            })
        });
    },

    savePointsToChunks: function(points, sessionId, lastChunkNumber, success, error){
        if (points == undefined || userId == undefined){
            return;
        }
        if (points.length == 0){
            success([]);
            return;
        }
        var n = Math.floor(points.length / this.CHUNK_SIZE);
        var arr = [];
        var self = this;
        var DataChunk = Parse.Object.extend('DataChunk');
        for (var i = 0; i < n; i++){
            var chPoints = points.slice(i * this.CHUNK_SIZE, (+i + 1) * this.CHUNK_SIZE);
            var number = (+lastChunkNumber + 1 + i);
            var chunk = new DataChunk();
            chunk.set('number', number);
            chunk.set('sessionId', sessionId);

            chunk.set('x', chPoints.map(function(chP){return chP.x}));
            chunk.set('y', chPoints.map(function(chP){return chP.y}));
            chunk.set('t', chPoints.map(function(chP){return chP.t}));
            chunk.set('step', chPoints.map(function(chP){return chP.step}));

            arr.push(chunk);
        }
        Parse.Object.saveAll(arr, {
            success: function(savedChunks){
                var chunks = savedChunks.map(function(ch){return self.transformDataChunk(ch)});
                success(chunks);
            },
            error: function(){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'can not save chunks'});
            }
        });
    },

    saveCachePoints: function(points, sessionId, success, error){
        if (points == undefined || sessionId == undefined){
            return;
        }
        if (points.length == 0){
            success([]);
            return;
        }
        var arr = [];
        var self = this;
        var CachePoint = Parse.Object.extend('CachePoint');
        for (var i in points){
            var p = points[i];
            var cp = new CachePoint();
            cp.set('sessionId', sessionId);
            cp.set('x', p.x);
            cp.set('y', p.y);
            cp.set('t', p.t);
            cp.set('step', p.step);
            arr.push(cp);
        }
        Parse.Object.saveAll(arr, {
            success: function(savedCachedPoints){
                if (savedCachedPoints == undefined){
                    savedCachedPoints = [];
                }
                var arr = savedCachedPoints.map(function(r){return self.transformCachePoint(r)});
                success(arr);
            },
            error: function(){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'error during saving cached points'});
            }
        });
    },



    filterPoints: function(points, lastPointTimestamp){
        var arr = [];
        for (var i in points){
            var p = points[i];
            if (p.t > lastPointTimestamp){
                arr.push(p);
            }
        }
        return arr;
    },

    savePoints: function(newPoints, sessionId, lastPointTime, lastChunkNumber, cachePointsNumber, success, error){
        if (newPoints == undefined || newPoints.length == 0 || lastPointTime == undefined || cachePointsNumber == undefined || lastChunkNumber == undefined){
            return;
        }
        //todo: add optimization using cachePointsNumber
        newPoints = this.filterPoints(newPoints, lastPointTime);
        if (newPoints.length == 0){
            success(lastPointTime, lastChunkNumber, cachePointsNumber);
            return;
        }
        var self = this;
        var chunkSize = this.CHUNK_SIZE;
        if (newPoints.length + cachePointsNumber < chunkSize){ // no need to work with chunks
            self.saveCachePoints(newPoints, sessionId, function(savedCachePoints){
                //total: 1 req
                success(newPoints[newPoints.length - 1].t, lastChunkNumber, savedCachePoints.length);
            });
            return;
        }

        this.loadTrainingCachePoints(sessionId, function(parseCachedPoints){ //1 req
            var points = parseCachedPoints.map(function(pp){return self.transformCachePoint(pp)});
            points = points.concat(newPoints);
            var numberOfChunks = (Math.floor(points.length / chunkSize));
            var chunkPointsNumber = chunkSize * numberOfChunks;

            var chunkPoints = (chunkPointsNumber == 0) ? [] : points.slice(0, chunkPointsNumber);
            var cachePoints = points.slice(chunkPointsNumber);
            self.savePointsToChunks(chunkPoints, sessionId, lastChunkNumber, function(savedChunks){ //1 req
                self.saveCachePoints(cachePoints, sessionId, function(savedCachePoints){ // 1 req
                    var newLastPointTime = points[points.length - 1].t;
                    var newLastChunkNumber = lastChunkNumber + numberOfChunks;
                    var newCachePointsNumber = cachePoints.length;

                    if (numberOfChunks > 0){ //then delete old cached points
                        Parse.Object.destroyAll(parseCachedPoints, { // 1 req
                            success: function(){
                                //total: 4 req
                                success(newLastPointTime, newLastChunkNumber, newCachePointsNumber);
                            },
                            error: function(){
                                error({code: ECR.UNKNOWN_ERROR.code, message: 'error while deleting old cached points'});
                            }
                        });
                    }else{
                        success(newLastPointTime, newLastChunkNumber, newCachePointsNumber);
                    }
                }, function(err){
                    error(err);
                });
            }, function(err){
                error(err);
            });
        }, false);
    },

    loadSession: function(trainingId, userId, callback, shouldTransform){
        var q = new Parse.Query('Session');
        q.equalTo('trainingId', trainingId);
        q.equalTo('userId', userId);
        var self = this;
        q.find(function(results){
            if (results == undefined || results.length == 0){
                var Session = Parse.Object.extend('Session');
                var session = new Session();
                session.set('userId', userId);
                session.set('trainingId', trainingId);

                session.set('lastPointTime', -1);
                session.set('lastChunkNumber', -1);
                session.set('cachePointsNumber', 0);


                session.save().then(function(savedSession){
                    if (shouldTransform == true){
                        savedSession = self.transformSession(savedSession);
                    }
                    callback(savedSession);
                });
                return;
            }
            var s = results[0];
            if (shouldTransform == true){
                s = self.transformSession(s);
            }
            callback(s);
        });
    },

    saveUserTrainingPoints: function(trainingId, userId, points, success, error){
        var self = this;
        self.loadSession(trainingId, userId, function(session){
            var lastPointTime = session.get('lastPointTime');
            var lastChunkNumber = session.get('lastChunkNumber');
            var cachePointsNumber = session.get('cachePointsNumber');
            self.savePoints(points, session.id, lastPointTime, lastChunkNumber, cachePointsNumber, function(newLPT, newLCN, newCPN){
                session.set('lastPointTime', newLPT);
                session.set('lastChunkNumber', newLCN);
                session.set('cachePointsNumber', newCPN);
                session.save().then(function(savedSession){
                    success();
                });
            }, function(err){
                error(err);
            });
        });
    },

    createTraining: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createTraining: data is not defined'});
            return;
        }
        if (data.startTimestamp == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createTraining: startTimestamp is not defined'});
            return;
        }
        if (data.trainerId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createTraining: trainerId is not defined'});
            return;
        }

        var Training = Parse.Object.extend('Training');
        var tr = new Training();
        var self = this;
        tr.set('startTimestamp', data.startTimestamp);
        tr.set('trainerId', data.trainerId);
        if (data.groupId != undefined){
            tr.set('groupId', data.groupId);
        }
        if (data.fieldId != undefined){
            tr.set('fieldId', data.fieldId);
        }
        if (data.name != undefined){
            tr.set('name', data.name);
        }
        tr.save().then(function(savedTraining){
            success(self.transformTraining(savedTraining));
        });
    },

    finishTraining: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'finishTraining: data is not defined'});
            return;
        }
        if (data.endTimestamp == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'finishTraining: endTimestamp is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'finishTraining: id is not defined'});
            return;
        }
        var q = new Parse.Query('Training');
        var self = this;
        q.get(data.id, {
            success: function(tr){
                tr.set('endTimestamp', data.endTimestamp);
                tr.save().then(function(savedTraining){
                    success(self.transformTraining(savedTraining));
                });
            },
            error: function(){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'finishTraining: error while saving training'});
            }
        });

    },

    updateTraining: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateTraining: data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateTraining: id is not defined'});
            return;
        }
        var q = new Parse.Query('Training');
        var self = this;
        q.get(data.id, {
            success: function(tr){
                for (var key in data){
                    if (key == 'id'){
                        continue;
                    }
                    tr.set(key, data[key]);
                }
                tr.save().then(function(updatedTraining){
                    success(self.transformTraining(updatedTraining));
                });
            },
            error: function(){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'training is not found'});
            }
        });
    },

    loadOrganizationTrainings: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadOrganizationTrainings: data is not defined'});
            return;
        }
        if (data.organizationId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadOrganizationTrainings: organizationId is not defined'});
            return;
        }
        var self = this;
        UsersModule.loadRoledOrganizationUsers(data.organizationId, 'trainer', function(trainers){
            console.log('loadRoledOrganizationUsers: loaded trainers = ' + JSON.stringify(trainers));
            var trainersIds = trainers.map(function(tr){
                return tr.id;
            });
            var q = new Parse.Query('Training');
            q.containedIn('trainerId', trainersIds);
            q.limit(1000);
            q.find(function(results){
                results = (results == undefined) ? [] : results;
                results = results.map(function(r){return self.transformTraining(r)});
                success(results);
            });
        }, true);
    },

    loadTrainerTrainings: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadTrainerTrainings: data is not defined'});
            return;
        }
        if (data.trainerId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadTrainerTrainings: trainerId is not defined'});
            return;
        }
        var q = new Parse.Query('Training');
        q.equalTo('trainerId', data.trainerId);
        q.limit(1000);
        q.find(function(results){
            results = (results == undefined) ? [] : results;
            results = results.map(function(r){return self.transformTraining(r)});
            success(results);
        });
    },

    loadTrainersTrainings: function(trainersIds, callback){
        if (trainersIds == undefined || trainersIds.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query('Training');
        q.containedIn('trainerId', trainersIds);
        q.limit(1000);
        q.find(function(results){
            results = (results == undefined) ? [] : results;
            results = results.map(function(r){return self.transformTraining(r)});
            success(results);
        });
    },

    loadChunkPointsMapOfSessionsIds: function(sessionsIds, callback){
        var map = {};
        for (var i in sessionsIds){
            map[sessionsIds[i]] = [];
        }
        var q = new Parse.Query('DataChunk');
        q.limit(1000);
        q.addAscending('number');
        q.containedIn('sessionId', sessionsIds);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            var chunks = results.map(function(r){
                return self.transformDataChunk(r);
            });
            for (var i in chunks){
                var ch = chunks[i];
                var points = ch.x.map(function(item, k){return {t: ch.t[k], x: ch.x[k], y: ch.y[k], step: ch.step[k]}});
                map[ch.sessionId] = map[ch.sessionId].concat(points)
            }
            callback(map);
        });
    },

    loadCachePointsOfSessionsIds: function(sessionsIds, from, to, callback){
        var q = new Parse.Query('CachePoint');
        q.containedIn('sessionId', sessionsIds);
        q.limit(1000);
        q.addAscending('t');
        if (from != undefined){
            q.greaterThan('t', from);
        }
        if (to != undefined){
            q.lessThan('t', to);
        }
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){return self.transformCachePoint(r)});
            callback(results);
        });
    },

    loadCachePointsOfSessionsIdsRec: function(sessionsIds, from, to, points, callback){
        console.log('loadCachePointsOfSessionsIdsRec: sessionsIds = ' + JSON.stringify(sessionsIds));
        console.log('loadCachePointsOfSessionsIdsRec: from = ' + from);
        console.log('loadCachePointsOfSessionsIdsRec: to = ' + to);
        console.log('loadCachePointsOfSessionsIdsRec: points length = ' + points.length);
        var self = this;
        self.loadCachePointsOfSessionsIds(sessionsIds, from, to, function(pts){
            points = points.concat(pts);
            if (pts.length > 0){
                from = pts[pts.length - 1].t;
                self.loadCachePointsOfSessionsIdsRec(sessionsIds, from, to, points, callback);
            }else {
                callback(points);
            }
        });
    },

    loadCachePointsOfSessionsIdsRecursively: function(sessionsIds, from, to, callback){
        console.log('loadCachePointsOfSessionsIdsRecursively: sessionsIds = ' + JSON.stringify(sessionsIds));
        var self = this;
        var points = [];
        self.loadCachePointsOfSessionsIdsRec(sessionsIds, from, to, points, function(pts){
            console.log('loadCachePointsOfSessionsIdsRecursively: loaded pts number = ' + pts.length);
            callback(pts);
        })
    },



    loadTrainingSessions: function(trainingId, callback){
        var q = new Parse.Query('Session');
        q.equalTo('trainingId', trainingId);
        q.limit(1000);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            var sessions = results.map(function(r){return self.transformSession(r)});
            var arr = [];
            var sessionsIds = sessions.map(function(s){return s.id});
            self.loadCachePointsOfSessionsIdsRecursively(sessionsIds, 0, undefined, function(points){

                self.loadChunkPointsMapOfSessionsIds(sessionsIds, function(chunkPointsSessionsMap){
                    var map = {};
                    for (var i in points){
                        var p = points[i];
                        if (map[p.sessionId] == undefined){
                            map[p.sessionId] = [];
                        }
                        map[p.sessionId].push(p);
                    }

                    for (var i in sessions){
                        var session = sessions[i];
                        arr.push({
                            id: session.id,
                            trainingId: session.trainingId,
                            session: session,
                            points: chunkPointsSessionsMap[session.id].concat(map[session.id])
                        });
                    }

                    var usersIds = arr.map(function(s){return s.session.userId});
                    UsersModule.loadUsersMapByIds(usersIds, function(usersMap){
                        for (var i in arr){
                            arr[i].session.user = usersMap[arr[i].session.userId];
                        }
                        callback(arr);
                    });

                });

            });
        });
    },

    loadUserTrainings: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUserTrainings: data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUserTrainings: id is not defined'});
            return;
        }
        var self = this;
        var q = new Parse.Query('Session');
        q.equalTo('userId', data.id);
        q.limit(1000);
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){return self.transformSession(r)});
            var ids = results.map(function(d){return d.trainingId});
            var q2 = new Parse.Query('Training');
            q2.limit(1000);
            q2.addDescending('startTimestamp');
            q2.containedIn('objectId', ids);
            q2.find(function(trainings){
                if (trainings == undefined){
                    trainings = [];
                }
                trainings = trainings.map(function(m){return self.transformTraining(m)});
                success({trainings: trainings, sessions: results});
            });
        });
    }


};

module.exports = TrainingsModule;