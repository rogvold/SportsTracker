/**
 * Created by sabir on 21.06.16.
 */
var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');

var UsersModule = {

    transformUser: function(u){
        if (u == undefined){
            return undefined;
        }
        return {
            id: u.id,
            timestamp: new Date(u.createdAt).getTime(),
            userRole: u.get('userRole'),
            email: u.get('email'),
            firstName: u.get('firstName'),
            lastName: u.get('lastName'),
            phone: u.get('phone'),
            organizationId: u.get('organizationId'),
            birthdayTimestamp: new Date(u.get('birthdayTimestamp')).getTime(),
            avatar: u.get('avatar')
        }
    },



    loadUser: function(userId, success, error, shouldTransform){
        shouldTransform = (shouldTransform == undefined) ? false : shouldTransform;
        if (userId == undefined){
            success(undefined);
            return;
        }
        var q = new Parse.Query(Parse.User);
        var self = this;
        q.get(userId, {
            success: function(u){
                if (shouldTransform == true){
                    u = self.transformUser(u);
                }
                success(u);
            },
            error: function(){
                error(undefined);
            }
        });
    },

    loadUserByEmail: function(email, callback, notFoundCallback){
        var q = new Parse.Query(Parse.User);
        q.equalTo('email', email);
        var self = this;
        q.find({
            success: function(results){
                if (results == undefined || results.length == 0){
                    notFoundCallback();
                    return;
                }
                callback(self.transformUser(results[0]));
            }
        });
    },

    createUser: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.firstName == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'firstName is not defined'});
            return;
        }
        if (data.lastName == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'lastName is not defined'});
            return;
        }

        if (data.password == undefined || data.password.length < 3){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'Password is not defined or too short. Min password length is 3'});
            return;
        }


        if (data.email == undefined || CommonHelper.validateEmail(data.email) == false){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'email is not valid'});
            return;
        }

        if (data.userRole == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userRole is not defined'});
            return;
        }

        var self = this;
        this.loadUserByEmail(data.email, function(foundUser){
            error({code: ECR.USER_WITH_SPECIFIED_EMAIL_ALREADY_EXISTS.code, message: 'user with specified email already exists'});
        }, function(){
            var user = new Parse.User();
            user.set('username', data.email);
            user.set('email', data.email);
            user.set('password', data.password);
            user.set('firstName', data.firstName);
            user.set('lastName', data.lastName);
            user.set('phone', data.phone);
            user.set('userRole', data.userRole);

            if (data.organizationId != undefined){
                user.set('organizationId', data.organizationId);
            }


            user.signUp(null, {
                success: function(user){
                    success(self.transformUser(user));
                },
                error: function(err){
                    error({code: ECR.UNKNOWN_ERR.code, message: 'some problems during signing up'});
                }
            });
        });
    },

    updateUser: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var self = this;
        this.loadUser(data.userId, function(u){
            for (var key in data){
                if (key == 'userId' || key == 'timestamp' || key == 'id'){
                    continue;
                }
                u.set(key, data[key]);
            }
            u.save().then(function(updatedUser){
                success(self.transformUser(updatedUser));
            });
        }, function(){});
    },

    loadAllOrganizationUsers: function(orgId, callback){
        var q = new Parse.Query(Parse.User);
        q.limit(1000);
        q.equalTo('organizationId', orgId);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){return self.transformUser(r)});
            var users = [];
            var trainers = [];
            for (var i in results){
                var us = results[i];
                if (us.userRole == 'trainer'){
                    trainers.push(us);
                }
                if (us.userRole == 'user'){
                    users.push(us);
                }
            }
            callback({
                users: users,
                trainers: trainers
            });
        });
    },

    loadRoledOrganizationUsers: function(orgId, userRole, callback, shouldTransform){
        var q = new Parse.Query(Parse.User);
        q.limit(1000);
        q.equalTo('organizationId', orgId);
        q.equalTo('userRole', userRole);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            var users = results;
            if (shouldTransform == true){
                users = users.map(function(u){return self.transformUser(u)});
            }
            //console.log('!!!--->>> loadRoledOrganizationUsers: results = ' + JSON.stringify(users));
            callback(users);
        });
    },

    loadUsersMapByIds: function(ids, callback){
        var q = new Parse.Query(Parse.User);
        q.containedIn('objectId', ids);
        q.limit(1000);
        var map = {};
        var self = this;
        q.find(function(users){
            users = users.map(function(u){return self.transformUser(u)});
            for (var i in users){
                map[users[i].id] = users[i];
            }
            callback(map);
        });
    }

};

module.exports = UsersModule;