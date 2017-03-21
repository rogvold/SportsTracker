/**
 * Created by sabir on 06.03.17.
 */
var ECR = require('../helpers/ErrorCodesRegistry');
var CommonHelper = require('../helpers/CommonHelper');
var UsersModule = require('../modules/UsersModule');

var FieldsModule = {

    transformShot: function(f){
        if (f == undefined){
            return undefined;
        }
        return {
            id: f.id,
            timestamp: (new Date(f.createdAt)).getTime(),

            zone: f.get('zone'),
            shotTimestamp: f.get('shotTimestamp'),
            trainingId: f.get('trainingId'),
            userId: f.get('userId')

        };
    },

    createShot: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.trainingId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'trainingId is not defined'});
            return;
        }
        if (data.zone == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'zone is not defined'});
            return;
        }
        if (data.shotTimestamp == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'shotTimestamp is not defined'});
            return;
        }

        var Shot = Parse.Object.extend('Shot');
        var f = new Shot();
        var self = this;
        f.set('trainingId', data.trainingId);
        f.set('zone', data.zone);
        f.set('shotTimestamp', data.shotTimestamp);

        f.save(null, {useMasterKey: true}).then(function(savedShot){
            success(self.transformShot(savedShot));
        });
    },



    deleteShot: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var q = new Parse.Query('Shot');
        var self = this;
        q.get(data.id, {
            success: function(shot){
                // field.set('deleted', true);
                // field.save(null, {useMasterKey: true}).then(function(savedField){
                //     success(self.transformField(savedField));
                // });
                shot.destroy({
                   useMasterKey: true,
                   success: function(){
                       success();
                   },
                   error: function(){
                       error({code: ECR.UNKNOWN_ERROR.code, message: 'can not delete shot'});
                   }
                });
            },
            error: function(){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'shot is not found'});
            }
        });
    },

    loadTrainingShots: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.trainingId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'trainingId is not defined'});
            return;
        }
        var q = new Parse.Query('Shot');
        q.limit(1000);
        q.addDescending('createdAt');
        q.equalTo('trainingId', data.trainingId);
        var self = this;
        q.find({useMasterKey: true}).then(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){
                return self.transformShot(r)
            });
            success(results);
        });
    }

};

module.exports = FieldsModule;