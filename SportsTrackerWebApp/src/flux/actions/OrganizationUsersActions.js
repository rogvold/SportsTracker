/**
 * Created by sabir on 15.07.16.
 */

var ParseAPI = require('../../api/ParseAPI');
var constants = require('../FluxConstants');


var OrganizationUsersActions = {

    createOrganizationUser: function(data, callback){
        if (data == undefined){
            return;
        }
        var org = this.flux.store('OrganizationStore').organization;
        if (org == undefined){
            return;
        }
        data.userRole = 'user';
        data.organizationId = org.id;
        this.dispatch(constants.CREATE_ORGANIZATION_USER, {});
        ParseAPI.runCloudFunction("createUser", data, function(user){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }.bind(this), 10);
            }
            this.dispatch(constants.CREATE_ORGANIZATION_USER_SUCCESS, {user: user});
        }.bind(this), function(err){
            this.dispatch(constants.CREATE_ORGANIZATION_USER_FAIL, {errorMessage: err.message});
        }.bind(this));

    },

    loadUserGroups: function(userId, callback){
        if (userId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_USER_GROUPS, {userId: userId});
        ParseAPI.runCloudFunction("loadUserGroups", {userId: userId}, function(groups){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }.bind(this), 10);
            }
            this.dispatch(constants.LOAD_USER_GROUPS_SUCCESS, {groups: groups, userId: userId});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_USER_GROUPS_FAIL, {errorMessage: err.message});
        }.bind(this));

    },

    loadGroupUsers: function(groupId, callback){
        if (groupId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_GROUP_USERS, {groupId: groupId});
        ParseAPI.runCloudFunction("getGroupUsers", {groupId: groupId}, function(users){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }.bind(this), 10);
            }
            this.dispatch(constants.LOAD_GROUP_USERS_SUCCESS, {users: users, groupId: groupId});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_GROUP_USERS_FAIL, {errorMessage: err.message});
        }.bind(this));
    },

    addUserToGroup: function(userId, groupId, callback){
        if (userId == undefined || groupId == undefined){
            return;
        }
        var data = {userId: userId, groupId: groupId};
        this.dispatch(constants.ADD_USER_TO_GROUP, data);
        ParseAPI.runCloudFunction("addUserToGroup", data, function(){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }.bind(this), 10);
            }
            this.dispatch(constants.ADD_USER_TO_GROUP_SUCCESS, data);
        }.bind(this), function(err){
            this.dispatch(constants.ADD_USER_TO_GROUP_FAIL, {errorMessage: err.message});
        }.bind(this));
    },

    detachUserFromGroup: function(userId, groupId, callback){
        if (userId == undefined || groupId == undefined){
            return;
        }
        var data = {userId: userId, groupId: groupId};
        this.dispatch(constants.DETACH_USER_FROM_GROUP, data);
        ParseAPI.runCloudFunction("deleteUserFromGroup", data, function(){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }.bind(this), 10);
            }
            this.dispatch(constants.DETACH_USER_FROM_GROUP_SUCCESS, data);
        }.bind(this), function(err){
            this.dispatch(constants.DETACH_USER_FROM_GROUP_FAIL, {errorMessage: err.message});
        }.bind(this));
    }

};

module.exports = OrganizationUsersActions;