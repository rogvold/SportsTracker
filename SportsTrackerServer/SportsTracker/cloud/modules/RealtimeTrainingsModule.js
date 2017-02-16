/**
 * Created by sabir on 19.10.16.
 */



var RealtimeTrainingsModule = {

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
            fieldId: tr.get('fieldId')
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

    MAX_POINTS_NUMBER: 50,
    MAX_CACHE_POINTS_NUMBER: 140,
    MAX_QUERY_REQUEST_LIMIT: 1000,


    loadSessions: function(arr, callback, shouldTransform){
        //console.log('loadCardioSessions: arr = ' + JSON.stringify(arr));
        if (arr == undefined || arr.length == 0){
            console.log('loadCardioSessions: arr is empty');
            callback([]);
            return;
        }
        var q = new Parse.Query('SportSession');
        var self = this;
        q.limit(1000);
        var trainingIds = arr.map(function(a){
            return a.trainingId;
        });
        var usersIds = arr.map(function(a){
            return a.userId;
        });
        var map = {};
        q.containedIn('trainingId', trainingIds);
        var resArr = [];
        q.find({useMasterKey: true}).then(function(sessions){
            if (sessions == undefined){
                sessions = [];
            }

            for (var i in sessions){
                var userId = sessions[i].get('userId');
                map[userId] = sessions[i];
            }
            for (var i in usersIds){
                var uId = usersIds[i];
                if (map[uId] != undefined){
                    resArr.push(map[uId]);
                }
            }
            if (shouldTransform == true){
                resArr = resArr.map(function(ar){return self.transformSession(ar)});
            }
            //console.log('loadCardioSessions: resArr = ' + JSON.stringify(arr));
            callback(resArr);
        });
    },

    createSessions: function(arr, callback, shouldTransform){
        if (arr == undefined || arr.length == 0){
            callback([]);
            return;
        }
        var res = [];
        var Session = Parse.Object.extend('SportSession');
        var self = this;
        for (var i in arr){
            var a = arr[i];
            var sess = new Session();
            sess.set('userId', a.userId);
            sess.set('startTimestamp', a.startTimestamp);
            sess.set('trainingId', a.trainingId);
            sess.set('deleted', false);
            sess.set('cachePointsNumber', 0);
            sess.set('lastChunkNumber', -1);
            sess.set('lastPointTime', -1);

            res.push(sess);
        }
        Parse.Object.saveAll(res, {
            useMasterKey: true,
            success: function(savedSessions){
                if (savedSessions  == undefined){
                    savedSessions = [];
                }
                if (shouldTransform == true){
                    savedSessions = savedSessions.map(function(s){return self.transformSession(s)});
                }
                callback(savedSessions);
            }
        });
    },

    loadLazySessions: function(arr, callback, shouldTransform){
        var self = this;
        var existingMap = {};
        this.loadSessions(arr, function(existingSessions){
            for (var i in existingSessions){
                var sess = existingSessions[i];
                var userId = (shouldTransform == true) ? sess.userId : sess.get('userId');
                existingMap[userId] = sess;
            }
            var notExArr = [];
            for (var i in arr){
                var a = arr[i];
                if (existingMap[a.userId] == undefined){
                    notExArr.push(a);
                }
            }
            self.createSessions(notExArr, function(newSessions){
                var resSessions = existingSessions.concat(newSessions);
                callback(resSessions);
            }, shouldTransform);
        }, shouldTransform);
    },

    //map[userId] - session of userId
    loadLazySessionsUsersData: function(arr, callback, shouldTransform){
        console.log('loadLazySessionsUsersData occured');
        var self = this;
        var map = {};
        this.loadLazySessions(arr, function(sessions){
            for (var i in sessions){
                var sess = sessions[i];
                var userId = (shouldTransform == true) ? sess.userId : sess.get('userId');
                map[userId] = {
                    session: sess
                }
            }
            callback({
                sessionsMap: map,
                sessions: sessions
            });
        }, shouldTransform);
    },

    loadCachePointsSessionIdData: function(sessionsIds, callback, shouldTransform){
        var map = {};
        if (sessionsIds == undefined){
            return undefined;
        }
        var self = this;
        var q = new Parse.Query('CachePoint');
        q.limit(1000);
        q.containedIn('sessionId', sessionsIds);
        q.addAscending('t');
        q.find(function(results){
            if (results == undefined || results.length == 0){
                results = [];
            }

            for (var i in results){
                var p = results[i];
                var sessionId = p.get('sessionId');
                if (map[sessionId] == undefined){
                    map[sessionId] = [];
                }
                if (shouldTransform == true){
                    p = self.transformCachePoint(p);
                }
                map[sessionId].push(p);
            }
            if (shouldTransform == true){
                results = results.map(function(r){return self.transformCachePoint(r)});
            }
            callback({
                cachePointsSessionsMap: map,
                cachePoints: results
            });
        });
    },

    destroyCachePoints: function(notTransformedCachePoints, callback){
        if (notTransformedCachePoints == undefined || notTransformedCachePoints.length == 0){
            callback();
            return;
        }
        Parse.Object.destroyAll(notTransformedCachePoints, {
            useMasterKey: true,
            success: function(){
                callback();
            },
            error: function(eee){
                console.log('destroyCachePoints: error  =  ' + JSON.stringify(eee));
            }
        });
    },


    saveCachePointsToChunks: function(notTransformedSessions, callback){
        var self = this;
        var sessionsIds = notTransformedSessions.map(function(s){return s.id});
        var sessions = notTransformedSessions;
        var sessionsMap = {};
        for (var i in sessions){
            sessionsMap[sessions[i].id] = sessions[i];
        }
        var DataChunk = Parse.Object.extend('DataChunk');
        this.loadCachePointsSessionIdData(sessionsIds, function(data){
            var allNotTransformedCachePoints = data.cachePoints;
            var cachePointsSessionsMap = data.cachePointsSessionsMap;
            var chunksArray = [];
            for (var sessionId in cachePointsSessionsMap){
                if (cachePointsSessionsMap[sessionId] == undefined || cachePointsSessionsMap[sessionId].length == 0){
                    continue;
                }
                var session = sessionsMap[sessionId];
                var cachePoints = cachePointsSessionsMap[sessionId];
                var lastChunkNumber = (session.get('lastChunkNumber') == undefined) ? -1 : session.get('lastChunkNumber');
                var chunkNumber = lastChunkNumber + 1;
                var chunk = new DataChunk();
                chunk.set('sessionId', session.id);
                chunk.set('number', chunkNumber);

                //var rrs = cachePoints.map(function(cp){return +cp.get('rr')});
                //var times = cachePoints.map(function(cp){return +cp.get('t')});

                var xs = cachePoints.map(function(cp){return cp.get('x')});
                var ys = cachePoints.map(function(cp){return cp.get('y')});
                var ts = cachePoints.map(function(cp){return cp.get('t')});
                var steps = cachePoints.map(function(cp){return cp.get('step')});


                chunk.set('x', xs);
                chunk.set('y', ys);
                chunk.set('t', ts);
                chunk.set('step', steps);

                //chunk.set('rrs', rrs);
                //chunk.set('times', times);


                chunksArray.push(chunk);
                sessionsMap[sessionId].set('lastChunkNumber', chunkNumber);
            }
            var fulfilledSessions = [];
            for (var i in sessions){
                var sId = sessions[i].id;
                if (sessionsMap[sId] != undefined){
                    fulfilledSessions.push(sessionsMap[sId]);
                }else {
                    fulfilledSessions.push(sessions[i]);
                }
            }
            Parse.Object.saveAll(chunksArray, {
                useMasterKey: true,
                success: function(savedChunks){
                    self.destroyCachePoints(allNotTransformedCachePoints, function(){
                        callback(fulfilledSessions);
                    });
                },
                error: function(eee){
                    console.log('saveAll(chunksArray: eee = ' + JSON.stringify(eee));
                }
            });

        }, false);
    },

    savePointsToCachePoints: function(sessionsMap, callback){
        console.log('savePointsToCachePoints: sessionsMap = ' + JSON.stringify(sessionsMap));

        var CachePoint = Parse.Object.extend('CachePoint');
        var cpApp = [];
        for (var userId in sessionsMap){
            var d = sessionsMap[userId];
            //var rrs = d.rrs;
            //var times = d.times;
            var session = d.session;

            for (var i in d.x){
                //var rr = rrs[i];
                //var t = times[i];
                var point = new CachePoint();

                point.set('t', +d.t[i]);
                point.set('x', +d.x[i]);
                point.set('y', +d.y[i]);
                point.set('step', +d.step[i]);
                //point.set('rr', rr);


                point.set('sessionId', session.id);
                cpApp.push(point);
            }
        }
        Parse.Object.saveAll(cpApp, {
            useMasterKey: true,
            success: function(savedCachePoints){
                console.log('savePointsToCachePoints: SUCCESS');
                callback(savedCachePoints);
            },
            error: function(eee){
                console.log('savePointsToCachePoints: eee = ' + JSON.stringify(eee));
            }
        });
    },


    uploadPoints: function(arr, callback){
        var self = this;
        console.log('uploadPoints: arr = ' + JSON.stringify(arr));

        this.loadLazySessionsUsersData(arr, function(sessionsData){ //sessionsMap: userId - ParseCardioSession
            console.log('sessionData = ', sessionsData);
            var totalCachePointsNumber = 0;
            var sessionsMap = sessionsData.sessionsMap;
            var sessions = sessionsData.sessions;
            for (var i in arr){
                var a = arr[i];
                var sess = sessionsMap[a.userId].session;
                var lastT = (sess.get('lastPointTime') == undefined) ? -1 : +sess.get('lastPointTime');
                var cachePointsNumber = (sess.get('cachePointsNumber') == undefined) ? 0 : sess.get('cachePointsNumber');

                //var rrs = a.rrs.filter(function(r, k){var t = a.times[k]; return (t > lastT)});
                //var times = a.times.filter(function(t, k){return (t > lastT)});
                var t = a.t.filter(function(time, k){return (time > lastT)});
                var x = a.x.filter(function(r, k){var t = a.t[k]; return (t > lastT)});
                var y = a.y.filter(function(r, k){var t = a.t[k]; return (t > lastT)});
                var step = a.step.filter(function(r, k){var t = a.t[k]; return (t > lastT)});


                //sessionsMap[a.userId].rrs = rrs;
                //sessionsMap[a.userId].times = times;
                sessionsMap[a.userId].t = t;
                sessionsMap[a.userId].x = x;
                sessionsMap[a.userId].y = y;
                sessionsMap[a.userId].step = step;


                var lastPointTime = sess.get('lastPointTime') == undefined ? -1 : sess.get('lastPointTime');
                lastPointTime = (t == undefined || t.length == 0) ? lastPointTime : t[t.length - 1];
                sessionsMap[a.userId].lastPointTime = lastPointTime;

                totalCachePointsNumber = totalCachePointsNumber + cachePointsNumber + x.length;
            }
            if (totalCachePointsNumber > self.MAX_QUERY_REQUEST_LIMIT - arr.length * self.MAX_POINTS_NUMBER){
                self.saveCachePointsToChunks(sessions, function(fulfilledSessions){
                    console.log('saveCachePointsToChunks: success');
                    //fulfilledSessions - chunk number is updated
                    self.savePointsToCachePoints(sessionsMap, function(savedCachePoints){
                        console.log('savePointsToCachePoints: success: savedCachePoints = ' + JSON.stringify(savedCachePoints));
                        for (var i in fulfilledSessions){
                            var oldCachePointsNumber = (fulfilledSessions[i].get('cachePointsNumber') == undefined) ? 0 : fulfilledSessions[i].get('cachePointsNumber');
                            var deltaN = sessionsMap[fulfilledSessions[i].get('userId')].x.length;
                            var newNum = oldCachePointsNumber + deltaN;
                            fulfilledSessions[i].set('cachePointsNumber', deltaN);
                            fulfilledSessions[i].set('lastPointTime', +sessionsMap[fulfilledSessions[i].get('userId')].lastPointTime);
                        }
                        Parse.Object.saveAll(fulfilledSessions, {
                            useMasterKey: true,
                            success: function(savedSessions){
                                savedSessions = savedSessions.map(function(s){return self.transformSession(s)});
                                callback(savedSessions);
                            },
                            error: function(eee){
                                console.log('saveAll(fulfilledSessions: eee = ' + JSON.stringify(eee));
                            }
                        });
                    });
                });
            }else {
                self.savePointsToCachePoints(sessionsMap, function(savedCachePoints){
                    console.log('savePointsToCachePoints: SUCCESS');
                    for (var i in sessions){
                        var oldCachePointsNumber = (sessions[i].get('cachePointsNumber') == undefined) ? 0 : sessions[i].get('cachePointsNumber');
                        var deltaN = sessionsMap[sessions[i].get('userId')].x.length;
                        var newNum = oldCachePointsNumber + deltaN;
                        sessions[i].set('cachePointsNumber', newNum);
                        sessions[i].set('lastPointTime', +sessionsMap[sessions[i].get('userId')].lastPointTime);
                    }
                    console.log('trying to save sessions');
                    Parse.Object.saveAll(sessions, {
                        useMasterKey: true,
                        success: function(savedSessions){
                            console.log('sessions saved');
                            savedSessions = savedSessions.map(function(s){return self.transformSession(s)});
                            callback(savedSessions);
                        },
                        error: function(eee){
                            console.log('FAILED saving sessions: eee = ' + JSON.stringify(eee));
                        }
                    });
                });
            }

        }, false);
    }



};

module.exports = RealtimeTrainingsModule;