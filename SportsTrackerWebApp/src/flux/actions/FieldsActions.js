/**
 * Created by sabir on 16.07.16.
 */

var ParseAPI = require('../../api/ParseAPI');
var constants = require('../FluxConstants');

var FieldsActions = {

    createField: function(data, callback){
        if (data == undefined){
            return;
        }
        var org = this.flux.store('OrganizationStore').organization;
        if (org == undefined){
            return;
        }
        data.organizationId = org.id;
        this.dispatch(constants.CREATE_FIELD, {data: data});
        ParseAPI.runCloudFunction("createField", data, function(field){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }.bind(this), 10);
            }
            this.dispatch(constants.CREATE_FIELD_SUCCESS, {field: field});
        }.bind(this), function(err){
            this.dispatch(constants.CREATE_FIELD_FAIL, {errorMessage: err.message});
        }.bind(this));
    },

    updateField: function(data, callback){
        if (data == undefined){
            return;
        }
        this.dispatch(constants.UPDATE_FIELD, {data: data});
        ParseAPI.runCloudFunction("updateField", data, function(field){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }.bind(this), 10);
            }
            this.dispatch(constants.UPDATE_FIELD_SUCCESS, {field: field});
        }.bind(this), function(err){
            this.dispatch(constants.UPDATE_FIELD_FAIL, {errorMessage: err.message});
        }.bind(this));
    },

    deleteField: function(fieldId, callback){
        if (fieldId == undefined){
            return;
        }
        var data = {id: fieldId};
        ParseAPI.runCloudFunction("deleteField", data, function(){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }.bind(this), 10);
            }
            this.dispatch(constants.DELETE_FIELD_SUCCESS, {fieldId: fieldId});
        }.bind(this), function(err){
            this.dispatch(constants.DELETE_FIELD_FAIL, {errorMessage: err.message});
        }.bind(this));
    }

};

module.exports = FieldsActions;