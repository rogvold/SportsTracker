/**
 * Created by sabir on 13.07.16.
 */

var ParseAPI = require('../../api/ParseAPI');
var constants = require('../FluxConstants');

var OrganizationActions = {

    loadTotalOrganizationLazily: function(id, callback){
        console.log('loadTotalOrganizationLazily: id = ', id);
        if (id == undefined){
            console.log('id is not defined');
            return;
        }
        var store = this.flux.store('OrganizationStore');
        var org = store.organization;
        console.log('org = ', org);
        if (org == undefined){
            if (store.loading == true){
                return;
            }
            setTimeout(function(){
                this.flux.actions.loadTotalOrganization(id, callback);
            }.bind(this), 10);
        }
    },

    loadTotalOrganization: function(id,callback){
        console.log('loadTotalOrganization: id = ', id);
        if (id == undefined){
            console.log('id is not defined');
            return;
        }
        this.dispatch(constants.LOAD_TOTAL_ORGANIZATION, {id: id});
        console.log('now will load org');
        ParseAPI.runCloudFunction("loadTotalOrganization", {id: id}, function(data){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 100);
            }
            this.dispatch(constants.LOAD_TOTAL_ORGANIZATION_SUCCESS, {data: data});
        }.bind(this), function(error){
            this.dispatch(constants.LOAD_TOTAL_ORGANIZATION_FAIL, {errorMessage: error.message});
        }.bind(this));
    },

    loadTotalOrganizationByAdminId: function(adminId, callback){
        console.log('OrganizationActions: loadTotalOrganizationByAdminId: adminId = ' + adminId);
        if (adminId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_TOTAL_ORGANIZATION, {adminId: adminId});
        ParseAPI.runCloudFunction("loadTotalOrganizationByAdminId", {adminId: adminId}, function(data){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 100);
            }
            this.dispatch(constants.LOAD_TOTAL_ORGANIZATION_SUCCESS, {data: data});
        }.bind(this), function(error){
            this.dispatch(constants.LOAD_TOTAL_ORGANIZATION_FAIL, {errorMessage: error.message});
        }.bind(this));
    },

    registerAdminAndOrganization: function(userData, organizationData, callback){
        if (userData == undefined || organizationData == undefined){
            return;
        }
        var data = {user: userData, organization: organizationData};
        this.dispatch(constants.REGISTER_ADMIN_AND_CREATE_ORGANIZATION, data);
        ParseAPI.runCloudFunction('registerAdminAndOrganization', data, function(d){
            if (callback != undefined){
                callback(d);
            }
            setTimeout(function(){
                this.dispatch(constants.REGISTER_ADMIN_AND_CREATE_ORGANIZATION_SUCCESS, d);
            }.bind(this), 10);
        }.bind(this), function(error){
            this.dispatch(constants.REGISTER_ADMIN_AND_CREATE_ORGANIZATION_FAIL, {errorMessage: error.message});
        }.bind(this));
    },

    loadOrganizationTrainings: function(callback){
        var org = this.flux.store('OrganizationStore').organization;
        if (org == undefined){
            return;
        }
        var organizationId = org.id;
        this.dispatch(constants.LOAD_ORGANIZATION_TRAININGS, {organizationId: organizationId});
        ParseAPI.runCloudFunction("loadOrganizationTrainings", {organizationId: organizationId}, function(trainings){
            this.dispatch(constants.LOAD_ORGANIZATION_TRAININGS_SUCCESS, {trainings: trainings});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_ORGANIZATION_TRAININGS_FAIL, {errorMessage: err.message});
        }.bind(this));

        //this.loadOrganizationTrainings
    },

    loadUserTrainings: function(id, callback){
        if (id == undefined){
            return;
        }
        this.dispatch(constants.LOAD_USER_TRAININGS, {id: id});
        ParseAPI.runCloudFunction('loadUserTrainings', {id: id}, function(trainings){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.LOAD_USER_TRAININGS_SUCCESS, {trainings: trainings});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_USER_TRAININGS_FAIL, {error: err});
        }.bind(this))
    },

    loadTrainingSessions: function(trainingId){
        this.dispatch(constants.LOAD_SESSIONS, {trainingId: trainingId});
        ParseAPI.runCloudFunction("loadTrainingSessions", {trainingId: trainingId}, function(list){
            this.dispatch(constants.LOAD_SESSIONS_SUCCESS, {list: list});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_SESSIONS_FAIL, {error: err});
        }.bind(this))
    }


};

module.exports = OrganizationActions;