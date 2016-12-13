/**
 * Created by sabir on 14.07.16.
 */

var ParseAPI = require('../../api/ParseAPI');
var constants = require('../FluxConstants');

var TrainersActions = {

    createTrainer: function(data, callback){
        if (data == undefined){
            return;
        }
        var org = this.flux.store('OrganizationStore').organization;
        if (org == undefined){
            return;
        }

        data.userRole = 'trainer';
        data.organizationId = org.id;
        this.dispatch(constants.CREATE_ORGANIZATION_TRAINER, {data: data});
        ParseAPI.runCloudFunction("createUser", data, function(trainer){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }.bind(this), 10);
            }
            this.dispatch(constants.CREATE_ORGANIZATION_TRAINER_SUCCESS, {trainer: trainer});
        }.bind(this), function(err){
            this.dispatch(constants.CREATE_ORGANIZATION_TRAINER_FAIL, {errorMessage: err.message});
        }.bind(this));
    },

    addTrainerToGroup: function(trainerId, groupId, callback){
        var data = {
            id: groupId,
            trainerId: trainerId
        };
        this.flux.actions.updateGroup(data, callback);
    },

    detachTrainerFromGroup: function(trainerId, groupId, callback){
        var data = {
            id: groupId,
            trainerId: undefined
        };
        if (data == undefined){
            return;
        }
        this.dispatch(constants.UPDATE_ORGANIZATION_GROUP, data);
        ParseAPI.runCloudFunction("detachGroupFromTrainer", data, function(group){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.UPDATE_ORGANIZATION_GROUP_SUCCESS, {group: group});
        }.bind(this), function(err){
            this.dispatch(constants.UPDATE_ORGANIZATION_GROUP_FAIL, {errorMessage: err.message});
        }.bind(this));
    }

};

module.exports = TrainersActions;