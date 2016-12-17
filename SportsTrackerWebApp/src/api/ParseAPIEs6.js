/**
 * Created by sabir on 18.12.16.
 */

import constants from '../constants.js'
import Parse from 'parse'
import CommonHelper from '../helpers/CommonHelper.js'

const ParseAPI = {

    initParse (){
        Parse.initialize(constants.PARSE_APP_ID, constants.PARSE_JS_KEY);
        //var currentUser = Parse.User.current();
        //if (currentUser != undefined){
        //    currentUser.fetch();
        //}
    },

    transformUser (u) {
        if (u == undefined){
            return undefined;
        }
        return {
            id: u.id,
            timestamp: (new Date(u.createdAt)).getTime(),
            email: u.get('email'),
            firstName: u.get('firstName'),
            lastName: u.get('lastName'),
            userRole: u.get('userRole'),
            avatar: u.get('avatar')
        }
    },

    fetchCurrentUserAsPromise () {
        var currentUser = Parse.User.current();
        if (currentUser == undefined || currentUser.id == undefined){
            return Promise.resolve(undefined);
        }
        var self = this;
        return new Promise((resolve, reject) => {
            currentUser.fetch().then(function(user){
                resolve(self.transformUser(user));
            }, function(err){
                reject(err);
            });
        });
    },

    runCloudFunction (functionName, data, success, error){
        console.log('runCloudFunction uccured: ', functionName, data);
        if (functionName == undefined){
            return;
        }
        if (data == undefined){
            console.log('data is not defined');
            return;
        }
        if (success == undefined){
            success = function(){}
        }
        if (error == undefined){
            error = function(){}
        }
        Parse.Cloud.run(functionName, {data: data}, {
            success: function(successData){
                console.log('functionName: ' + functionName + ' | success data: ', successData);
                success(successData);
            },
            error: function(respErr){
                console.log('functionName: error: ', respErr);
                var err = respErr.message;
                if (typeof  respErr.message == 'string'){
                    err = JSON.parse(err);
                }
                error(err);
            }
        });
    },

    logIn (email, password, success, error){
        if (CommonHelper.isValidEmail(email) == false){
            error({message: 'email is not valid'});
            return;
        }
        if (password == undefined || password.trim() == ''){
            error({message: 'password is not defined'});
            return;
        }
        email = email.toLowerCase();
        var self = this;
        Parse.User.logIn(email, password, {
            success: function(u){
                success(self.transformUser(u));
            },
            error: function(u, err){
                var code = err.code;
                if (code == 101){
                    error({message: 'Account with specified login and password is not found'});
                }else{
                    error(err);
                }
            }
        });
    },

    signUp: function(data, success, error){
        if (data == undefined){
            data = {};
        }

        if (CommonHelper.isValidEmail(data.email) == false){
            error({message: 'Incorrect email'});
            return;
        }

        if (data.password == undefined || data.password.trim() == ''){
            error({message: 'Incorrect email'});
            return;
        }

        data.email = data.email.toLowerCase();
        var user = new Parse.User();

        for (var key in data){
            user.set(key, data[key]);
        }
        user.set('username', data.email);
        var self = this;
        user.signUp(null, {
            success: function(u) {
                success(self.transformUser(u));
            },
            error: function(user, err) {
                error(err);
            }
        });
    },

    logOutAsPromise: function(){
        return Parse.User.logOut();
    },

    logInAsPromise (email, password) {
        var self = this;
        var promise = new Promise(function(resolve, reject){
            self.logIn(email, password, function(user){
                resolve(user);
            }, function(err){
                reject(err);
            });
        });
        return promise;
    },

    signUpAsPromise (data){
        var self = this;
        var promise = new Promise(function(resolve, reject){
            self.signUp(data, function(user){
                resolve(user);
            }, function(error){
                reject(error);
            })
        });
        return promise;
    },

    runCloudFunctionAsPromise (functionName, data){
        var self = this;
        var promise = new Promise(function(resolve, reject) {
            self.runCloudFunction(functionName, data, function(res){
                resolve(res);
            }, function(err){
                reject(err);
            })
        });
        return promise;
    }

}

export default ParseAPI