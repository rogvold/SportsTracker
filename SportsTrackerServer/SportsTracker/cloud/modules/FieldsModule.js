/**
 * Created by sabir on 12.07.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');
var UsersModule = require('cloud/modules/UsersModule');

var FieldsModule = {

    transformField: function(f){
        if (f == undefined){
            return undefined;
        }
        return {
            id: f.id,
            timestamp: (new Date(f.createdAt)).getTime(),
            name: f.get('name'),
            description: f.get('description'),
            image: f.get('image'),
            organizationId: f.get('organizationId'),
            width: f.get('width'),
            height: f.get('height'),
            deleted: f.get('deleted')
        };
    },

    createField: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.organizationId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'organizationId is not defined'});
            return;
        }
        if (data.width == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'width is not defined'});
            return;
        }
        if (data.height == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'height is not defined'});
            return;
        }
        if (data.name == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'name is not defined'});
            return;
        }
        var Field = Parse.Object.extend('Field');
        var f = new Field();
        var self = this;
        f.set('organizationId', data.organizationId);
        f.set('name', data.name);
        f.set('deleted', false);
        f.set('width', data.width);
        f.set('height', data.height);
        if (data.description != undefined){
            f.set('description', data.description);
        }
        f.save().then(function(savedField){
            success(self.transformField(savedField));
        });
    },

    updateField: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var q = new Parse.Query('Field');
        var self = this;
        q.get(data.id, {
            success: function(f){
                for (var key in data){
                    if (key == 'id' || key == 'timestamp'){
                        continue;
                    }
                    f.set(key, data[key]);
                }
                f.save().then(function(savedField){
                    success(self.transformField(savedField));
                });
            }
        });
    },

    deleteField: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var q = new Parse.Query('Field');
        var self = this;
        q.get(data.id, {
             success: function(field){
                 field.set('deleted', true);
                 field.save().then(function(savedField){
                     success(self.transformField(savedField));
                 });
                 //field.destroy({
                 //    success: function(){
                 //        success();
                 //    },
                 //    error: function(){
                 //        error({code: ECR.UNKNOWN_ERROR.code, message: 'can not delete field'});
                 //    }
                 //});
             },
            error: function(){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'field is not found'});
            }
        });
    },

    loadOrganizationFields: function(orgId, callback){
        var q = new Parse.Query('Field');
        q.limit(1000);
        q.addDescending('createdAt');
        q.equalTo('organizationId', orgId);
        q.equalTo('deleted', false);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){
                return self.transformField(r)
            });
            callback(results);
        });
    },

    loadTrainerFields: function(trainerId, callback){
        var self = this;
        UsersModule.loadUser(trainerId, function(trainer){
            var orgId = trainer.organizationId;
            self.loadOrganizationFields(orgId, function(fields){
                callback(fields);
            });
        }, function(err){

        }, true);
    }

};

module.exports = FieldsModule;