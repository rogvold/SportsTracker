/**
 * Created by sabir on 28.02.17.
 */
var constants = require('../Constants');
var basic = require('basic-authorization-header');
var fetch = require('node-fetch');

var request = require('request');

var JuniorAPI = {

    //returns authorized user
    authJunior: function(){
        var url = constants.GET_TOKEN_URL;
        var self = this;
        return new Promise(function(resolve, reject){
            var token = localStorage.getItem('access_token');
            if (token == undefined || token.trim() == ''){
                // reject('No token. Redirecting to Login page');
                resolve(undefined);
                return;
            }
            window.token = token;
            resolve(self.getCurrentUser());
        });
    },

    getNewToken: function(login, password){
        console.log('getToken occured: login, password = ', login, password);
        var url = constants.GET_TOKEN_URL;
        var self = this;
        return new Promise(function(resolve, reject){
            var headers = {
                'Authorization': basic(login, password),
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            var body = {
                grant_type: 'password',
                username: login,
                password: password
            }
            request.post({
                url: url,
                method: 'POST',
                headers: headers,
                form: body
            }, function(e, r, b){
                var res = JSON.parse(b);
                console.log('res = ', res);
                if (res.error != undefined){
                    reject(res);
                    return;
                }
                localStorage.setItem('access_token', res.access_token)
                resolve(res);
            })
        })
    },

    logIn: function(login, password){
        var self = this;
        return new Promise(function(resolve, reject){
            self.getNewToken(login, password).then(function(tokenData){
                localStorage.setItem('access_token', tokenData.access_token);
                window.token = tokenData.access_token;
                self.getCurrentUser().then(function(currentUser){
                    resolve(currentUser)
                }).catch(function(eee){
                    reject(eee);
                });
            }).catch(function(err){
                console.log('err');
                reject(err);
            });
        })
    },

    logOut: function(){
        return new Promise(function(resolve, reject){
            localStorage.removeItem('access_token');
            console.log('access_token removed from localStorage');
            window.token = undefined;
            resolve();
        });
    },

    getCurrentUser: function(){
        var self = this;
        return this.runFunction('GetCurrentUser', {}, 'GET', true).then(function(junUser){
            return new Promise(function (resolve, reject) {
                resolve(self.transformUser(junUser))
            });
        });
    },

    getFields: function(){
        var self = this;
        return this.runFunction('GetFields', {}, 'GET', true).then(function(junFields){
            var fields = junFields.map(function(f){
                return self.transformField(f);
            })
            return new Promise(function(resolve, reject){
                resolve(fields)
            })
        });
    },

    getTrainerGroups: function(){
        var self = this;
        return this.runFunction('GetTrainerGroups', {}, 'GET', false).then(function(djgroups){
            var junGroups = djgroups.result;
            var groups = junGroups.map(function(f){
                return self.transformGroup(f);
            })
            console.log('getTrainerGroups: groups = ', groups);
            return new Promise(function(resolve, reject){
                resolve(groups)
            })
        });
        // GET api/SportTracker/v1/GetTrainerGroups
    },

    getAllTrainerData: function(){
        var self = this;
        return new Promise(function(resolve, reject){
            self.getFields().then(function(fields){
                console.log('fields loaded: fields = ', fields);
                self.getTrainerGroups().then(function(groups){
                    console.log('groups loaded: groups = ', groups);
                    var data = {
                        groups: groups,
                        fields: fields
                    }
                    console.log('getAllTrainerData: resolving with data = ', data);
                    resolve(data)
                }, function(err){
                    reject(err);
                })
            }, function(err){
                reject(err);
            })
        })
    },

    getSportsmen: function(){
        //GET api/SportTrackerWeb/v1/GetSportsmen?groupId={groupId}
    },

    getTrainingData: function(){
        //GET api/SportTrackerWeb/v1/GetTrainingData?trainingId={trainingId}
    },

    getTraininigs: function(){
        // GET api/SportTrackerWeb/v1/GetTrainings?groupId={groupId}
    },


    loadGroupUsersLinks: function(groupId){
        var self = this;
        //GET api/SportTracker/v1/GetGroupUsers?GroupId={GroupId}
        return this.runFunction('GetGroupUsers', {GroupId: groupId}, 'GET', false).then(
            function(dGroupUsers){
                var groupUsers = dGroupUsers.result;
                console.log('groupUsers = ', groupUsers);
                groupUsers = groupUsers.map(function(gu){
                    return self.transformUser(gu);
                })
                var links = groupUsers.map(function(gu){
                    return {
                        groupId: groupId,
                        userId: gu.id,
                        id: gu.id + '_' + groupId,
                        user: gu
                    }
                })
                var resData = {
                    users: groupUsers,
                    links: links
                }
                console.log('resolving ', resData);
                return new Promise(function(resolve, reject){
                    resolve(resData);
                })
            }
        )
    },

    runFunction: function(functionName, params, method, isWeb){
        if (method == undefined){
            method = 'POST'
        }
        if (isWeb == undefined){
            isWeb = false;
        }
        var url = (isWeb == true ? constants.API_FUNCTIONS_BASE_WEB : constants.API_FUNCTIONS_BASE) + functionName;
        var token = window.token;
        var headers = {
            'Authorization': 'Bearer ' + token
        };
        console.log('runFunction: functionName = ', functionName);
        console.log('runFunction: params = ', params);
        console.log('runFunction: headers = ', headers);
        console.log('runFunction: method = ', method);
        return new Promise(function(resolve, reject){
            request({
                url: url,
                method: method,
                headers: headers,
                form: params,
                qs: (method == 'GET') ? params : undefined
            }, function(e, r, b){
                var res = JSON.parse(b);
                console.log(functionName + ': res = ', res);
                if (res.error != undefined){
                    reject(res);
                    return;
                }
                resolve(res);
            })
        })
    },

    transformUser: function(junUser){
        //What the fuck! Alex, do your API more human
        var firstName = junUser.FirstName == undefined ? junUser.firstName : junUser.FirstName;
        var lastName = junUser.LastName == undefined ? junUser.lastName : junUser.LastName;
        var middleName = junUser.MiddleName == undefined ? junUser.middleName : junUser.MiddleName;
        var id = junUser.Id == undefined ? junUser.id : junUser.Id;
        var userRole = junUser.UserRole == undefined ? junUser.userRole : junUser.UserRole;
        if (userRole == undefined){
            userRole = 'player';
        }
        var token = window.token;
        var avatar = constants.API_FUNCTIONS_BASE_WEB + 'SportsmanAvatar?sportsmanId=' + id;
        if (userRole != 'player'){
            avatar = constants.API_FUNCTIONS_BASE_WEB + 'UserAvatar?userId=' + id;
        }
        avatar = avatar + '&access_token=' + token;

        return {
            id: id + '',
            firstName: firstName + '' + (middleName == undefined ? '' : (' ' + middleName)),
            lastName: lastName,
            userRole: userRole,
            avatar: avatar
        }
    },

    transformField: function(junField){
        return {
            id: junField.Id + '',
            name: junField.Name
        }
    },

    transformGroup: function(junGroup){
        return {
            id: junGroup.id + '',
            name: junGroup.name,
            description: junGroup.description
        }
    }


}


module.exports = JuniorAPI;