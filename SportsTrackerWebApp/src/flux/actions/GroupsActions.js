/**
 * Created by sabir on 13.07.16.
 */


var ParseAPI = require('../../api/ParseAPI');
var constants = require('../FluxConstants');

var GroupsActions = {

    loadOrganizationGroups: function(organizationId){
        if (organizationId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_ORGANIZATION_GROUPS, {organizationId: organizationId});
        ParseAPI.runCloudFunction("getOrganizationGroups", {organizationId: organizationId}, function(groups){
            this.dispatch(constants.LOAD_ORGANIZATION_GROUPS_SUCCESS, {groups: groups});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_ORGANIZATION_GROUPS_FAIL, {errorMessage: err.message});
        }.bind(this));
    },

    createGroup: function(data, callback){
        if (data == undefined){
            return;
        }
        var store = this.flux.store('OrganizationStore');
        var organization = store.organization;
        console.log('createGroup occured: organization = ', organization);
        if (organization == undefined){
            return;
        }
        data.organizationId = organization.id;
        this.dispatch(constants.CREATE_ORGANIZATION_GROUP, data);
        ParseAPI.runCloudFunction("createGroup", data, function(group){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.CREATE_ORGANIZATION_GROUP_SUCCESS, {group: group});
        }.bind(this), function(err){
            this.dispatch(constants.CREATE_ORGANIZATION_GROUP_FAIL, {errorMessage: err.message});
        }.bind(this));
    },

    updateGroup: function(data, callback){
        if (data == undefined){
            return;
        }
        this.dispatch(constants.UPDATE_ORGANIZATION_GROUP, data);
        ParseAPI.runCloudFunction("updateGroup", data, function(group){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.UPDATE_ORGANIZATION_GROUP_SUCCESS, {group: group});
        }.bind(this), function(err){
            this.dispatch(constants.UPDATE_ORGANIZATION_GROUP_FAIL, {errorMessage: err.message});
        }.bind(this));
    },

    deleteGroup: function(groupId, callback){
        if (groupId == undefined){
            return;
        }
        this.dispatch(constants.DELETE_ORGANIZATION_GROUP, {groupId: groupId});
        ParseAPI.runCloudFunction("deleteGroup", {id: groupId}, function(d){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.DELETE_ORGANIZATION_GROUP_SUCCESS, d);
        }.bind(this), function(){
            this.dispatch(constants.DELETE_ORGANIZATION_GROUP_FAIL, d);
        }.bind(this));
    }

};

module.exports = GroupsActions;